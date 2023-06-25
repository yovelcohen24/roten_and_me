import React from 'react';

const TestimonialItem = ({ testimonial }) => {
  return (
    
<div className="testimonial">
  <p className="text-sm md:text-base">{testimonial.content}</p>
  <p className="testimonial-details">
    <span className="text-sm md:text-base">{testimonial.name}</span> -{" "}
    <span className="text-sm md:text-base">{testimonial.date}</span>
  </p>
</div>

  );
};

export default TestimonialItem;
