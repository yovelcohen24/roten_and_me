import React from 'react';

const Review = ({ review }) => {
  return (
    <div className="review">
      <p>{review.feedback}</p>
      <div className="rating">
        {/* Display the rating */}
        {Array.from({ length: review.rating }).map((_, index) => (
          <span key={index} className="star">&#9733;</span>
        ))}
      </div>
    </div>
  );
};

export default Review;
