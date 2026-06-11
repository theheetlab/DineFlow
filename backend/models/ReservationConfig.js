const mongoose = require('mongoose');

const reservationConfigSchema = new mongoose.Schema({
  maxGuestsPerSlot: {
    type: Number,
    default: 50,
  },
  maxTablesPerSlot: {
    type: Number,
    default: 20,
  },
  guestsPerTable: {
    type: Number,
    default: 4,
  },
  operatingHours: {
    type: [String],
    default: [
      '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
      '20:00', '20:30', '21:00', '21:30',
    ],
  },
  advanceBookingDays: {
    type: Number,
    default: 30,
  },
  minGuestsPerReservation: {
    type: Number,
    default: 1,
  },
  maxGuestsPerReservation: {
    type: Number,
    default: 20,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ReservationConfig', reservationConfigSchema);
