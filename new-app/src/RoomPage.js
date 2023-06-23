import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import axios from 'axios';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Failed to fetch room data', error);
      }
    };
    
    fetchRooms();
  }, []);

  return (
    <div className="rooms-page">
      <h2>הצימרים שלנו</h2>
      <div className="room-cards">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
