const express = require('express');
const { getCustomers, getCustomer, getCustomerStats } = require('../controllers/customerController');
const { protect } = require('../middleware/auth');
const { cache } = require('../middleware/cache');

const router = express.Router();

router.route('/stats')
  .get(protect, cache(120), getCustomerStats);

router.route('/')
  .get(protect, getCustomers);

router.route('/:id')
  .get(protect, getCustomer);

module.exports = router;
