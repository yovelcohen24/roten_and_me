import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="about_us_page bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen flex flex-col justify-center items-center">
      <div className="about_us_card bg-white bg-opacity-75 rounded-lg p-6 mb-4 flex flex-col md:flex-row md:items-start">
        <div className="family_photo flex flex-col items-center mb-4 md:w-1/2 md:pr-8">
          <img src={require('./aboutAs_pic/family.jpg')} alt="Family" className="photo_image rounded-full w-96 h-64 object-cover" />
          <div className="photo_caption text-black mt-2">Uzi, Osnat, Yovel, Zurel and Neta</div> 
        </div>
        <div className="about_us_description mb-4 md:w-1/2">
          <h1 className="text-4xl text-black mb-4 text-left">About Us</h1>
          <p className="text-black text-lg text-start mb-2">
            We are a warm and loving family living in the Bar Yochai settlement. We were the first in the settlement to establish cabins, and we have been in the business for almost 20 years. Our goal is to delight our customers and provide the best service possible.
          </p>
          <p className="text-black text-lg text-start mb-4">
            Our parents are involved in education and are committed to empowering the people of Israel through instilling values for future generations. They established a home in the Bar Yochai settlement close to Lebanon out of a desire to contribute to the development of the land. We invite you to come and enjoy the beauty of the north.
          </p>
        </div>
      </div>
      <div className="contact_info">
        <h3 className="text-2xl text-black mb-2">Contact Us</h3>
        <p className="text-black text-lg">Uzi Cohen: 0507768123</p>
        <p className="text-black text-lg">Osnat Cohen: 0507768135</p>
      </div>
    </div>
  );
};

export default AboutUsPage;
