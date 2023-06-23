import React from 'react';
import TestimonialItem from './TestimonialItem';

const Testimonials = ({ testimonials }) => {
  return (
    <div className="testimonials-section">
      {testimonials.map((testimonial, index) => (
        <TestimonialItem key={index} testimonial={testimonial} />
      ))}
    </div>
  );
};

export default Testimonials;
