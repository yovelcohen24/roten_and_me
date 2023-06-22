import React, { useState } from 'react';


const HomePage = () => {
  const bnbImages = [
    require('./homepage_pictures/pic1.jpg'),
    require('./homepage_pictures/pic2.jpg'),
    require('./homepage_pictures/pic3.jpg'),
    require('./homepage_pictures/pic4.jpg'),
    require('./homepage_pictures/pic5.jpg')
  ];
  

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bnbImages.length);
  };

  const handlePrevImage = () => {
    // modified to also be circular
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? bnbImages.length - 1 : prevIndex - 1
    );
  };
  console.log('test');
  return (
    <div className='home_page_title'>
      <h1>ברוכים הבאים לצימרים בר יוחאי </h1>
      <div className="image_container">
        <img src={bnbImages[currentImageIndex]} alt={`B&B ${currentImageIndex + 1}`} className="bnb_image" />
        <div className="arrow_container">
          <button onClick={handlePrevImage} className="arrow_button left_arrow">&#8249;</button>
          <button onClick={handleNextImage} className="arrow_button right_arrow">&#8250;</button>
        </div>
      </div>
      <div className="contact_info">
        <p>עוזי כהן: 0507768123</p>
        <p>אסנת כהן: 0507768135</p>
      </div>
    </div>
  );
};

export default HomePage;
