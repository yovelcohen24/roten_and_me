import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ModifyRoomDetails from './components/ModifyRoomDetails';
import AddRoom from './components/AddRoom';
import AddPromotion from './components/AddPromotion';
import './Dashboard.css';
import RemovePromotion from './components/RemovePromotion';
import axios from 'axios';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [checkLogin, setCheckLogin] = useState(false);
  const history = useHistory();

  const handleLogout = useCallback(() => {
    // Clear the authentication status and other stored data from cookies
    // document.cookie = 'token=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; HttpOnly';
    localStorage.removeItem('token');
    // Redirect to the login page
    history.push('/admin/login');
  }, [history]);


  useEffect(() => {
    
    // const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '\$1');
    const token = localStorage.getItem('token');
    console.log("Sending token: " + token)

    if (token) {
      const sessionCheck = async () => {
        try {
          const res = await axios.post(
            (process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/api/admin/protected-route',
            { token }
          );

          if (res.status === 200) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.log("Error during authentication check:", error.message);
          if (axios.isAxiosError(error) && error.response.status === 401) {
            console.log('Token failed: Unauthorized');
          } else {
            console.log('Token failed: Unknown error');
          }
        }
      };

      sessionCheck();
    } else {
      handleLogout();
    }
    setCheckLogin(true);
  }, [handleLogout]);
  
  
  useEffect(() => {
    console.log('isAdmin:', isAdmin);
    console.log('checkLogin:', checkLogin);
  
    // Redirect to login page if the user is not an admin
    if (!isAdmin && checkLogin) {
      console.log('Redirecting to login page...');
      history.push('/admin/login');
    }
    // had to es-lint disable since the react framework is incapable of performing simple operations in a timely manner
    // first call always does nothing but by second call checkLogin is true BEFORE isAdmin set to true. (when checkLogin is in deps)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, history]);
  
  
  const handleRoomSelection = (roomId) => {
    setSelectedRoomId(roomId);
  };
  return isAdmin && (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(/${'keepdata.jpg'})` }}>
      <div className="container mx-auto px-4 bg-gray-100 min-h-screen bg-opacity-80">
        <div className="bg-transparent bg-opacity-10 absolute inset-0"></div>
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
          <div className="my-6">
            <RemovePromotion />
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default Dashboard;
