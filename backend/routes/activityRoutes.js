const express = require('express');
const { getActivityLogs } = require('../controllers/activityController');
const { protect } = require('../middleware/auth');
const { cache } = require('../middleware/cache');

const router = express.Router();

router.get('/', protect, cache(60), getActivityLogs);

module.exports = router;
