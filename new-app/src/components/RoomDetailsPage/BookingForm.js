import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { getRangeOfDates } from './Helpers';
import 'tailwindcss/tailwind.css';

const BookingForm = ({ startDate, endDate, bookedDates, handleBookingSubmit, setStartDate, setEndDate, setName, name, numOfPeople, setNumOfPeople }) => {
  return (
    <div className="booking-form bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
      <h3 className="text-lg font-bold mb-4">Book this room</h3>
      <form onSubmit={handleBookingSubmit} className="flex flex-col items-center">
        <div className="mb-4">
          <label htmlFor="startDate" className="block mb-2 font-medium">Start Date:</label>
          <DatePicker

            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            endDate={endDate}
            minDate={moment()}
            required
            className="w-full bg-white border border-gray-300 rounded px-3 py-2"
            dateFormat="dd/MM/yyyy"
            excludeDates={bookedDates.map((booking) => getRangeOfDates(booking.startDate, booking.endDate)).flat()}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block mb-2 font-medium">End Date:</label>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            startDate={startDate}
            endDate={endDate}
            minDate={moment().add(1, 'days')}
            required
            className="w-full bg-white border border-gray-300 rounded px-3 py-2"
            dateFormat="dd/MM/yyyy"
            excludeDates={bookedDates.map((booking) => getRangeOfDates(booking.startDate, booking.endDate)).flat()}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full bg-white border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between mb-2 font-medium">
            <label htmlFor="numberOfPeople">People over 2 years old</label>
          </div>
          <div className="flex justify-center">
            <input
              id="numberOfPeople"
              type="number"
              value={numOfPeople}
              onChange={(event) => setNumOfPeople(event.target.value)}
              required
              className="w-fit bg-white border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Book</button>
      </form>
    </div>
  );
};

export default BookingForm;