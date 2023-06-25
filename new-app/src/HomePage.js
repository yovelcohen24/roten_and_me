import placesData from './placesData';
import React, { useState, useEffect } from 'react';
import TestimonialItem from './TestimonialItem';
import testimonialsData from './testimonialsData';
import { Link } from 'react-scroll';
import axios from 'axios';
import './homepage.css';
// import backgroundImage from './logo512.png'; // Assuming the image is located in the public folder
  const HomePage = (props) => {
    const bnbImages = [
      require('./homepage_pictures/pic1.jpg'),
      require('./homepage_pictures/pic2.jpg'),
      require('./homepage_pictures/pic3.jpg'),
      require('./homepage_pictures/pic4.jpg'),
      require('./homepage_pictures/pic5.jpg'),
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);
    const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
    const [promotionsData, setPromotionsData] = useState([]);

  const handleNextPlace = () => {
    setCurrentPlaceIndex((prevIndex) => (prevIndex + 1) % placesData.length);
  };

  const handlePreviousPlace = () => {
    setCurrentPlaceIndex((prevIndex) => (prevIndex - 1 + placesData.length) % placesData.length);
  };

  // Define your promotions data
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get((process.env.REACT_APP_API_URL || "http://localhost:4000")+ '/api/promotions');
        setPromotionsData(response.data);
      } catch (error) {
        console.error('Failed to fetch room data', error);
      }
    };
    
    fetchRooms();
  }, []);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bnbImages.length);
      }, 3000);
  
      return () => {
        clearInterval(interval);
      };
    }, [bnbImages.length]);
  
    
  
    const navigatePromotion = (direction) => {
      if (direction === 'prev') {
        setCurrentPromotionIndex((prevIndex) => (prevIndex - 1 + promotionsData.length) % promotionsData.length);
      } else if (direction === 'next') {
        setCurrentPromotionIndex((prevIndex) => (prevIndex + 1) % promotionsData.length);
      }
    };
    const goToRoomPage = () => {
      props.history.push('/rooms');
    };
    const backgroundImage = "sitew.jpg";
    return (
      
    <div className="bg-gray-200 bg-opacity-50 centered-cut-corner-wrapper bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(/${backgroundImage})` }}>
      <div className="container mx-auto px-4 bg-gray-100 min-h-screen bg-opacity-80 transition-colors duration-500 ease-in-out hover:bg-opacity-90">
      <div className="container mx-auto text-center">
        
      <nav className="flex items-center justify-center py-4">
        <ul className="flex justify-center">
          <li className="mx-2">
            <Link to="general" smooth={true} duration={500}>General Info</Link>
          </li>
          <li className="mx-2">
            <Link to="opinions" smooth={true} duration={500}>Guest Recommendations</Link>
          </li>
          <li className="mx-2">
            <Link to="specials" smooth={true} duration={500}>Promotions</Link>
          </li>
          <li className="mx-2">
            <Link to="around" smooth={true} duration={500}>What's around us</Link>
          </li>
          <li className="mx-2">
            <Link to="how-to-get" smooth={true} duration={500}>Map</Link>
          </li>
        </ul>
      </nav>

      
      <div id="general" className="py-8">
        <h1 className="text-4xl font-bold pb-6">Welcome to Bar-Yohai lodging!</h1>
        <div className="max-w-screen-lg mx-auto h-0 pb-[30%] overflow-hidden relative flex items-center justify-center">
          <img src={bnbImages[currentImageIndex]} alt={`B&B ${currentImageIndex + 1}`} className="object-cover absolute inset-0 w-full h-full" />
        </div>
          <div className="mt-8 ">
            <div className="flex">
            <div className="p-2">
    <div className="font-bold text-lg">Location</div>
    <div className="mt-2">
      Bar-Yohai is a Jewish religious community in the upper Galille, in Israel. The community is a home to several temples and other religious sites. Located near Har-Meiron, with an amazing view. 
      </div>
  </div>
  <div className="p-2">
    <div className="font-bold text-lg">What's inside</div>
    <div className="mt-2">
      The lodging rooms contain a full kitchen with many utilities, a double-bed, Jacuzzi, TV, food and everything you'll ever want in your vacation.</div>
  </div>
  <div className="p-2">
    <div className="font-bold text-lg">Our garden</div>
    <div className="mt-2">
      Our gardens have swings, benches, synthetic grass, and a nice wooden sitting area. At night one can enjoy external lighting, barbeque options and a good evening with friends and family. 
      </div>
  </div>
        </div>
      </div>
      <div id="opinions" className="py-8">
  <h2 className="text-2xl font-bold mb-4">Guest Recommendations</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {testimonialsData.map((testimonial, index) => (
      <TestimonialItem key={index} testimonial={testimonial} />
    ))}
  </div>
</div>

<div id="specials" className="py-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Our Promotions</h2>
      <div className="promotions_container mx-auto">
        <div className="max-w-lg mx-auto">
          {promotionsData.map((promotion, index) => (
            <div
              key={index}
              className={`promotion_item ${index === currentPromotionIndex ? 'active' : ''}`}
              style={{
                display: index === currentPromotionIndex ? 'block' : 'none',
              }}
            >
              <h3 className="text-lg font-bold">{promotion.title}</h3>
              <p className="mt-2 overflow-hidden h-20">{promotion.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="promotion_arrows mt-4 flex">
        <button className="promotion_button mr-2" onClick={() => navigatePromotion('prev')}>
          Previous
        </button>
        <button className="promotion_button" onClick={() => navigatePromotion('next')}>
          Next
        </button>
      </div>
      <div className="room_button_container mt-4">
        <button className="room_button" onClick={goToRoomPage}>
              Click to save a room!
        </button>
      </div>
    </div>



<div id="around" className="py-8">
  <h2 className="text-2xl font-bold mb-4">What's around us</h2>
  <div className="places-carousel relative mx-auto">
    <button className="carousel-arrow previous absolute top-1/2 left-0 transform -translate-y-1/2" onClick={handlePreviousPlace}>
      &lt;
    </button>
    <div className="place-item flex items-center">
      <div className="place-image mr-4">
        <a href={placesData[currentPlaceIndex].website} target="_blank" rel="noopener noreferrer">
          <img
            src={placesData[currentPlaceIndex].image}
            alt={placesData[currentPlaceIndex].name}
            className="w-40 h-auto"
          />
        </a>
      </div>
      <div className="place-info">
        <h3 className="text-lg font-bold">{placesData[currentPlaceIndex].name}</h3>
        <p className="mt-2">{placesData[currentPlaceIndex].description}</p>
        <a href={placesData[currentPlaceIndex].website} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 inline-block">
          Visit this website
        </a>
      </div>
    </div>
    <button className="carousel-arrow next absolute top-1/2 right-0 transform -translate-y-1/2" onClick={handleNextPlace}>
      &gt;
    </button>
  </div>
      
  <div id="how-to-get" className="py-8">
  <h2 className="text-2xl font-bold mb-4">Map</h2>
  <div className="map_wrapper">
    <a href="https://goo.gl/maps/XmfbkpVFydZoXFVG8" target="_blank" rel="noopener noreferrer" className="map_link">
      <img src={require('./homepage_pictures/map_image.jpg')} alt="Map" className="map_image" />
      <span className="map_text">How to reach us</span>
    </a>
  </div>
</div>


    </div>
  </div>
  </div>
  </div>
</div>
  );
  
};

export default HomePage;
