import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ModifyRoomDetails from './components/ModifyRoomDetails';
import AddRoom from './components/AddRoom';
import AddPromotion from './components/AddPromotion';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const history = useHistory();

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
      history.push('/admin/login');
    }
  }, [history]);

  const handleRoomSelection = (roomId) => {
    setSelectedRoomId(roomId);
  };

  return (
    <div>
      {isAdmin ? (
        <div>
          <h2>Admin Dashboard</h2>
          <div>
            <ModifyRoomDetails onRoomSelect={handleRoomSelection} selectedRoomId={selectedRoomId}/>
          </div>
          <div>
            <AddRoom/>
          </div>
          <div>
            <AddPromotion/>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
