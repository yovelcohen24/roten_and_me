import React from 'react';
const RoomDetails = ({ room }) => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);


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
  return (
    <div>
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
          <div className="flex flex-col md:flex-row justify-center md:items-center mb-8 justify-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-2 md:mr-8 text-center text-white">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                {room.name}
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-4">
              <p className="text-lg">Description: {room.description}</p>
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
                      className={`aspect-w-16 aspect-h-9 overflow-hidden mx-2 cursor-pointer ${index === selectedImageIndex && 'border-2 border-blue-500'
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <p className="text-lg md:self-center">Type: {room.type}</p>
            <div className="md:self-center mt-4 md:mt-0 md:ml-4">
              <div className="relative">
                <p className="text-2xl font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 py-2 rounded-full text-center group">
                  Price: {room.costPerDay} (ILS)
                  <span className="text-sm absolute top-full left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-lg shadow-md opacity-0 invisible transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:visible">
                    Up to 2 people. Extra guests are 100 ILS per person.
                  </span>
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
