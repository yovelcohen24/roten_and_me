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
      console.log('Logging in...'); // Check if the login function is being called

      const response = await axios.post(
        (process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/api/admin/login',
        {
          username,
          password,
        }
      );

      console.log('Login response:', response); // Check the response received from the API

      // Handle successful login, set authentication status, etc.
      // Store the JWT token in an HTTP-only cookie
      // document.cookie = `token=${response.data.token}; Expires=${new Date(Date.now() + 86400000).toUTCString()}; Secure; HttpOnly`;
      localStorage.setItem('token', response.data.token);
      // Redirect to admin dashboard
      console.log('Redirecting to admin dashboard...'); // Check if the redirect is being triggered
      history.push('/admin/dashboard');
    } catch (error) {
      // Handle login error
      console.error('Login error:', error); // Check if there are any error messages in the console
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
