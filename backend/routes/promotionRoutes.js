// promotionRoutes.js
const express = require('express');
const router = express.Router();

const {
    getAllPromotions,
    addPromotion,
    removePromotion,
  } = require('../controllers');
  
router.delete('/:_id', removePromotion);

  router.post('/', addPromotion);

  router.get('/', getAllPromotions);


module.exports = router;
