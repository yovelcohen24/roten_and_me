const Promotion = require('../models/promotion');
/*
    title: String,
    description: String,
*/

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

const removePromotion = async (req, res) => {
  const {
    _id,
  } = req.params;
  try{
    const dbRes = await Promotion.findByIdAndDelete(_id);
    if(dbRes){
      res.status(200).json(dbRes);
    }else{
      res.status(404).json({ error: 'Could not find promotion'});
    }
  }
  catch(error){
    console.log(error);
    res.status(500).json({ error:'Deletion failed for promotion id = ' + _id});
  }
}

module.exports = {
    getAllPromotions,
    addPromotion,
    removePromotion,
};
