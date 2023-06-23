// models/room.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  isLoggedIn: Boolean,  // to avoid double login
  allPermissions: Boolean,  // might be used to make a special user that can delete admins
});
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
