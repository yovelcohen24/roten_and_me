import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomCard from './RoomCard';
import './roompage.css';


const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get((process.env.REACT_APP_API_URL || "http://localhost:4000")+ '/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Failed to fetch room data', error);
      }
    };
    
    fetchRooms();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">הצימרים שלנו</h2>
      <div className="flex justify-center">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
  
  
};

export default RoomsPage;
