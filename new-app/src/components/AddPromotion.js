import React, { useState } from 'react';
import axios from 'axios';

const AddPromotion = () => {
    const [promotionTitle, setPromotionTitle] = useState('');
    const [promotionDescription, setPromotionDescription] = useState('');
    const [inputValidation, setInputValidation] = useState('');

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
          const response = await axios.post('http://localhost:4000/api/promotions', newPromotion);
          console.log('Promotion created:', response.data);
          // Handle success or perform any necessary actions
        } catch (error) {
          console.error('Failed to create promotion:', error);
          // Handle the error response or display an error message
        }
   
        // Reset the form inputs
        setPromotionTitle('');
        setPromotionDescription('');
      };
      return (
        <div>
                        <h3>Add Promotion</h3>

               <form onSubmit={handleFormSubmit}>
     <label htmlFor="roomName">Promotion title:</label>
     <input
       type="text"
       id="roomName"
       value={promotionTitle}
       onChange={(e) => setPromotionTitle(e.target.value)}
     />
     <label htmlFor="description">Description:</label>
     <input
       type="text"
       id="description"
       value={promotionDescription}
       onChange={(e) => setPromotionDescription(e.target.value)}
     />

     <button type="submit">Submit</button>
   </form>
   <p>
    {inputValidation}
   </p>
        </div>
      )
}

export default AddPromotion;