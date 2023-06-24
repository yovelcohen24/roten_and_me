import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="about_us_page bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen flex flex-col justify-center items-center">
      <div className="about_us_card bg-white bg-opacity-75 rounded-lg p-6 mb-4 flex flex-col md:flex-row md:items-start">
      <div className="family_photo flex flex-col items-center mb-4 md:w-1/2 md:pr-8">
  <img src={require('./aboutAs_pic/family.jpg')} alt="Family" className="photo_image rounded-full w-96 h-64 object-cover" />
  <div className="photo_caption text-black mt-2">עוזי, אסנת, יובל, צוראל ונטע</div>
</div>
        <div className="about_us_description mb-4 md:w-1/2">
          <h1 className="text-4xl text-black mb-4 text-right">קצת עלינו</h1>
          <p className="text-black text-lg text-start mb-2" style={{ direction: 'rtl' }}>
            אנחנו משפחה חמה ואוהבת המתגוררת בישוב בר יוחאי. אנחנו היינו הראשונים בישוב שהקימו צימרים ואנחנו בעסק כבר קרוב ל-20 שנה. מטרתנו היא לשמח את הלקוחות ולתת את השירות הטוב ביותר.
          </p>
          <p className="text-black text-lg text-start mb-4" style={{ direction: 'rtl' }}>
            ההורים שלנו עוסקים בחינוך ומתעסקים בהעצמת עם ישראל על ידי לימוד ערכים לדורות הבאים. הם הקימו בית בישוב בר יוחאי הקרוב ללבנון מתוך רצון לתרום ביישוב הארץ. אנחנו מזמינים אתכם לבוא ולהנות מהיופי של הצפון.
          </p>
        </div>
      </div>
      <div className="contact_info text-right">
        <h3 className="text-2xl text-black mb-2">פרטים ליצירת קשר</h3>
        <p className="text-black text-lg" style={{ direction: 'rtl' }}>עוזי כהן: 0507768123</p>
        <p className="text-black text-lg" style={{ direction: 'rtl' }}>אסנת כהן: 0507768135</p>
      </div>
    </div>
  );
};

export default AboutUsPage;


// import './AboutUs.css';
