import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { checkOverlapBtwnTwoDateRanges } from './components/RoomDetailsPage/Helpers';
import RoomDetails from './components/RoomDetailsPage/RoomDetails';
import BookingForm from './components/RoomDetailsPage/BookingForm';
import { useHistory } from 'react-router-dom';

import './Dashboard.css';
import Popup from './components/PopUp';

const RoomDetailsPage = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState('');
  const [numOfPeople, setNumOfPeople] = useState(1);

  const [bookedDates, setBookedDates] = useState([]);
  const history = useHistory();
  
  // for popup:
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isGoodResponse, setIsGoodResponse] = useState(false);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      // This function calls an API request to fetch a room, sets the room using the state variable.
      try {
        const response = await axios.get((process.env.REACT_APP_API_URL || "http://localhost:4000") + `/api/rooms/${roomId}`);
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
        const response = await axios.get((process.env.REACT_APP_API_URL || "http://localhost:4000") + `/api/rooms/${roomId}/excludeDates`);
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
    // * For now decided to keep it, an extra check could be useful if user inspects element away the forbidden datepicker element.


    console.log("Calling bookings api for checking for overlap!")
    // Check if room is available for selected dates
    const bookingsResponse = await axios.get((process.env.REACT_APP_API_URL || "http://localhost:4000") + `/api/bookings/${room.name}`);
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
        booking.name === room.name && 
        checkOverlapBtwnTwoDateRanges(selectedStartDate, selectedEndDate, bookingStartDate, bookingEndDate)
      );


    });
    overlappingBookings.map(b => console.log(b));
    console.log("Wanted start date: " + startDate +  " Wanted end date: " + endDate);
    if (overlappingBookings.length > 0) {
      setPopupMessage('The room is not available for the selected dates.');
      setShowPopup(true);
      return;
    }
    else{
      console.log("CALL TO bookings done (success)! response: " + JSON.stringify(bookingsResponse))

    }
    console.log("Calling booking(!) api to create new booking!")
    const todayDate = (new Date());
    todayDate.setHours(0,0,0,0);
    console.log("start date: " + startDate + " curernt dlate: " + todayDate);

    if(!(startDate.getTime() >= todayDate.getTime())){
      setPopupMessage('Please choose a future date!');
      setShowPopup(true);
      return;
    }
    if(startDate.getTime() > endDate.getTime()){
      setPopupMessage('End date must be after start date!');
      setShowPopup(true);
      return;
    }
    //////////////////////////////////////////////////////////////////////////
    // End of code-area-to-be-removed
    //////////////////////////////////////////////////////////////////////////


    // Submit booking
    try {
      const bookingResponse = await axios.post((process.env.REACT_APP_API_URL || "http://localhost:4000")+ '/api/bookings', {
        roomName: room.name,
        startDate: startDate,
        endDate: endDate,
        rentedBy: name,
        roomId: roomId,
        totalCost: totalCost,
      });
      // alert(`Booking submitted successfully! Total cost: ${totalCost}. Please contact us by phone.`);
      setPopupMessage(`Booking submitted successfully! Total cost: ${(numOfPeople<=2 ? totalCost : (totalCost + 100 * (numOfPeople-2)))}.
       Please contact us by phone.`);
      setShowPopup(true);
      setIsGoodResponse(true);
      console.log("Booking created, response: " + JSON.stringify( bookingResponse ));
    } catch (error) {
      console.error('Failed to submit booking', error);
      setPopupMessage('Failed to submit booking! Please contact us!');
      setShowPopup(true);
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
    <div className="room-details-page flex justify-center">
      <style>{datePickerStyles}</style>
      <div className="w-full sm:w-1/2 lg:min-w-400px bg-white rounded-lg shadow-lg p-6 bg-opacity-80">
        <RoomDetails room={room} />
        <BookingForm
          startDate={startDate}
          endDate={endDate}
          bookedDates={bookedDates}
          handleBookingSubmit={handleBookingSubmit}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setName={setName}
          name={name}
          numOfPeople={numOfPeople}
          setNumOfPeople={setNumOfPeople}
        />
              {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => {setShowPopup(false);const tmp=isGoodResponse; setIsGoodResponse(false); if(tmp){      history.goBack();} else{
            setStartDate('');
            setEndDate('');
          };
          }}
          isGoodResponse={isGoodResponse}
        />
      )}
      </div>
    </div>
  );
  
};

export default RoomDetailsPage;


// old room details:
/*

<h2>{room.name}</h2>
        <p>{room.description}</p>
        <p>Type: {room.type}</p>
        <p>Price: {room.costPerDay}</p>
        {room.images.map((photo, index) => (
          <img key={index} src={`${process.env.PUBLIC_URL}/${photo}`} alt={`Room ${room.name}, pic[${index}]`} 
          style={{height:490, width:800}}/>
        ))}


        */