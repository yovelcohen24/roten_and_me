// models/room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  costPerDay: Number,
  images: [String],
  type: String,
  description: String,
  salePriceFactor: Number,
});
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
