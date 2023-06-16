// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const {
  createRoom,
  addExampleRoom,
  getRooms,
  getRoomById,
  getRoomExcludeDates, // Add the new function import
} = require('../controllers');

router.post('/', createRoom);
router.post('/example', (req, res) => {
  addExampleRoom('Example room', true, 100, [], 'Single', 'A small single room');
  res.send('Example room added');
});
router.get('/', getRooms);
router.get('/:roomId', getRoomById);
router.get('/:roomId/excludeDates', getRoomExcludeDates); // Add the new endpoint
module.exports = router;
