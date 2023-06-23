import React from 'react';
import 'tailwindcss/tailwind.css';

const RoomDetails = ({ room }) => {
  const [imageDimensions, setImageDimensions] = React.useState([]);

  React.useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions = await Promise.all(
        room.images.map((image) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = `${process.env.PUBLIC_URL}/${image}`;
            img.onload = () => {
              const { width, height } = calculateResizedDimensions(
                img.naturalWidth,
                img.naturalHeight,
                500,
                500
              );
              resolve({ width, height });
            };
          });
        })
      );
      setImageDimensions(dimensions);
    };

    loadImageDimensions();
  }, [room.images]);

  const calculateResizedDimensions = (originalWidth, originalHeight, maxWidth, maxHeight) => {
    const aspectRatio = originalWidth / originalHeight;

    let width = originalWidth;
    let height = originalHeight;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    return { width, height };
  };

  return (
<div className="container mx-auto px-4 py-8">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-2xl font-bold mb-2 text-center">{room.name}</h2>
    <p className="mb-2">{room.description}</p>
    <p className="mb-2">Type: {room.type}</p>
    <p className="mb-4">Price: {room.costPerDay}</p>
    {/* Render images */}
    <div className="grid grid-cols-2 gap-4">
      {room.images.map((image, index) => {
        const { width, height } = imageDimensions[index] || {};

        return (
          <div key={index} className="aspect-w-1 aspect-h-1 overflow-hidden" style={{ height: "200px" }}>
            <img
              src={`${process.env.PUBLIC_URL}/${image}`}
              alt={`Room ${room.name}, pic[${index}]`}
              className="object-cover rounded-lg shadow-md"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        );
      })}
    </div>
  </div>
</div>



  );
};

export default RoomDetails;
