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

  const backgroundImage = 'sitew.jpg';



  return (
    <div className="relative min-h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url(/${backgroundImage})`,
        }}
      ></div>
      <div className="relative py-8 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold mb-4">Our Rooms</h2>
        <div className="flex flex-wrap justify-center gap-4 bg-blue bg-opacity-90">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} className="w-1/4" />
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default RoomsPage;
