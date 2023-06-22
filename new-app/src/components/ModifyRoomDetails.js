import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };

    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/rooms/${roomId}`);
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

    const updatedRoom = {
        name: newName,
        costPerDay: newCostPerDay,
        images: newImages,
        type: newType,
        description: newDescription,
        salePriceFactor: newSalePriceFactor
      };

    try {
      const response = await axios.put(`http://localhost:4000/api/rooms/${room._id}`, updatedRoom);
      console.log('Room details updated:', response.data);
    } catch (error) {
      console.error('Failed to update room details:', error);
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
  };

  return (
    <div>
      <h3>Modify Room Details</h3>
      <select value={roomId} onChange={handleRoomSelection}>
        <option value="">Select a Room</option>
        {rooms.map((room) => (
          <option key={`${room._id}-${room.name}`} value={room._id}>
            {room.name}
          </option>
        ))}
      </select>
      {room && (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="newName">New Name:</label>
          <input
            type="text"
            id="newName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
               <label htmlFor="newCostPerDay">Cost Per Day:</label>
     <input
       type="number"
       id="newCostPerDay"
       value={newCostPerDay}
       onChange={(e) => setNewCostPerDay(e.target.value)}
     />

     <label htmlFor="newImages">Images:</label>
     <input
       type="text"
       id="newImages"
       value={newImages.join(', ')}
       onChange={(e) => setNewImages(e.target.value.split(', '))}
     />

     <label htmlFor="newType">Type:</label>
     <input
       type="text"
       id="newType"
       value={newType}
       onChange={(e) => setNewType(e.target.value)}
     />

     <label htmlFor="newDescription">Description:</label>
     <input
       type="text"
       id="newDescription"
       value={newDescription}
       onChange={(e) => setNewDescription(e.target.value)}
     />

     <label htmlFor="newSalePriceFactor">Sale Price Factor:</label>
            <input
            type="float"
            id="newSalePriceFactor"
            value={newSalePriceFactor}
            onChange={(e) => setNewSalePriceFactor(e.target.value)}
            />
          <button type="submit">Update Room</button>
        </form>
      )}
    </div>
  );
};

export default ModifyRoomDetails;
