// controllers/roomController.js
const Room = require('../models/room');
const Booking = require('../models/booking'); // Import the Booking model

/*
roomSchema 
  name: String,
  costPerDay: Number,
  images: [String],
  type: String,
  description: String,
  salePriceFactor: Number
*/

const createRoom = async (req, res) => {
  const {
    name,
    costPerDay,
    photos,
    type,
    description,
    salePriceFactor,
  } = req.body;

  const room = new Room({
    name,
    costPerDay,
    images: photos,
    type,
    description,
    salePriceFactor,
  });

  try {
    await room.save();
    res.json(room);
  } catch (error) {
    console.error('Failed to save room data', error);
    res.status(500).json({ error: 'Failed to save room data' });
  }
};

const addExampleRoom = async (name, amountToPay, photos, type, description, salePriceFactor) => {
  const room = new Room({
    name: name,
    costPerDay: amountToPay,
    images: photos,
    type: type,
    description: description,
    salePriceFactor: salePriceFactor,
  });  
  const res  = await room.save();
  console.log("Room saved: " + JSON.stringify(res) +" , " + room.salePriceFactor);
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

// roomController.js
const modifyRoomDetails = async (req, res) => {
  try {
    const { roomId } = req.params;
    const {
      name,
      costPerDay,
      images,
      type,
      description,
      salePriceFactor,
    } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        name,
        costPerDay,
        images,
        type,
        description,
        salePriceFactor,
      },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(updatedRoom);
  } catch (error) {
    console.error('Failed to update room details', error);
    res.status(500).json({ error: 'Failed to update room details' });
  }
};

const delRoom = async (a) => await Room.deleteMany(a);
const delBooking = async (a) => await Booking.deleteMany(a);
// console.log("Removing room called \"Example room\"");
// const res = delRoom({name: 'Room 1'});
// console.log("Removing room gave result: " + res)
//console.log("Adding example room!");
// addExampleRoom('Example room', true, 100, ['romepage_pictures/room2.jpg', 'romepage_pictures/room3.jpg'], 'Single', 'A small single room');
//console.log("Norwegian Adding example room!");
const findRoom = async (a) => await Room.findOne(a);
// delRoom({name: 'Room 11'});
// delRoom({name: 'Room 12'});
// addExampleRoom("Room 11", 100, [], "Simple", "A nice small affordable room.", 1);
// addExampleRoom("Room 12", 200, [], "Advanced", "An advanced, next level room.", 1);

// const res = findRoom({name : 'Room 1'}).then((rooms) => console.log(rooms));
// console.log("test room got :"+ res);
module.exports = {
  createRoom,
  addExampleRoom,
  getRooms,
  getRoomById,
  getRoomExcludeDates, // Add the new controller function
  modifyRoomDetails,

};
