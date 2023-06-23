// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const {
  createRoom,
  addExampleRoom,
  getRooms,
  getRoomById,
  getRoomExcludeDates, // Add the new function import
  modifyRoomDetails,
} = require('../controllers');

router.post('/', createRoom);
router.post('/example', (req, res) => {
  addExampleRoom('Example room', 100, ['romepage_pictures/room2.jpg', 'romepage_pictures/room3/jpg'], 'Single', 'A small single room', 1);
  res.send('Example room added');
});

router.get('/', getRooms);
router.get('/:roomId', getRoomById);
router.get('/:roomId/excludeDates', getRoomExcludeDates); // Add the new endpoint

router.put('/:roomId', modifyRoomDetails);

module.exports = router;
