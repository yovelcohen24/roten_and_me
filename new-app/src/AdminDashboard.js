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
      <div className="dashboard-container">
        {isAdmin ? (
          <div>
            <h2 className="dashboard-heading">Admin Dashboard</h2>
            <div className="mb-4"> {/* Move the logout button to a separate div */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
          </div>
            <div className="section">
              <h3 className="section-heading">Modify Room Details</h3>
              <ModifyRoomDetails onRoomSelect={handleRoomSelection} selectedRoomId={selectedRoomId} />
            </div>
            <div className="section">
              <h3 className="section-heading">Add New Room</h3>
              <AddRoom />
            </div>
            <div className="section">
              <h3 className="section-heading">Add Promotion</h3>
              <AddPromotion />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
  );
  

  return (
    <div className="flex justify-center items-center h-screen">
      {isAdmin ? (
        <div className="text-center flex flex-col"> {/* Add flex and flex-col classes */}
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
          <div className="mb-4"> {/* Move the logout button to a separate div */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
          </div>
          <div className="mt-4">
            <ModifyRoomDetails onRoomSelect={handleRoomSelection} selectedRoomId={selectedRoomId} />
          </div>
          <div className="mt-4">
            <AddRoom />
          </div>
          <div className="mt-4">
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
