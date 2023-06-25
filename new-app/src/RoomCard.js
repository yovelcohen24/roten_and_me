import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const { name, type, description, images } = room;

  return (
    <div className="relative w-72 h-160 rounded overflow-hidden shadow-lg flex flex-col justify-between items-center mx-auto my-8 ">
      <div className="relative w-full h-3/5">
        {images.length > 0 && (
          <div className="max-w-screen-lg mx-auto h-0 pb-[75%] overflow-hidden relative flex items-center justify-center">
            <img
              className="object-cover absolute inset-0 w-full h-full"
              src={process.env.PUBLIC_URL + "/" + room.images[0]}
              alt={name}
            />
          </div>
        )}
        <div className="absolute bottom-0 left-0 bg-blue-500 text-white font-bold py-2 px-4 rounded-bl-full">
          <Link to={`/rooms/${room._id}`} className="hover:underline">View details</Link>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-center">{name}</h3>
        <div className="border-t mt-2 mb-4"></div>
        <p className="text-gray-600 text-center overflow-hidden h-40">{description}</p>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-left">Type: {type}</p>
      </div>
    </div>
  );
};

export default RoomCard;
