const express = require('express');
const { body } = require('express-validator');
const {
  getReservations, getReservation, createReservation,
  updateReservation, deleteReservation, getReservationStats,
} = require('../controllers/reservationController');
const { protect } = require('../middleware/auth');
const { cache } = require('../middleware/cache');

const router = express.Router();

router.route('/stats')
  .get(protect, cache(120), getReservationStats);

router.route('/')
  .get(protect, getReservations)
  .post(
    [
      body('date').isISO8601().withMessage('Valid date is required'),
      body('time').notEmpty().withMessage('Time is required'),
      body('guests').isInt({ min: 1 }).withMessage('At least 1 guest required'),
      body('contactName').notEmpty().withMessage('Contact name is required'),
      body('contactEmail').isEmail().withMessage('Valid email is required'),
      body('contactPhone').notEmpty().withMessage('Contact phone is required'),
    ],
    createReservation
  );

router.route('/:id')
  .get(protect, getReservation)
  .put(protect, updateReservation)
  .delete(protect, deleteReservation);

module.exports = router;
