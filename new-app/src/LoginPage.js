// LoginPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post((process.env.REACT_APP_API_URL || "http://localhost:4000")+ '/api/admin/login', {
        username,
        password,
      });

      // Handle successful login, set authentication status, etc.
      // Store the authentication status in localStorage
      localStorage.setItem('isAdminAuthenticated', 'true');

      // Store the current date and time
      const currentDate = new Date().toISOString();
      localStorage.setItem('loginDateTime', currentDate);

      // Store the user's IP address
      const userIP = response.data.ip; // Assuming the server returns the IP in the response
      localStorage.setItem('userIP', userIP);

      // Redirect to admin dashboard
      history.push('/admin/dashboard');
    } catch (error) {
      // Handle login error
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Admin Login</h2>
      {error && <p className="login-error">{error}</p>}
      <div className="form-group">
        <label htmlFor="username" className="form-label">
          Username:
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
      </div>
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
};

export default LoginPage;
