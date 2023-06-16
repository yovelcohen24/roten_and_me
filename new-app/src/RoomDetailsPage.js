import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
const RoomDetailsPage = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState('');

  function clampTwoSetsOfTwoDates(date1Start, date1End, date2Start, date2End) {
    return (date2Start.getTime() <= date1Start.getTime() && date1Start.getTime() <= date2End.getTime()) ||
      (date2Start.getTime() <= date1End.getTime() && date1End.getTime() <= date2End.getTime()) ||
      (date1Start.getTime() <= date2Start.getTime() && date2Start.getTime() <= date1Start.getTime()) ||
      (date1Start.getTime() <= date2End.getTime() && date2End.getTime() <= date1End.getTime());
  }

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/rooms/${roomId}`);
        setRoom(response.data);
      } catch (error) {
        console.error('Failed to fetch room details', error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    // Calculate number of days between start and end dates
    const numberOfDays = moment(endDate).diff(moment(startDate), 'days');

    // Calculate total cost
    const totalCost = numberOfDays * room.costPerDay;
    console.log("Calling bookings api for checking for overlap!")
    // Check if room is available for selected dates
    const bookingsResponse = await axios.get(`http://localhost:4000/api/bookings/${room.name}`);
        let bookings = bookingsResponse.data;
    const overlappingBookings = bookings.filter(booking => {
      console.log("Booking", booking)

      const bookingStartDate = new Date(booking.startDate);
      const bookingEndDate = new Date(booking.endDate);
      const selectedStartDate = new Date(startDate);
      const selectedEndDate = new Date(endDate);

      console.log(`Booking: ${booking}, dates: ${bookingStartDate} -> ${bookingEndDate}, selected: ${selectedStartDate} -> ${selectedEndDate}`);
      console.log('condition state: ' + (booking.name === room.name && !(bookingEndDate > selectedStartDate || bookingStartDate < selectedEndDate)));
      return (
        booking.name === room.name && // bookingenddate > selectedstartdate OR bookingstartdate < selectedenddate
        //!(bookingEndDate > selectedStartDate || bookingStartDate < selectedEndDate)
        // chat bug piss tea is obviously incapable of devising  condition.
       // attmpet 100:
       clampTwoSetsOfTwoDates(selectedStartDate, selectedEndDate, bookingStartDate, bookingEndDate)
      );


    });
    overlappingBookings.map(b => console.log(b));
    console.log("Wanted start date: " + startDate +  " Wanted end date: " + endDate);
    if (overlappingBookings.length > 0) {
      alert('The room is not available for the selected dates.');
      return;
    }
    else{
      console.log("CALL TO bookings done (success)! response: " + JSON.stringify(bookingsResponse))

    }
    console.log("Calling booking(!) api to create new booking!")
    // Submit booking
    try {
      const bookingResponse = await axios.post('http://localhost:4000/api/bookings', {
        name: room.name,
        startDate: startDate,
        endDate: endDate,
        rentedBy: name,
        roomId: roomId,
      });
      alert('Booking submitted successfully!');
      console.log("Booking created, response: " + JSON.stringify( bookingResponse ));
    } catch (error) {
      console.error('Failed to submit booking', error);
      alert('Failed to submit booking');
    }
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="room-details-page" style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%', minWidth: '400px' }}>
        <h2>{room.name}</h2>
        <p>{room.description}</p>
        <p>Type: {room.type}</p>
        <p>Price: {room.costPerDay}</p>
        {room.images.map((photo, index) => (
          <img key={index} src={`${process.env.PUBLIC_URL}/roompage_pictures/${photo}`} alt={`Room ${room.name}, ${index + 1} view`} />
        ))}
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
            <button type="submit">Book</button>
          </form>
        </div>
      </div>
    </div>
  );
  /*
  return (
    <div className="room-details-page">
      <h2>{room.name}</h2>
      <p>{room.description}</p>
      <p>Type: {room.type}</p>
      <p>Price: {room.costPerDay}</p>
      {room.images.map((photo, index) => (
        <img key={index} src={`${process.env.PUBLIC_URL}/roompage_pictures/${photo}`} alt={`Room ${room.name}, ${index + 1} view`} />
      ))}
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
          <button type="submit">Book</button>
        </form>
      </div>
    </div>
  );*/


};

export default RoomDetailsPage;
