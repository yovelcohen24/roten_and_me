import placesData from './placesData';
import React, { useState, useEffect } from 'react';
import TestimonialItem from './TestimonialItem';
import testimonialsData from './testimonialsData';
import { Link } from 'react-scroll';
import axios from 'axios';

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
        const response = await axios.get('http://localhost:4000/api/promotions');
        setPromotionsData(response.data);
      } catch (error) {
        console.error('Failed to fetch room data', error);
      }
    };
    
    fetchRooms();
  }, []);

    const promotionsDataOLD = [
      {
        title: 'יש לכם ילדים קטנים?',
        description: ' ! ילד מתחת לגיל שנתיים בחינם',
      },
      {
        title: 'מבצע סופ"ש',
        description: 'זוג ב500 שקלים בלבד',
      },
      {
        title: 'מבצע  לאמצע שבוע',
        description: 'לילה רביעי רצוף בחינם !',
      },
      {
        title: 'מבצע בין הזמנים',
        description: '  (עד 30 אנשים)  השכרת כל המתחם ליום ב3500',
      },
    ];
  
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

    return (
<div className="container mx-auto text-center">
        <nav className="flex items-center justify-center py-4"> {/* Apply justify-center class */}
        <ul className="flex justify-center"> {/* Add justify-center class */}
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
        <div id="general" className="py-8 justify-center items-center">
          <h1 className="text-4xl font-bold">ברוכים הבאים לצימרים בר יוחאי</h1>
          <div className="max-w-screen-lg mx-auto h-0 pb-[30%] overflow-hidden relative flex items-center justify-center">
  <img src={bnbImages[currentImageIndex]} alt={`B&B ${currentImageIndex + 1}`} className="object-cover absolute inset-0 w-full h-full" />
</div>

          <div className="mt-8 ">
            <div className="flex">
              <div className="flex-1 p-2">
                <div className="font-bold">מיקום</div>
                <div className="mt-2">בר יוחאי היא יישוב קהילתי דתי בגליל העליון. הישוב מכיל מספר בתי כנסת ויש שם מקווה לגברים בסמוך לצימרים. הישוב ממוקם למרגלות הר מירון ומשקיף על נוף של הרי דלתון.</div>
              </div>
              <div className="flex-1 p-2">
                <div className="font-bold">תוכן הצימרים</div>
                <div className="mt-2">הצימרים מכילים מטבח מאובזר הכולל: כירה חשמלית, פלטה, מיחם, מצנם, מיקרוגל, כוסות חמות, כוסות קרות, קפה, תה, נס, סוכר, פותחן, קולפן, מלח, סוכרזית, קומקום. ישנה גם אופציה לתנור וגז באזור הגינה. ישנה מיטה זוגית איכותית, אמבטיית ג'קוזי מפנקת, סלון עם טלוויזיה, שולחן אוכל וכל מה שיכול להיות צריך בצימר.</div>
              </div>
              <div className="flex-1 p-2">
                <div className="font-bold">מה יש בגינה</div>
                <div className="mt-2">הגינה כוללת נדנדות, ערסלים, ספסלים, דשא סינטטי, פינת ישיבה יפה מעץ, ובלילה ניתן להנות מתאורה אקסטרנית ואפשרות לברביקיו וערב טוב עם חברים ומשפחה.</div>
          </div>
        </div>
      </div>
      <div id="opinions" className="py-8">
      <h2>המלצות מאורחים</h2>
      {testimonialsData.map((testimonial, index) => (
        <TestimonialItem key={index} testimonial={testimonial} />
      ))}
    </div>
    <div id="specials" className="py-8 justify-center items-center specials-container">
  <h2>המבצעים שלנו</h2>
  <div className="promotions_container mx-auto">
    {promotionsData.map((promotion, index) => (
      <div
        key={index}
        className={`promotion_item ${index === currentPromotionIndex ? 'active' : ''}`}
        style={{ transform: `translateX(${(index - currentPromotionIndex) * 100}%)` }}
      >
        <h3>{promotion.title}</h3>
        <p>{promotion.description}</p>
      </div>
    ))}
  </div>
  <div className="promotion_arrows">
    <button className="promotion_button" onClick={() => navigatePromotion('prev')}>Previous</button>
    <button className="promotion_button" onClick={() => navigatePromotion('next')}>Next</button>
  </div>
  <div className="room_button_container">
    <button className="room_button" onClick={goToRoomPage}>כנס למידע על החדרים עצמם ושריין חדר בהקדם</button>
  </div>
</div>

    <div id="around" className="py-8">
      <h2>מה יש בסביבה</h2>
      <div className="places-carousel mx-auto">
          <button className="carousel-arrow previous" onClick={handlePreviousPlace}>
            &lt;
          </button>
          <div className="place-item">
            <div className="place-image">
              <a href={placesData[currentPlaceIndex].website} target="_blank" rel="noopener noreferrer">
                <img
                  src={placesData[currentPlaceIndex].image}
                  alt={placesData[currentPlaceIndex].name}
                  style={{ width: '100%', height: 'auto' }}
                />
              </a>
            </div>
            <div className="place-info">
              <h3>{placesData[currentPlaceIndex].name}</h3>
              <p>{placesData[currentPlaceIndex].description}</p>
              <a href={placesData[currentPlaceIndex].website} target="_blank" rel="noopener noreferrer">
               בקר באתר
              </a>
            </div>
          </div>
          <button className="carousel-arrow next" onClick={handleNextPlace}>
            &gt;
          </button>
        </div>      
      <div id="how-to-get" className="py-8">
      <h2>מפת הגעה</h2>
        <a href="https://goo.gl/maps/XmfbkpVFydZoXFVG8" target="_blank" rel="noopener noreferrer" className="map_link">
          <img src={require('./homepage_pictures/map_image.jpg')} alt="Map" className="map_image" />
          <span className="map_text">איך להגיע אלינו</span>
        </a>
      </div>
    </div>
  </div>
  </div>
  );
  
};

