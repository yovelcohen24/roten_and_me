// admin dashboard
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        const response = await axios.get((process.env.REACT_APP_API_URL || "http://localhost:4000")+ '/api/admin/check-session');
        console.log(response + "  string " + JSON.stringify(response));
        // If the session is valid and the user is authenticated as admin
        if (response.data.isAdminAuthenticated) {
          setIsAdmin(true);
        } else {
          // Redirect to login page or show an error message
          // await sleep(10000);
          window.location.href = '/admin/login';
        }
      } catch (error) {
        // Handle error
        // Redirect to login page or show an error message
        window.location.href = '/admin/login';
      }
    };

    checkAdminSession();
  }, []);

  return (
    <div>
      {isAdmin ? (
        <div>
          <h2>Admin Dashboard</h2>
          {/* Dashboard content goes here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;