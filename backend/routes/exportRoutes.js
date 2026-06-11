const express = require('express');
const { exportReservations, exportCustomers, exportContacts } = require('../controllers/exportController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/reservations', protect, exportReservations);
router.get('/customers', protect, exportCustomers);
router.get('/contacts', protect, exportContacts);

module.exports = router;
