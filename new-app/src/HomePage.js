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
      <div className="container mx-auto text-center">
        
      <nav className="flex items-center justify-center py-4">
        <ul className="flex justify-center">
          <li className="mx-2">
            <Link to="general" smooth={true} duration={500}>מידע כללי</Link>
          </li>
          <li className="mx-2">
            <Link to="opinions" smooth={true} duration={500}>חוות דעת</Link>
          </li>
          <li className="mx-2">
            <Link to="specials" smooth={true} duration={500}>מבצעים</Link>
          </li>
          <li className="mx-2">
            <Link to="around" smooth={true} duration={500}>מה יש בסביבה</Link>
          </li>
          <li className="mx-2">
            <Link to="how-to-get" smooth={true} duration={500}>מפת הגעה</Link>
          </li>
        </ul>
      </nav>

      
      <div id="general" className="py-8">
        <h1 className="text-4xl font-bold">ברוכים הבאים לצימרים בר יוחאי</h1>
        <div className="max-w-screen-lg mx-auto h-0 pb-[30%] overflow-hidden relative flex items-center justify-center">
          <img src={bnbImages[currentImageIndex]} alt={`B&B ${currentImageIndex + 1}`} className="object-cover absolute inset-0 w-full h-full" />
        </div>
          <div className="mt-8 ">
            <div className="flex">
            <div className="p-2">
    <div className="font-bold text-lg">מיקום</div>
    <div className="mt-2">בר יוחאי היא יישוב קהילתי דתי בגליל העליון. הישוב מכיל מספר בתי כנסת ויש שם מקווה לגברים בסמוך לצימרים. הישוב ממוקם למרגלות הר מירון ומשקיף על נוף של הרי דלתון.</div>
  </div>
  <div className="p-2">
    <div className="font-bold text-lg">תוכן הצימרים</div>
    <div className="mt-2">הצימרים מכילים מטבח מאובזר הכולל: כירה חשמלית, פלטה, מיחם, מצנם, מיקרוגל, כוסות חמות, כוסות קרות, קפה, תה, נס, סוכר, פותחן, קולפן, מלח, סוכרזית, קומקום. ישנה גם אופציה לתנור וגז באזור הגינה. ישנה מיטה זוגית איכותית, אמבטיית ג'קוזי מפנקת, סלון עם טלוויזיה, שולחן אוכל וכל מה שיכול להיות צריך בצימר.</div>
  </div>
  <div className="p-2">
    <div className="font-bold text-lg">מה יש בגינה</div>
    <div className="mt-2">הגינה כוללת נדנדות, ערסלים, ספסלים, דשא סינטטי, פינת ישיבה יפה מעץ, ובלילה ניתן להנות מתאורה אקסטרנית ואפשרות לברביקיו וערב טוב עם חברים ומשפחה.</div>
  </div>
        </div>
      </div>
      <div id="opinions" className="py-8">
  <h2 className="text-2xl font-bold mb-4">המלצות מאורחים</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {testimonialsData.map((testimonial, index) => (
      <TestimonialItem key={index} testimonial={testimonial} />
    ))}
  </div>
</div>

<div id="specials" className="py-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">המבצעים שלנו</h2>
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
          כנס למידע על החדרים עצמם ושריין חדר בהקדם
        </button>
      </div>
    </div>



<div id="around" className="py-8">
  <h2 className="text-2xl font-bold mb-4">מה יש בסביבה</h2>
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
          בקר באתר
        </a>
      </div>
    </div>
    <button className="carousel-arrow next absolute top-1/2 right-0 transform -translate-y-1/2" onClick={handleNextPlace}>
      &gt;
    </button>
  </div>
      
  <div id="how-to-get" className="py-8">
  <h2 className="text-2xl font-bold mb-4">מפת הגעה</h2>
  <div className="map_wrapper">
    <a href="https://goo.gl/maps/XmfbkpVFydZoXFVG8" target="_blank" rel="noopener noreferrer" className="map_link">
      <img src={require('./homepage_pictures/map_image.jpg')} alt="Map" className="map_image" />
      <span className="map_text">איך להגיע אלינו</span>
    </a>
  </div>
</div>


    </div>
  </div>
  </div>
</div>
  );
  
};

export default HomePage;
