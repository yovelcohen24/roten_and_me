const express = require('express');
const router = express.Router();

const {
  adminLogin,
  verifyToken,
  
} = require('../controllers');

router.post('/login', adminLogin);

// Example route with protected access
router.post('/protected-route', verifyToken);

module.exports = router;
