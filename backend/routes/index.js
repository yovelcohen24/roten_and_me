const express = require('express');
const router = express.Router();
const roomRoutes = require('./roomRoutes');
const bookingRoutes = require('./bookingRoutes');
const adminRoutes = require('./adminRoutes');
const promotionRoutes = require('./promotionRoutes');


router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);
router.use('/admin', adminRoutes);
router.use('/promotions', promotionRoutes);

module.exports = router;
