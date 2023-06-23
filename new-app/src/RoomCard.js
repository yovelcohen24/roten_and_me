import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const { name, type, description, images } = room;
  console.log(":");
  console.log(name, type, description, images);

  return (
    <div className="room-card">
      <h3>{name}</h3>
      {images.length > 0 && (
       <img src={process.env.PUBLIC_URL + room.images[0]} alt={name} style={{height:490, width:800}}/>

      )}
      <p>Type: {type}</p>
      <p>Description: {description}</p>
      <div className="room-card-buttons">
        <Link to={`/rooms/${room._id}`}>View Details</Link>
      </div>
    </div>
  );
};

export default RoomCard;
