import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const { name, type, description, images } = room;

  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg flex justify-center items-center" style={{ justifySelf: 'center' }}>
      <div className="flex flex-col">
        <div className="relative">
          {images.length > 0 && (
            <img
              className="w-full h-48 object-cover"
              src={process.env.PUBLIC_URL + "/" + room.images[0]}
              alt={name}
            />
          )}
          <div className="absolute bottom-0 left-0 bg-blue-500 text-white font-bold py-2 px-4 rounded-bl-full">
            <Link to={`/rooms/${room._id}`}>View Details</Link>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <div className="border-t mt-2 mb-4"></div>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="p-4 mt-auto">
          <p className="text-gray-600">Type: {type}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
