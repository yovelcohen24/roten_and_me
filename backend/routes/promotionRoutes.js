// promotionRoutes.js
const express = require('express');
const router = express.Router();

const {
    getAllPromotions,
    addPromotion,
  } = require('../controllers');
  
  router.post('/', addPromotion);

  router.get('/', getAllPromotions);


module.exports = router;
