const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'At least 1 guest required'],
    max: [50, 'Maximum 50 guests allowed'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  specialRequests: {
    type: String,
    trim: true,
  },
  contactName: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true,
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    lowercase: true,
    trim: true,
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true,
  },
}, {
  timestamps: true,
});

reservationSchema.index({ date: 1, status: 1 });
reservationSchema.index({ customer: 1 });
reservationSchema.index({ contactEmail: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);
