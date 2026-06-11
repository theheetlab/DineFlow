const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  resource: {
    type: String,
    required: true,
    enum: ['reservation', 'menu', 'customer', 'testimonial', 'contact', 'auth'],
  },
  description: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
});

activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ resource: 1, createdAt: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
