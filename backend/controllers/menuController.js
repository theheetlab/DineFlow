const { validationResult } = require('express-validator');
const MenuItem = require('../models/MenuItem');
const { logActivity } = require('./activityController');

const getMenuItems = async (req, res) => {
  try {
    const { category, search, sort, featured, bestSeller } = req.query;
    let query = {};

    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (bestSeller === 'true') query.isBestSeller = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = {};
    if (sort === 'price_asc') sortOption.price = 1;
    else if (sort === 'price_desc') sortOption.price = -1;
    else if (sort === 'name') sortOption.name = 1;
    else if (sort === 'rating') sortOption.rating = -1;
    else sortOption.createdAt = -1;

    const items = await MenuItem.find(query).sort(sortOption);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const item = await MenuItem.create(req.body);

    await logActivity({
      action: 'Menu item created',
      resource: 'menu',
      description: `New menu item "${item.name}" added ($${item.price})`,
      admin: req.admin._id,
      metadata: { itemId: item._id, name: item.name, category: item.category },
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const original = await MenuItem.findById(req.params.id);
    if (!original) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    await logActivity({
      action: 'Menu item updated',
      resource: 'menu',
      description: `Menu item "${item.name}" updated`,
      admin: req.admin._id,
      metadata: { itemId: item._id, name: item.name, changes: Object.keys(req.body) },
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await logActivity({
      action: 'Menu item deleted',
      resource: 'menu',
      description: `Menu item "${item.name}" deleted`,
      admin: req.admin._id,
      metadata: { itemId: item._id, name: item.name },
    });

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMenuItems, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem };
