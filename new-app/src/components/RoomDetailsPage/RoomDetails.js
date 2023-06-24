import React from 'react';
const RoomDetails = ({ room }) => {
  const [imageDimensions, setImageDimensions] = React.useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

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


  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handlePrevClick = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? room.images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === room.images.length - 1 ? 0 : prevIndex + 1));
  };
  const openImagePopup = () => {
    setIsImagePopupOpen(true);
  };

  const closeImagePopup = () => {
    setIsImagePopupOpen(false);
  };
const ONE_PERSON_PRICE = 100;
  return (
    <div className="bg-gray-100">
      {isImagePopupOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={closeImagePopup}>
          <div className="max-w-3xl mx-auto">
            <img
              src={`${process.env.PUBLIC_URL}/${room.images[selectedImageIndex]}`}
              alt={`Room ${room.name}, pic[${selectedImageIndex}]`}
              className="rounded-lg shadow-md object-cover object-center w-full h-auto"
            />
          </div>
        </div>
      )}
    
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-center md:items-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-2 md:mr-8">{room.name}</h2>
            <p className="text-2xl">Price: {room.costPerDay}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-4">
              <p className="text-lg md:mr-8 mb-4">{room.description}</p>
              <p className="text-lg">Type: {room.type}</p>
            </div>
            <div className="carousel-container bg-white rounded-lg shadow-lg p-4">
              <div className="carousel">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden mb-4">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="image-container">
                      <img
                        src={`${process.env.PUBLIC_URL}/${room.images[selectedImageIndex]}`}
                        alt={`Room ${room.name}, pic[${selectedImageIndex}]`}
                        className="rounded-lg shadow-md object-cover object-center w-72 h-40"
                        onClick={openImagePopup}
                      />
                    </div>
                  </div>
                </div>
                <div className="carousel-thumbnails flex justify-center mt-4">
                  {room.images.map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-w-16 aspect-h-9 overflow-hidden mx-2 cursor-pointer ${
                        index === selectedImageIndex && 'border-2 border-blue-500'
                      }`}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <div className="thumbnail-image-container">
                        <img
                          src={`${process.env.PUBLIC_URL}/${image}`}
                          alt={`Room ${room.name}, pic[${index}]`}
                          className="rounded-lg shadow-md object-cover object-center w-12 h-7"
                          onClick={() => handleThumbnailClick(index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="carousel-controls flex justify-between mt-4">
                  <button
                    className="carousel-prev p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                    aria-label="Previous"
                    onClick={handlePrevClick}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                  </button>
                  <button
                    className="carousel-next p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                    aria-label="Next"
                    onClick={handleNextClick}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
