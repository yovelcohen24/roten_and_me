import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Popup from './PopUp';
// import 'tailwindcss/tailwind.css';

const ModifyRoomDetails = ({ onRoomSelect, selectedRoomId }) => {
  const { roomId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);
  const [newName, setNewName] = useState('');
  const [newCostPerDay, setNewCostPerDay] = useState(0);
  const [newImages, setNewImages] = useState([]);
  const [newType, setNewType] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newSalePriceFactor, setNewSalePriceFactor] = useState(0);
  
  // for user interaction
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [isGoodResponse, setIsGoodResponse] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get((process.env.REACT_APP_API_URL || "http://localhost:4000")+ '/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };

    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get((process.env.REACT_APP_API_URL || "http://localhost:4000") + `/api/rooms/${roomId}`);
        const { data } = response;
        setRoom(data);
        setNewName(data.name);
        setNewCostPerDay(data.costPerDay);
        setNewImages(data.images);
        setNewType(data.type);
        setNewDescription(data.description);
        setNewSalePriceFactor(data.salePriceFactor);
      } catch (error) {
        console.error('Failed to fetch room details:', error);
      }
    };

    fetchRooms();
    if (roomId) {
      fetchRoomDetails();
    }
  }, [roomId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Input validation
    const errors = {};
    
    if (!newName) {
      errors.name = 'Name is required';
    }
    
    if (!newType) {
      errors.type = 'Type is required';
    }
    
    if (!newDescription) {
      errors.description = 'Description is required';
    }
    
    if (!newCostPerDay || newCostPerDay <= 0) {
      errors.costPerDay = 'Cost per day must be a positive number';
    }
    
    if (!newSalePriceFactor || newSalePriceFactor <= 0 || newSalePriceFactor > 1) {
      errors.salePriceFactor = 'Sale price factor must be between 0 and 1';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Clear form errors
    setFormErrors({});
    
    const updatedRoom = {
      name: newName,
      costPerDay: newCostPerDay,
      images: newImages,
      type: newType,
      description: newDescription,
      salePriceFactor: newSalePriceFactor
    };
    
    try {
      const response = await axios.post((process.env.REACT_APP_API_URL || "http://localhost:4000") + `/api/rooms/${room._id}`, updatedRoom);
      console.log('Room details updated:', response.data);
      setIsFormSubmitted(true);
      setIsGoodResponse(true);
      setPopUpMessage('Form submitted successfully');
      // Clear the form fields here
      setNewName('');
      setNewCostPerDay('');
      setNewImages([]);
      setNewType('');
      setNewDescription('');
      setNewSalePriceFactor(0);
    } catch (error) {
      console.error('Failed to update room details:', error);
      setIsFormSubmitted(true);
      setIsGoodResponse(false);
      setPopUpMessage('Form submission failed');
    }
  };
  
  const handleRoomSelection = (e) => {
    const selectedRoomId = e.target.value;
    const selectedRoom = rooms.find((room) => room._id === selectedRoomId);
    setRoom(selectedRoom);
    setNewName(selectedRoom ? selectedRoom.name : '');
    setNewCostPerDay(selectedRoom ? selectedRoom.costPerDay : '');
    setNewImages(selectedRoom ? selectedRoom.images : '');
    setNewType(selectedRoom ? selectedRoom.type : '');
    setNewDescription(selectedRoom ? selectedRoom.description : '');
    setNewSalePriceFactor(selectedRoom ? selectedRoom.salePriceFactor : 0);
    onRoomSelect(selectedRoom ? selectedRoomId : '');
    setFormErrors({});
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Modify Room Details</h3>
  
      <select
        value={roomId}
        onChange={handleRoomSelection}
        className="border rounded p-2 mb-4"
      >
        <option value="">Select a Room</option>
        {rooms.map((room) => (
          <option
            key={`${room._id}-${room.name}`}
            value={room._id}
            className="p-2"
          >
            {room.name}
          </option>
        ))}
      </select>
  
      {room && (
        <form onSubmit={handleFormSubmit} className="border rounded p-4">
          <div className="mb-4">
            <label htmlFor="newName" className="block mb-2">
              New Name:
            </label>
            <input
              type="text"
              id="newName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border rounded p-2 w-1/4 text-center"
            />
            {formErrors.name && <span className="text-red-500 block mt-1">{formErrors.name}</span>}
          </div>
  
          <div className="mb-4">
            <label htmlFor="newCostPerDay" className="block mb-2">
              Cost Per Day:
            </label>
            <input
              type="number"
              id="newCostPerDay"
              value={newCostPerDay}
              onChange={(e) => setNewCostPerDay(e.target.value)}
              className="border rounded p-2  w-1/4 text-center"
            />
            {formErrors.costPerDay && <span className="text-red-500 block mt-1">{formErrors.costPerDay}</span>}
          </div>
  
          <div className="mb-4">
            <label htmlFor="newImages" className="block mb-2">
              Images:
            </label>
            <input
              type="text"
              id="newImages"
              value={newImages.join(', ')}
              onChange={(e) => setNewImages(e.target.value.split(', '))}
              className="border rounded p-2  w-1/4"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="newType" className="block mb-2">
              Type:
            </label>
            <input
              type="text"
              id="newType"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="border rounded p-2  w-1/4"
            />
            {formErrors.type && <span className="text-red-500 block mt-1">{formErrors.type}</span>}
          </div>
  
          <div className="mb-4">
            <label htmlFor="newDescription" className="block mb-2">
              Description:
            </label>
            <textarea
              type="text"
              id="newDescription"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border rounded p-2  w-1/4 h-full"
            />
            {formErrors.description && <span className="text-red-500 block mt-1">{formErrors.description}</span>}
          </div>
  
          <div className="mb-4">
            <label htmlFor="newSalePriceFactor" className="block mb-2">
              Sale Price Factor:
            </label>
            <input
              type="text"
              id="newSalePriceFactor"
              value={newSalePriceFactor}
              onChange={(e) => setNewSalePriceFactor(e.target.value)}
              className="border rounded p-2 text-center"
            />
            {formErrors.salePriceFactor && <span className="text-red-500 block mt-1">{formErrors.salePriceFactor}</span>}
          </div>
  
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Room
          </button>
        </form>
      )}
      {isFormSubmitted && (
        <Popup message={popUpMessage} onClose={() => setIsFormSubmitted(false)} isGoodResponse={isGoodResponse} />
      )}
    </div>
  );
  
  
  
  
};

export default ModifyRoomDetails;
