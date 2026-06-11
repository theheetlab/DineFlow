const express = require('express');
const { body } = require('express-validator');
const {
  getTestimonials, getTestimonial, createTestimonial,
  updateTestimonial, deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');
const { cache, clearCache } = require('../middleware/cache');

const router = express.Router();

router.route('/')
  .get(cache(300), getTestimonials)
  .post(
    protect,
    clearCache('/api/v1/testimonials'),
    [
      body('name').notEmpty().withMessage('Customer name is required'),
      body('content').notEmpty().withMessage('Testimonial content is required'),
      body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    ],
    createTestimonial
  );

router.route('/:id')
  .get(protect, cache(300), getTestimonial)
  .put(protect, clearCache('/api/v1/testimonials'), updateTestimonial)
  .delete(protect, clearCache('/api/v1/testimonials'), deleteTestimonial);

module.exports = router;
