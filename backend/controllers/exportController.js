const { Parser } = require('json2csv');
const Reservation = require('../models/Reservation');
const Customer = require('../models/Customer');
const Contact = require('../models/Contact');

const exportReservations = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let query = {};
    if (status) query.status = status;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const reservations = await Reservation.find(query)
      .populate('customer', 'name email phone')
      .sort({ date: -1 });

    const data = reservations.map((r) => ({
      ID: r._id.toString(),
      'Guest Name': r.contactName,
      Email: r.contactEmail,
      Phone: r.contactPhone,
      Date: r.date.toISOString().split('T')[0],
      Time: r.time,
      Guests: r.guests,
      Status: r.status,
      'Special Requests': r.specialRequests || '',
      'Created At': r.createdAt.toISOString(),
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=reservations-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const exportCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    const data = customers.map((c) => ({
      ID: c._id.toString(),
      Name: c.name,
      Email: c.email,
      Phone: c.phone,
      'Total Visits': c.totalVisits,
      'Last Visit': c.lastVisit ? c.lastVisit.toISOString().split('T')[0] : '',
      'Member Since': c.createdAt.toISOString().split('T')[0],
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=customers-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const exportContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    const data = contacts.map((c) => ({
      ID: c._id.toString(),
      Name: c.name,
      Email: c.email,
      Phone: c.phone || '',
      Subject: c.subject,
      Message: c.message,
      Status: c.status,
      'Created At': c.createdAt.toISOString(),
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=contacts-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { exportReservations, exportCustomers, exportContacts };
