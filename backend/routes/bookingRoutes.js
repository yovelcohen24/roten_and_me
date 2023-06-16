// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookingsByRoomId,
} = require('../controllers');

router.post('/', createBooking); // Update the route path to '/'
// router.post('/booking', createBooking);
router.get('/:roomId', getBookingsByRoomId);

module.exports = router;
