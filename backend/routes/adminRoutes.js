const express = require('express');
const router = express.Router();


const {
    adminLogin, 
    checkSession,
  } = require('../controllers');

  const requireAuth = (req, res, next) => {
    if (req.session.adminId) {
      // Admin is authenticated, proceed to the next middleware or route handler
      console.log('Admin is authenticated');
      next();
    } else {
      // Admin is not authenticated, redirect to the login page or send an error response
      res.redirect('/admin/login');
    }
  };

  router.post('/login', adminLogin);

  // Apply the requireAuth middleware to the dashboard route
  router.get('/check-session', requireAuth, (req, res) => {
    // Handle the dashboard logic here
  });

//   router.get('/check-session', checkSession); 
  module.exports = router;
