const axios = require('axios');
// Rest of your code


// Define the room data
const roomData = [
  {
    name: "Room 1",
    isFree: true,
    rentedBy: null,
    rentStartDate: null,
    rentEndDate: null,
    amountToPay: null,
    photos: ["/roompage_pictures/room2.jpg", "/roompage_pictures/room3.jpg"],
    type: "Standard",
    description: "This is a standard room."
  },
  {
    name: "Room 2",
    isFree: true,
    rentedBy: null,
    rentStartDate: null,
    rentEndDate: null,
    amountToPay: null,
    photos: ["/roompage_pictures/room2.jpg", "/roompage_pictures/room3.jpg"],
    type: "big",
    description: "This is a deluxe room."
  },{ name: "Room 3",
      isFree: true,
      rentedBy: null,
      rentStartDate: null,
      rentEndDate: null,
      amountToPay: null,
      photos: ["/roompage_pictures/room2.jpg", "./roompage_pictures/room3.jpg"],
      type: "big",
      description: "This is a deluxe room."
},
{ name: "Room 4",
      isFree: true,
      rentedBy: null,
      rentStartDate: null,
      rentEndDate: null,
      amountToPay: null,
      photos: ["/roompage_pictures/room2.jpg", "./roompage_pictures/room3.jpg"],
      type: "small",
      description: "This is a deluxe room."
    } 
];

// Function to insert room data
const insertRoomData = async () => {
  try {
    // Loop through each room and insert the data
    for (const room of roomData) {
      await axios.post((process.env.REACT_APP_API_URL || "http://localhost:4000")+ '/api/rooms', room);
    }
    console.log('Room data inserted successfully');
  } catch (error) {
    console.error('Failed to insert room data', error);
  }
};

// Call the function to insert room data
insertRoomData();
