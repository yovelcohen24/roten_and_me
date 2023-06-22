import React, { useState } from 'react';
import axios from 'axios';

const AddRoom = () => {
    const [roomName, setRoomName] = useState('');
    const [costPerDay, setCostPerDay] = useState(0);
    const [images, setImages] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [salePriceFactor, setSalePriceFactor] = useState(1);
    const [inputValidation, setInputValidation] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Input validation
        if (
          roomName.trim() === '' ||
          costPerDay <= 0 ||
          
          type.trim() === '' ||
          description.trim() === '' ||
          salePriceFactor <= 0 || salePriceFactor > 1
        ) {
          // Display an error message or handle the validation error as per your requirement
          console.error('Invalid input');
          setInputValidation("Invalid input for room!");
          return;
        }
   
        // Convert the images string into an array
        const imagesArray = images.split(',').map((image) => image.trim());
   
        // Create the room object
        const newRoom = {
          name: roomName,
          costPerDay,
          images: imagesArray,
          type,
          description,
          salePriceFactor,
        };
   
        // Make the API call to create the room
        try {
          const response = await axios.post('http://localhost:4000/api/rooms', newRoom);
          console.log('Room created:', response.data);
          // Handle success or perform any necessary actions
        } catch (error) {
          console.error('Failed to create room:', error);
          // Handle the error response or display an error message
        }
   
        // Reset the form inputs
        setRoomName('');
        setCostPerDay(0);
        setImages('');
        setType('');
        setDescription('');
        setSalePriceFactor(1);
        setInputValidation('');
      };
      return (
        <div>
                        <h3>Add Room</h3>

               <form onSubmit={handleFormSubmit}>
     <label htmlFor="roomName">Room Name:</label>
     <input
       type="text"
       id="roomName"
       value={roomName}
       onChange={(e) => setRoomName(e.target.value)}
     />

     <label htmlFor="costPerDay">Cost Per Day:</label>
     <input
       type="number"
       id="costPerDay"
       value={costPerDay}
       onChange={(e) => setCostPerDay(parseFloat(e.target.value))}
     />

     <label htmlFor="images">Images (comma-separated):</label>
     <input
       type="text"
       id="images"
       value={images}
       onChange={(e) => setImages(e.target.value)}
     />

     <label htmlFor="type">Type:</label>
     <input
       type="text"
       id="type"
       value={type}
       onChange={(e) => setType(e.target.value)}
     />

     <label htmlFor="description">Description:</label>
     <input
       type="text"
       id="description"
       value={description}
       onChange={(e) => setDescription(e.target.value)}
     />

     <label htmlFor="salePriceFactor">Sale Price Factor:</label>
     <input
       type="number"
       id="salePriceFactor"
       value={salePriceFactor}
       onChange={(e) => setSalePriceFactor(parseFloat(e.target.value))}
     />

     <button type="submit">Add Room</button>
   </form>
   <p>
    {inputValidation}
   </p>
        </div>
      )
}

export default AddRoom;