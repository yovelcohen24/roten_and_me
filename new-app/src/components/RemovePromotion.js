import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Popup from './PopUp';

const RemovePromotion = () => {
  const  [promotionId, setPromotionId]  = useState('');
    const [promotions, setPromotions] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [inputValidationMessage, setInputValidationMessage] = useState('');

    useEffect(() => {
        const fetchPromotions = async () => {
          try {
            const response = await axios.get((process.env.REACT_APP_API_URL || "http://localhost:4000")+ '/api/promotions');
            setPromotions(response.data);
          } catch (error) {
            console.error('Failed to fetch promotions:', error);
          }
        };
        fetchPromotions();
    }, [promotionId]);

    const handlePromotionSelection = async (e) => {
      setPromotionId(e.target.value);
      setInputValidationMessage('');

    }

    const removePromotion = async () => {
      if(promotionId === '') {
        setInputValidationMessage("Please choose a promotion!");
        return;
      }
      try {
        const response = await axios.delete((process.env.REACT_APP_API_URL || "http://localhost:4000")+ `/api/promotions/${promotionId}`);
        // setPromotions(response.data);
        console.log(response);
        setPromotions(promotions.filter((promotion) => promotion._id !== promotionId));
        setShowPopup(true);
        setInputValidationMessage('');
      } catch (error) {
        console.error('Failed to delete promotions:', error);
      }
    }

    return (
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">Remove Promotion</h3>

  <div className="mb-4 ">
    <select
      value={promotionId}
      onChange={handlePromotionSelection}
      className="border rounded p-2 mb-2 w-1/4"
    >
      <option value="">Select a Promotion</option>
      {promotions && (promotions.map((room) => (
        <option
          key={`${room._id}-${room.title}`}
          value={room._id}
          className="p-2"
        >
          {room.title}
        </option>
      )))}
    </select>

   </div>
  <button className="mt-2 bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={removePromotion}>Remove</button>
  <div className="h-4">
    <p className="mt-2 text-red-500 antialiased font-semibold drop-shadow">{inputValidationMessage}</p>
  </div> 
  {
    showPopup &&
    <Popup
      message={"Promotion successfully deleted!"}
      onClose={() => setShowPopup(false)}
      isGoodResponse={true}
    />
  }
</div>

    );
}

export default RemovePromotion;