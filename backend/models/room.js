// models/room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  isVacant: Boolean,
  costPerDay: Number,
  images: [String],
  type: String,
  description: String,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
