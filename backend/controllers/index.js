const roomController = require('./roomController');
const bookingController = require('./bookingController');
const adminController = require('./adminController');
const promotionController = require('./promotionController');


module.exports = {
  ...roomController,
  ...bookingController,
  ...adminController,
  ...promotionController,

};
