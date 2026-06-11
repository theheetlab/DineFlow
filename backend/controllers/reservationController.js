const { validationResult } = require('express-validator');
const Reservation = require('../models/Reservation');
const Customer = require('../models/Customer');
const ReservationConfig = require('../models/ReservationConfig');
const { logActivity } = require('./activityController');

const getReservations = async (req, res) => {
  try {
    const { status, date, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (date) {
      const searchDate = new Date(date);
      query.date = {
        $gte: new Date(searchDate.setHours(0, 0, 0, 0)),
        $lte: new Date(searchDate.setHours(23, 59, 59, 999)),
      };
    }
    if (search) {
      query.$or = [
        { contactName: { $regex: search, $options: 'i' } },
        { contactEmail: { $regex: search, $options: 'i' } },
        { contactPhone: { $regex: search, $options: 'i' } },
      ];
    }

    const reservations = await Reservation.find(query)
      .populate('customer', 'name email phone')
      .sort({ date: -1, time: -1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('customer', 'name email phone');
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReservation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { contactName, contactEmail, contactPhone, specialRequests, date, time, guests, ...rest } = req.body;

    const config = await ReservationConfig.findOne() || await ReservationConfig.create({});

    if (guests > config.maxGuestsPerReservation) {
      return res.status(400).json({
        message: `Maximum ${config.maxGuestsPerReservation} guests allowed per reservation`,
      });
    }

    if (guests < config.minGuestsPerReservation) {
      return res.status(400).json({
        message: `Minimum ${config.minGuestsPerReservation} guest(s) required`,
      });
    }

    const bookingDate = new Date(date);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + config.advanceBookingDays);
    if (bookingDate > maxDate) {
      return res.status(400).json({
        message: `Reservations can only be made up to ${config.advanceBookingDays} days in advance`,
      });
    }

    const startOfDay = new Date(bookingDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(bookingDate.setHours(23, 59, 59, 999));

    const existingSlot = await Reservation.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      time,
      status: { $in: ['pending', 'confirmed'] },
    });

    const totalGuestsInSlot = existingSlot.reduce((sum, r) => sum + r.guests, 0);
    if (totalGuestsInSlot + guests > config.maxGuestsPerSlot) {
      const available = config.maxGuestsPerSlot - totalGuestsInSlot;
      return res.status(400).json({
        message: `Not enough capacity at this time slot. Only ${Math.max(0, available)} guests can be accommodated.`,
        availableCapacity: Math.max(0, available),
      });
    }

    let customer = await Customer.findOne({ email: contactEmail });
    if (!customer) {
      customer = await Customer.create({
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
      });

      await logActivity({
        action: 'Customer created',
        resource: 'customer',
        description: `New customer ${contactName} registered via reservation`,
        metadata: { customerId: customer._id },
      });
    }

    customer.totalVisits += 1;
    customer.lastVisit = new Date();
    await customer.save();

    const reservation = await Reservation.create({
      ...rest,
      date,
      time,
      guests,
      customer: customer._id,
      contactName,
      contactEmail,
      contactPhone,
      specialRequests,
    });

    const populated = await Reservation.findById(reservation._id)
      .populate('customer', 'name email phone');

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const original = await Reservation.findById(req.params.id);
    if (!original) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('customer', 'name email phone');

    if (req.body.status && req.body.status !== original.status) {
      const action = `Reservation ${req.body.status}`;
      await logActivity({
        action,
        resource: 'reservation',
        description: `Reservation for ${original.contactName} on ${original.date.toLocaleDateString()} changed from ${original.status} to ${req.body.status}`,
        admin: req.admin._id,
        metadata: { reservationId: reservation._id, oldStatus: original.status, newStatus: req.body.status },
      });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    await logActivity({
      action: 'Reservation deleted',
      resource: 'reservation',
      description: `Reservation for ${reservation.contactName} on ${reservation.date.toLocaleDateString()} deleted`,
      admin: req.admin._id,
      metadata: { reservationId: reservation._id },
    });

    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReservationStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const total = await Reservation.countDocuments();
    const today = await Reservation.countDocuments({
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    const monthly = await Reservation.countDocuments({
      date: { $gte: startOfMonth },
    });
    const pending = await Reservation.countDocuments({ status: 'pending' });
    const confirmed = await Reservation.countDocuments({ status: 'confirmed' });
    const completed = await Reservation.countDocuments({ status: 'completed' });
    const cancelled = await Reservation.countDocuments({ status: 'cancelled' });

    res.json({ total, today, monthly, pending, confirmed, completed, cancelled });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReservations, getReservation, createReservation,
  updateReservation, deleteReservation, getReservationStats,
};
