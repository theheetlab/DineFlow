const express = require('express');
const { checkAvailability, getReservationTrends, getPopularDishes, getRevenueStats } = require('../controllers/availabilityController');
const { protect } = require('../middleware/auth');
const { cache, clearCache } = require('../middleware/cache');

const router = express.Router();

router.get('/check', cache(60), checkAvailability);
router.get('/trends', protect, cache(300), getReservationTrends);
router.get('/popular-dishes', protect, cache(300), getPopularDishes);
router.get('/revenue', protect, cache(300), getRevenueStats);

module.exports = router;
