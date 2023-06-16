// models/booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  rentedBy: String,
  roomId: String,
  totalCost: Number
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
