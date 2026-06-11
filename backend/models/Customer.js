const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  totalVisits: {
    type: Number,
    default: 0,
  },
  lastVisit: {
    type: Date,
  },
}, {
  timestamps: true,
});

customerSchema.index({ email: 1 });
customerSchema.index({ phone: 1 });

module.exports = mongoose.model('Customer', customerSchema);
