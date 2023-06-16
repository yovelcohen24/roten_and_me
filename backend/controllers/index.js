const roomController = require('./roomController');
const bookingController = require('./bookingController');

module.exports = {
  ...roomController,
  ...bookingController,
};
