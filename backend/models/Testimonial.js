const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
  },
  role: {
    type: String,
    trim: true,
    default: 'Customer',
  },
  content: {
    type: String,
    required: [true, 'Testimonial content is required'],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5,
  },
  image: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

testimonialSchema.index({ isActive: 1, rating: -1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
