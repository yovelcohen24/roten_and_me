import React from 'react';
import './AboutUs.css';

const AboutUsPage = () => {
  return (
    <div className="about_us_page">
      <h1>About Us</h1>
      <p>
        אנחנו משפחה חמה ואוהבת המתגוררת בישוב בר יוחאי, אנחנו היינו הראשונים בישוב שהקימו צימרים, אנחנו בעסק כבר קרוב ל20 שנה, המטרה שלנו היא לשמח את הלקוחות ולתת את השירות הטוב ביותר
      </p>
      <p>.ההורים שניהם עוסקים בחינוך ושוקדים על העצמת עם ישראל על ידי לימוד ערכים לדורות הבאים, הקימו בית בישוב בר היוחאי הקרוב ללבנון מתוך רצון לתרום ביישוב הארץ, ומזמינים אתכם לבוא להנות מהיופי של הצפון</p>
      <div className="family_photo">
        <img src={require('./aboutAs_pic/family.jpg')} alt="Family" className="photo_image" />
        <div className="photo_caption">עוזי אסנת יובל צוראל ונטע</div>
      </div>

      <div className="contact_info">
        <h3>פרטים ליצירת קשר</h3>
        <p>עוזי כהן: 0507768123</p>
        <p>אסנת כהן: 0507768135</p>
      </div>
    </div>
  );
};

export default AboutUsPage;
