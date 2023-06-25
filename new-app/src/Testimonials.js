import React from 'react';
import TestimonialItem from './TestimonialItem';

const Testimonials = ({ testimonials }) => {
  return (
<div className="testimonials-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {testimonials.map((testimonial, index) => (
    <TestimonialItem key={index} testimonial={testimonial} />
  ))}
</div>

  );
};

export default Testimonials;
