const Customer = require('../models/Customer');
const Reservation = require('../models/Reservation');
const MenuItem = require('../models/MenuItem');
const Testimonial = require('../models/Testimonial');

const globalSearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.json({ customers: [], reservations: [], menuItems: [], testimonials: [] });
    }

    const searchRegex = new RegExp(q, 'i');

    const [customers, reservations, menuItems, testimonials] = await Promise.all([
      Customer.find({
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { phone: searchRegex },
        ],
      }).limit(5).select('name email phone'),

      Reservation.find({
        $or: [
          { contactName: searchRegex },
          { contactEmail: searchRegex },
          { contactPhone: searchRegex },
        ],
      }).limit(5).populate('customer', 'name'),

      MenuItem.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { category: searchRegex },
        ],
      }).limit(5).select('name category price'),

      Testimonial.find({
        $or: [
          { name: searchRegex },
          { content: searchRegex },
        ],
      }).limit(5).select('name content rating'),
    ]);

    res.json({ customers, reservations, menuItems, testimonials });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { globalSearch };
