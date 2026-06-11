const Reservation = require('../models/Reservation');
const ReservationConfig = require('../models/ReservationConfig');

const checkAvailability = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const config = await ReservationConfig.findOne() || await ReservationConfig.create({});
    const searchDate = new Date(date);
    const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));

    const reservations = await Reservation.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'confirmed'] },
    });

    const slotCounts = {};
    reservations.forEach((r) => {
      slotCounts[r.time] = (slotCounts[r.time] || 0) + r.guests;
    });

    const slots = config.operatingHours.map((time) => {
      const booked = slotCounts[time] || 0;
      const available = Math.max(0, config.maxGuestsPerSlot - booked);
      return {
        time,
        available,
        totalCapacity: config.maxGuestsPerSlot,
        isAvailable: available > 0,
      };
    });

    res.json({
      date,
      config: {
        maxGuestsPerSlot: config.maxGuestsPerSlot,
        maxGuestsPerReservation: config.maxGuestsPerReservation,
        minGuestsPerReservation: config.minGuestsPerReservation,
        advanceBookingDays: config.advanceBookingDays,
      },
      slots,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReservationTrends = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const trends = await Reservation.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
          confirmed: {
            $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] },
          },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
          },
          cancelled: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] },
          },
          pending: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPopularDishes = async (req, res) => {
  try {
    const MenuItem = require('../models/MenuItem');
    const items = await MenuItem.find({ isAvailable: true })
      .sort({ rating: -1 })
      .limit(10)
      .select('name rating price category isBestSeller');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRevenueStats = async (req, res) => {
  try {
    const MenuItem = require('../models/MenuItem');
    const items = await MenuItem.find({ isAvailable: true });
    const totalPotentialRevenue = items.reduce((sum, item) => sum + item.price, 0);
    const avgPrice = items.length > 0 ? totalPotentialRevenue / items.length : 0;

    const reservations = await Reservation.countDocuments({ status: 'completed' });
    const estimatedRevenue = reservations * avgPrice * 2;

    res.json({
      totalMenuItems: items.length,
      averageItemPrice: Math.round(avgPrice * 100) / 100,
      completedReservations: reservations,
      estimatedRevenue: Math.round(estimatedRevenue * 100) / 100,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { checkAvailability, getReservationTrends, getPopularDishes, getRevenueStats };
