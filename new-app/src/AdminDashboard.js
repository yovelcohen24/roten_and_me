import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ModifyRoomDetails from './components/ModifyRoomDetails';
import AddRoom from './components/AddRoom';
import AddPromotion from './components/AddPromotion';
import './Dashboard.css';
const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const history = useHistory();

  const handleLogout = useCallback(() => {
    // Clear the authentication status and other stored data from local storage
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('loginDateTime');
    localStorage.removeItem('userIP');

    // Redirect to the login page
    history.push('/admin/login');
  }, [history]);

  useEffect(() => {
    // Check the authentication status from local storage
    const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated');
    setIsAdmin(isAdminAuthenticated === 'true');

    // Retrieve stored date
    const storedDate = localStorage.getItem('loginDateTime');

    // Check if the stored date is within 7 days of the current date
    const currentDate = new Date();
    const storedDateTime = new Date(storedDate);
    const sevenDaysLater = new Date(storedDateTime);
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
    const isWithin7Days = currentDate <= sevenDaysLater;

    // Redirect to login if the stored date is not within 7 days
    if (!isWithin7Days) {
      handleLogout(); // Redirect to login
    }
  }, [handleLogout]);

  const handleRoomSelection = (roomId) => {
    setSelectedRoomId(roomId);
  };
  return (
    <div  className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(/${'keepdata.jpg'})` }}>
    <div className="container mx-auto px-4 bg-gray-100 min-h-screen bg-opacity-80">
      <div className="bg-transparent bg-opacity-10 absolute inset-0"></div>
      {isAdmin ? (
        <div className="relative text-center py-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Admin Dashboard</h2>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
          <div className="my-6">
            <ModifyRoomDetails onRoomSelect={handleRoomSelection} selectedRoomId={selectedRoomId} />
          </div>
          <div className="my-6">
            <AddRoom />
          </div>
          <div className="my-6">
            <AddPromotion />
          </div>
        </div>
      ) : (
        <p className="text-2xl text-gray-600">Loading...</p>
      )}
    </div>
    </div>
  );
  
};

export default Dashboard;
