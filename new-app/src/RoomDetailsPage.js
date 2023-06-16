import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

/*
This is an example of
*/

const RoomDetailsPage = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState('');
  const [bookedDates, setBookedDates] = useState([]);

  function checkOverlapBtwnTwoDateRanges(date1Start, date1End, date2Start, date2End) {
    // This function receives two ranges of dates, checks if either range is within the other.
    return (date2Start.getTime() <= date1Start.getTime() && date1Start.getTime() <= date2End.getTime()) ||
      (date2Start.getTime() <= date1End.getTime() && date1End.getTime() <= date2End.getTime()) ||
      (date1Start.getTime() <= date2Start.getTime() && date2Start.getTime() <= date1Start.getTime()) ||
      (date1Start.getTime() <= date2End.getTime() && date2End.getTime() <= date1End.getTime());
  }

  const getRangeOfDates = (startDate, endDate) => {
    // Arguments: startDate, endDate.
    // Returns: A list of dates in the range.
    const dates = [];
    const currentDate = moment(startDate);
    const lastDate = moment(endDate);

    while (currentDate <= lastDate) {
      dates.push(new Date(currentDate));
      currentDate.add(1, 'day');
    }

    return dates;
  };

  useEffect(() => {
    const fetchRoomDetails = async () => {
      // This function calls an API request to fetch a room, sets the room using the state variable.
      try {
        const response = await axios.get(`http://localhost:4000/api/rooms/${roomId}`);
        setRoom(response.data);
      } catch (error) {
        console.error('Failed to fetch room details', error);
      }
    };

    const fetchBookedDates = async () => {
      // Input: None, de-facto this function uses the roomId variable (originates in another component).
      // This function calls an API request to fetch all booking date ranges for the given room, 
      // sets the room using the state variable.
      try {
        const response = await axios.get(`http://localhost:4000/api/rooms/${roomId}/excludeDates`);
        setBookedDates(response.data);
      } catch (error) {
        console.error('Failed to fetch booked dates', error);
      }
    };
    fetchRoomDetails();
    fetchBookedDates();
  }, [roomId]);

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    // Calculate number of days between start and end dates
    const numberOfDays = moment(endDate).diff(moment(startDate), 'days');

    // Calculate total cost
    const totalCost = numberOfDays * room.costPerDay;

    //////////////////////////////////////////////////////////////////////////
    // Very important for the future: 
    // This region of the code should be removed.
    // Handling overlapping bookings is currently done via the DatePicker "object".
    //////////////////////////////////////////////////////////////////////////

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
       checkOverlapBtwnTwoDateRanges(selectedStartDate, selectedEndDate, bookingStartDate, bookingEndDate)
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

    //////////////////////////////////////////////////////////////////////////
    // End of code-area-to-be-removed
    //////////////////////////////////////////////////////////////////////////


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
  // currently CSS is injected to forbid choosing invalid dates.
  const datePickerStyles = `
    .react-datepicker__day--disabled {
      color: red;
      cursor: not-allowed;
    }
  `;
  return (
    <div className="room-details-page" style={{ display: 'flex', justifyContent: 'center' }}>
       <style>{datePickerStyles}</style>
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
            <button type="submit">Book</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
