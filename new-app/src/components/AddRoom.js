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
      console.log("IMAGES: " + images);
      console.log("IMAGES after converting: " + (images.split(', ').map((image) => image.trim())));

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
        const imagesArray = images.split(', ');
        console.log(imagesArray)

        // Create the room object
        const newRoom = {
          name: roomName,
          costPerDay: costPerDay,
          images: imagesArray,
          type: type,
          description: description,
          salePriceFactor: salePriceFactor,
        };
   
        // Make the API call to create the room
        try {
          console.log("INSERTING: " + newRoom);
          const response = await axios.post((process.env.REACT_APP_API_URL || "http://localhost:4000")+ '/api/rooms', newRoom);
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
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">Add Room</h3>
      
          <form onSubmit={handleFormSubmit} className="border rounded p-4">
            <div className="-mx-3 md:flex mb-4">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="roomName" className="block mb-2">
                  Room Name:
                </label>
                <input
                  type="text"
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
      
              <div className="md:w-1/2 px-3">
                <label htmlFor="costPerDay" className="block mb-2">
                  Cost Per Day:
                </label>
                <input
                  type="number"
                  id="costPerDay"
                  value={costPerDay}
                  onChange={(e) => setCostPerDay(parseFloat(e.target.value))}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>
      
            <div className="-mx-3 md:flex mb-4">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="images" className="block mb-2">
                  Images (comma-separated):
                </label>
                <input
                  type="text"
                  id="images"
                  value={images}
                  onChange={(e) => setImages(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
      
              <div className="md:w-1/2 px-3">
                <label htmlFor="type" className="block mb-2">
                  Type:
                </label>
                <input
                  type="text"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>
      
            <div className="-mx-3 md:flex mb-4">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="description" className="block mb-2">
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
      
              <div className="md:w-1/2 px-3">
                <label htmlFor="salePriceFactor" className="block mb-2">
                  Sale Price Factor:
                </label>
                <input
                  type="number"
                  id="salePriceFactor"
                  value={salePriceFactor}
                  onChange={(e) => setSalePriceFactor(parseFloat(e.target.value))}
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
          </form>
      
          <p className="mt-4">{inputValidation}</p>
        </div>
      );
      
}

export default AddRoom;