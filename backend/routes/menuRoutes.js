const express = require('express');
const { body } = require('express-validator');
const {
  getMenuItems, getMenuItem, createMenuItem,
  updateMenuItem, deleteMenuItem,
} = require('../controllers/menuController');
const { protect } = require('../middleware/auth');
const { cache, clearCache } = require('../middleware/cache');

const router = express.Router();

router.route('/')
  .get(cache(300), getMenuItems)
  .post(
    protect,
    clearCache('/api/v1/menu'),
    [
      body('name').notEmpty().withMessage('Dish name is required'),
      body('description').notEmpty().withMessage('Description is required'),
      body('price').isNumeric().withMessage('Valid price is required'),
      body('category').isIn(['appetizers', 'main-course', 'desserts', 'beverages', 'sides', 'specials'])
        .withMessage('Valid category is required'),
    ],
    createMenuItem
  );

router.route('/:id')
  .get(cache(300), getMenuItem)
  .put(protect, clearCache('/api/v1/menu'), updateMenuItem)
  .delete(protect, clearCache('/api/v1/menu'), deleteMenuItem);

module.exports = router;