export default HomePage;

{/* return (
    <div className="home_page_title">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="general" smooth={true} duration={500}>מידע כללי</Link>
          </li>
          <li>
            <Link to="opinions" smooth={true} duration={500}>חוות דעת</Link>
          </li>
          <li>
            <Link to="specials" smooth={true} duration={500}>מבצעים</Link>
          </li>
          <li>
            <Link to="around" smooth={true} duration={500}>מה יש בסביבה</Link>
          </li>
          <li>
            <Link to="how-to-get" smooth={true} duration={500}>מפת הגעה</Link>
          </li>
        </ul>
      </nav>
      <div id="general" className="section">
        <h1>ברוכים הבאים לצימרים בר יוחאי</h1>
          <div className="image_container">
            <img src={bnbImages[currentImageIndex]} alt={`B&B ${currentImageIndex + 1}`} />
          </div>
          <div className="info_table">
            <div className="table_row">
              <div className="table_cell">
                <div className="field">מיקום</div>
                <div className="content">בגליל העליון בישוב קהילתי דתי הנקרא בר יוחאי ,הישוב מכיל מספר בתי כנסת ויש מקווה לגברים בסמוך לצימרים, הישוב הוא למרגלות הר מירון ומשקיף לנוף של הרי דלתון</div>
              </div>
              <div className="table_cell">
                <div className="field">תוכן הצימרים</div>
                <div className="content">הצימרים כוללים מטבח מאובזר הכולל : כירה חשמלית, פלטה , מיחם, מצנם , מיקרוגל , כוסות חם , כוסות קר, קפה ,תה ,נס ,סוכר , פותחן, קולפן ,מלח ,סוכרזית ,קומקום , בנוסף יש אופצייה לתנור וגז באיזור הגינה, יש מיטה זוגית איכותית אמבטיית ג'קוזי מפנקת ,סלון טלויזיה , שולחן אוכל וכל מה שמעלים בדעתכם</div>
              </div>
              <div className="table_cell">
                <div className="field">מה יש בגינה</div>
                <div className="content">הגינה כוללת נדנדות ערסלים ספסלים דשא סינטטי פינת ישיבה יפה מעץ , בלילה יש תיאורה צבעונית יפהפיה הנאה מובטחת לילדים, כמו כן יש בריכה בגודל 18 מטר מרובע צנועה וסגורה</div>
              </div>
            </div>
          </div>
       </div>
     
    <div id="opinions" className="section"> 
     <h2>המלצות מאורחים</h2>
        {testimonialsData.map((testimonial, index) => (
          <TestimonialItem key={index} testimonial={testimonial} />
        ))}
    </div>
      
      <div id="specials" className="section">
        <h2>המבצעים שלנו</h2>
          <div className="promotions_container">
            {promotionsData.map((promotion, index) => (
            <div
            key={index}
            className={`promotion_item ${index === currentPromotionIndex ? 'active' : ''}`}
            style={{ transform: `translateX(${(index - currentPromotionIndex) * 100}%)` }}
        >
            <h3>{promotion.title}</h3>
            <p>{promotion.description}</p>
          </div>
          ))}
         </div>
        <div className="promotion_arrows">
         <button className="promotion_button" onClick={() => navigatePromotion('prev')}>Previous</button>
         <button className="promotion_button" onClick={() => navigatePromotion('next')}>Next</button>
       </div>

      <div className="room_button_container">
       <button className="room_button" onClick={goToRoomPage}>כנס למידע על החדרים עצמם ושריין חדר בהקדם</button>
      </div>
     </div>

      
      <div id="around" className="section">
        <h2>מה יש בסביבה</h2>
        <div className="places-carousel">
          <button className="carousel-arrow previous" onClick={handlePreviousPlace}>
            &lt;
          </button>
          <div className="place-item">
            <div className="place-image">
              <a href={placesData[currentPlaceIndex].website} target="_blank" rel="noopener noreferrer">
                <img
                  src={placesData[currentPlaceIndex].image}
                  alt={placesData[currentPlaceIndex].name}
                  style={{ width: '100%', height: 'auto' }}
                />
              </a>
            </div>
            <div className="place-info">
              <h3>{placesData[currentPlaceIndex].name}</h3>
              <p>{placesData[currentPlaceIndex].description}</p>
              <a href={placesData[currentPlaceIndex].website} target="_blank" rel="noopener noreferrer">
               בקר באתר
              </a>
            </div>
          </div>
          <button className="carousel-arrow next" onClick={handleNextPlace}>
            &gt;
          </button>
        </div>
      </div>
      
      <div id="how-to-get" className="section">
        <h2>מפת הגעה</h2>
        <a href="https://goo.gl/maps/XmfbkpVFydZoXFVG8" target="_blank" rel="noopener noreferrer" className="map_link">
          <img src={require('./homepage_pictures/map_image.jpg')} alt="Map" className="map_image" />
          <span className="map_text">איך להגיע אלינו</span>
        </a>
      </div>
    </div>
  ); */}