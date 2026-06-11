const Customer = require('../models/Customer');
const Reservation = require('../models/Reservation');

const getCustomers = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const customers = await Customer.find(query).sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const reservations = await Reservation.find({ customer: customer._id })
      .sort({ date: -1 });

    res.json({ customer, reservations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomerStats = async (req, res) => {
  try {
    const total = await Customer.countDocuments();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCustomers, getCustomer, getCustomerStats };
