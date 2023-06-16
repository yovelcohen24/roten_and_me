const express = require('express');
const router = express.Router();
const roomRoutes = require('./roomRoutes');
const bookingRoutes = require('./bookingRoutes');

router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);

module.exports = router;
