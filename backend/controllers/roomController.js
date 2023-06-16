// controllers/roomController.js
const Room = require('../models/room');
const Booking = require('../models/booking'); // Import the Booking model

const createRoom = async (req, res) => {
  const {
    name,
    isFree,
    amountToPay,
    photos,
    type,
    description,
  } = req.body;

  const room = new Room({
    name,
    isFree,
    amountToPay,
    photos,
    type,
    description,
  });
  try {
    await room.save();
    res.json(room);
  } catch (error) {
    console.error('Failed to save room data', error);
    res.status(500).json({ error: 'Failed to save room data' });
  }
};

const addExampleRoom = async (name, isFree, amountToPay, photos, type, description) => {
  const room = new Room({
    name: name,
    isVacant: isFree,
    costPerDay: amountToPay,
    images: photos,
    type: type,
    description: description,
  });  
  const res  = await room.save();
  console.log("Room saved: " + JSON.stringify(res));
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    console.error('Failed to fetch room data', error);
    res.status(500).json({ error: 'Failed to fetch room data' });
  }
};

const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch room details' });
  }
};

const getRoomExcludeDates = async (req, res) => {
  try {

    const { roomId } = req.params;

    // Fetch the booked dates for the room from the Booking table
    const bookedDates = await Booking.find({ roomId }).select('startDate endDate');

    res.json(bookedDates);
  } catch (error) {

    res.status(500).json({ error: 'Failed to fetch room exclude dates' });
  }
};

module.exports = {
  createRoom,
  addExampleRoom,
  getRooms,
  getRoomById,
  getRoomExcludeDates, // Add the new controller function
};
