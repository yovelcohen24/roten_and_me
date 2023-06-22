import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ModifyRoomDetails from './components/ModifyRoomDetails';
import AddRoom from './components/AddRoom';
import AddPromotion from './components/AddPromotion';

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
    <div>
      {isAdmin ? (
        <div>
          <h2>Admin Dashboard</h2>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <ModifyRoomDetails onRoomSelect={handleRoomSelection} selectedRoomId={selectedRoomId} />
          </div>
          <div>
            <AddRoom />
          </div>
          <div>
            <AddPromotion />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
