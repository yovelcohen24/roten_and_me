import React, { useState } from 'react';
import axios from 'axios';
import Popup from './PopUp';

const AddPromotion = () => {
    const [promotionTitle, setPromotionTitle] = useState('');
    const [promotionDescription, setPromotionDescription] = useState('');
    const [inputValidation, setInputValidation] = useState('');

    // popup:
    const [showPopup, setShowPopup] = useState(false);
    const [successfulSub, setSuccessfulSub] = useState(false);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Input validation
        if (
          promotionTitle.trim() === '' ||
          promotionDescription.trim() === ''
        ) {
          // Display an error message or handle the validation error as per your requirement
          console.error('Invalid input');
          setInputValidation("Invalid input for promotion!");
          return;
        }
   

        // Create the room object
        const newPromotion = {
          title: promotionTitle,
          description: promotionDescription,
        };
   
        // Make the API call to create the room
        try {
          const response = await axios.post((process.env.REACT_APP_API_URL || "http://localhost:4000")+ '/api/promotions', newPromotion);
          console.log('Promotion created:', response.data);
          setShowPopup(true);
          setSuccessfulSub(true);
          // Handle success or perform any necessary actions
        } catch (error) {
          console.error('Failed to create promotion:', error);
          // Handle the error response or display an error message
          setShowPopup(true);
          setSuccessfulSub(false);
        }
   
        // Reset the form inputs
        setPromotionTitle('');
        setPromotionDescription('');
      };
      return (
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">Add Promotion</h3>
      
          <form onSubmit={handleFormSubmit} className="border rounded p-4">
            <div className="-mx-3 md:flex mb-4">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="promotionTitle">
                  Promotion Title:
                </label>
                <input
                  type="text"
                  id="promotionTitle"
                  value={promotionTitle}
                  onChange={(e) => setPromotionTitle(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
      
              <div className="md:w-1/2 px-3">
                <label className="uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="description">
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  value={promotionDescription}
                  onChange={(e) => setPromotionDescription(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>
      
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
            <div className="h-10">
          <p className="mt-2 text-red-500 antialiased font-semibold drop-shadow">{inputValidation}</p>
          </div>
          </form>
          {
            showPopup && 
            <Popup 
            message={successfulSub?"Promotion successfully inserted!" : "Operation failed!"} 
            onClose={() => setShowPopup(false)} 
            isGoodResponse={successfulSub} />
          }
        </div>
      );
      
}

export default AddPromotion;