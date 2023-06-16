const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');

const INITIALIZE_DB = true;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Create an Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse request body as JSON
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Define a Room schema for MongoDB
const roomSchema = new mongoose.Schema({
  name: String,
  isVacant: Boolean,
  costPerDay: Number, // Cost per day.
  images: [String], // Array of photo URLs
  type: String,
  description: String,
});

// Also define the Booking schema for all rooms:
const bookingSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  rentedBy: String,
  roomId: String,
  totalCost: Number
});

// Create a Room model
const Room = mongoose.model('Room', roomSchema);
// Create a Booking model
const Booking = mongoose.model('Booking', bookingSchema);

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


const createBooking = async (req, res) => {
  const {
    name,
    startDate,
    endDate,
    rentedBy,
    roomId
  } = req.body;

  const room = await Room.findById(roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  const numberOfDays = moment(endDate).diff(moment(startDate), 'days');
  const totalCost = numberOfDays * room.costPerDay;

  const overlappingBookings = await Booking.find({ roomId, startDate: { $lte: endDate }, endDate: { $gte: startDate } });
  if (overlappingBookings.length > 0) {
    return res.status(400).json({ error: 'The room is not available for the selected dates' });
  }

  const booking = new Booking({
    name,
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


// Define an API endpoint to save room data
app.post('/api/rooms', async (req, res) => {
  return await createRoom(req, res);
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Define an API endpoint to add a new booking for some room 
app.post('/api/booking', async (req, res) => {
  console.log("booking api called!")
  const {
    name,
    startDate,
    endDate,
    rentedBy,
    roomId,
  } = req.body;

  let room = (await Room.findOne({name: name}));
  console.log("room fucking dfound!" + room)
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  const numberOfDays = moment(endDate).diff(moment(startDate), 'days');
  const totalCost = numberOfDays * room.costPerDay;
  const overlappingBookings = await Booking.find({ name: name, startDate: { $lte: endDate }, endDate: { $gte: startDate } });
  console.log("booking overlapping called~!!")
  if (overlappingBookings.length > 0) {
  console.log("The room is not available for the selected dates!")
    return res.status(400).json({ error: 'The room is not available for the selected dates' });
  }

  const booking = new Booking({
    name,
    startDate,
    endDate,
    rentedBy,
    roomId,
    totalCost
  });
  console.log("created new fucking booking! " + booking)
  try {
    const adss = await booking.save();
    console.log("Added fucking booking :" + adss)
    res.json(booking);
    console.log("Successful booking for " + JSON.stringify(booking));
  } catch (error) {
    console.error('Failed to save booking data', error);
    res.status(500).json({ error: 'Failed to save booking data' });
  }
  // return to using this after it works
  // await createBooking(req, res);
});


async function add_example_room(name, isFree, amountToPay, photos, type, description) {
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

// Define an API endpoint to fetch room data
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    console.error('Failed to fetch room data', error);
    res.status(500).json({ error: 'Failed to fetch room data' });
  }
});

// Define an API endpoint to fetch room details
app.get('/api/rooms/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    res.json(room);
  } catch (error) {
    console.error('Failed to fetch room details', error);
    res.status(500).json({ error: 'Failed to fetch room details' });
  }
});

// Define an API endpoint to fetch bookings details
app.get('/api/bookings/:roomId', async (req, res) => {
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
});


// app.get("api/bookings:roomName", async (req, res) => {
//   console.log('Loading bookings');
//   try {
//     console.log('Loading bookings');
//     const { roomName } = req.params;
//     const bookings = await Booking.find({name: roomName });
//     console.log('fucking' + JSON.stringify(bookings));
//     res.json(bookings);
//   } catch (error) {
//     console.error("Failed to fetch bookings", error);
//     res.status(500).json({ error: "Failed to fetch bookings" });
//   }
// });

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//////////////////////////////
// initialization
//////////////////////////////


if (INITIALIZE_DB) {
  // deletion example:
  const delRoom = async (a) => await Room.deleteMany(a);
  const delBooking = async (a) => await Booking.deleteMany(a);

  delRoom({name : "5"});
    add_example_room("5",true, 1., ["assad nasralasad"], "dsadasass", "add");

  // delRoom({name : "1"});
  delBooking({name : "5"});
  delBooking({name : "3"});
  delBooking({name : "2"});

}