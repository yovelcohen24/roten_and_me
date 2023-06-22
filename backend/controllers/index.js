const roomController = require('./roomController');
const bookingController = require('./bookingController');
const adminController = require('./adminController');


module.exports = {
  ...roomController,
  ...bookingController,
  ...adminController,
};
