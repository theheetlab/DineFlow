const { validationResult } = require('express-validator');
const Testimonial = require('../models/Testimonial');
const { logActivity } = require('./activityController');

const getTestimonials = async (req, res) => {
  try {
    const { active } = req.query;
    let query = {};
    if (active === 'true') query.isActive = true;

    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const testimonial = await Testimonial.create(req.body);

    await logActivity({
      action: 'Testimonial created',
      resource: 'testimonial',
      description: `New testimonial from ${testimonial.name} (${testimonial.rating} stars)`,
      admin: req.admin._id,
      metadata: { testimonialId: testimonial._id, name: testimonial.name },
    });

    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await logActivity({
      action: 'Testimonial updated',
      resource: 'testimonial',
      description: `Testimonial from ${testimonial.name} updated`,
      admin: req.admin._id,
      metadata: { testimonialId: testimonial._id, name: testimonial.name },
    });

    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await logActivity({
      action: 'Testimonial deleted',
      resource: 'testimonial',
      description: `Testimonial from ${testimonial.name} deleted`,
      admin: req.admin._id,
      metadata: { testimonialId: testimonial._id, name: testimonial.name },
    });

    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTestimonials, getTestimonial, createTestimonial, updateTestimonial, deleteTestimonial };
