// controllers/bookingController.js
const moment = require('moment');
const Room = require('../models/room');
const Booking = require('../models/booking');

/*
 bookingSchema
  roomName: String,
  startDate: Date,
  endDate: Date,
  rentedBy: String,
  roomId: String,
  totalCost: Number
*/

const createBooking = async (req, res) => {
  const {
    roomName,
    startDate,
    endDate,
    rentedBy,
    roomId,
    numOfPeople,
  } = req.body;

  const room = await Room.findById(roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  const numberOfDays = moment(endDate).diff(moment(startDate), 'days');
  const totalCost = (numOfPeople >= 2)? numberOfDays * (room.costPerDay + 100 * (numOfPeople - 2)) : numberOfDays * (room.costPerDay);
  const overlappingBookings = await Booking.find({ roomId, startDate: { $lte: endDate }, endDate: { $gte: startDate } });
  if (overlappingBookings.length > 0) {
    return res.status(400).json({ error: 'The room is not available for the selected dates' });
  }

  const booking = new Booking({
    roomName,
    startDate,
    endDate,
    rentedBy,
    roomId,
    totalCost
  });
  try {
    await booking.save();
    res.json(booking);
    console.log("Successful booking for " + JSON.stringify(booking));
  } catch (error) {
    console.error('Failed to save booking data', error);
    res.status(500).json({ error: 'Failed to save booking data' });
  }
};

const getBookingsByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;
    const bookings = await Booking.find({name: roomId });    
    if (!bookings) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(bookings);
  } catch (error) {
    console.error('Failed to fetch booking details', error);
    res.status(500).json({ error: 'Failed to fetch booking details' });
  }
};

module.exports = {
  createBooking,
  getBookingsByRoomId,
};