import React from 'react';
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
    <div className="bg-blue-500 bg-opacity-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">{room.name}</h2>
          <div className="flex flex-col md:flex-row justify-center md:items-center mb-4">
            <p className="text-lg md:mr-8">{room.description}</p>
            <p className="text-lg">Type: {room.type}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {room.images.map((image, index) => {
              const { width, height } = imageDimensions[index] || {};
  
              return (
                <div key={index} className="aspect-w-1 aspect-h-1 overflow-hidden" style={{ height: "200px" }}>
                  <img
                    src={`${process.env.PUBLIC_URL}/${image}`}
                    alt={`Room ${room.name}, pic[${index}]`}
                    className="rounded-lg shadow-md"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <p className="text-2xl mt-8">Price: {room.costPerDay}</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default RoomDetails;
