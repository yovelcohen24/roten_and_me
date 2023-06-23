const Promotion = require('../models/promotion');

const getAllPromotions = async (req, res) => {
    try {
        const p = await Promotion.find({});
        res.send(p);
      } catch (error) {
        console.error('Failed to fetch promotion data', error);
        res.status(500).json({ error: 'Failed to fetch promotion data' });
      }
}

const addPromotion = async (req, res) => {
    const {
            title,
            description,
      } = req.body;
    
      const p = new Promotion({
        title: title,
        description: description,
      });
    
      try {
        await p.save();
        res.json(p);
      } catch (error) {
        console.error('Failed to save promotion data', error);
        res.status(500).json({ error: 'Failed to save promotion data' });
      }
}

module.exports = {
    getAllPromotions,
    addPromotion,
};
  