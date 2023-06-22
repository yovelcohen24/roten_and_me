import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { getRangeOfDates } from './Helpers';

const BookingForm = ({ startDate, endDate, bookedDates, handleBookingSubmit, setStartDate, setEndDate, setName, name , numOfPeople, setNumOfPeople}) => {
  return (
<div className="booking-form">
          <h3>Book this room</h3>
          <form onSubmit={handleBookingSubmit}>
            <label htmlFor="startDate">Start Date:</label>
            <DatePicker
     id="startDate"
     selected={startDate}
     onChange={(date) => setStartDate(date)}
     startDate={startDate}
     endDate={endDate}
     minDate={moment()}
     required
     dateFormat="dd/MM/yyyy"
     excludeDates={bookedDates.map((booking) => getRangeOfDates(booking.startDate, booking.endDate)).flat()}
   />
            <br />
            <label htmlFor="endDate">End Date:</label>
            <DatePicker
     id="endDate"
     selected={endDate}
     onChange={(date) => setEndDate(date)}
     startDate={startDate}
     endDate={endDate}
     minDate={moment().add(1, 'days')}
     required
     dateFormat="dd/MM/yyyy"
     excludeDates={bookedDates.map((booking) => getRangeOfDates(booking.startDate, booking.endDate)).flat()}
   />
            <br />
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <br />
            <br />
            <label htmlFor="Number of people: ">Number of people (over 2 year old): </label>
            <input
              id="numberOfPeople"
              type="text"
              value={numOfPeople}
              onChange={(event) => setNumOfPeople(event.target.value)}
              required
            />
            <br />
            <button type="submit">Book</button>
          </form>
        </div>
  );
};

export default BookingForm;