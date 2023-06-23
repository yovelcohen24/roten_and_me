import React from 'react';

const TestimonialItem = ({ testimonial }) => {
  return (
    <div className="testimonial">
      <p>{testimonial.content}</p>
      <p className="testimonial-details">
        <span>{testimonial.name}</span> - {testimonial.date}
      </p>
    </div>
  );
};

export default TestimonialItem;
