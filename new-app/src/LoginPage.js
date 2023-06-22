// admin login page
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/admin/login', {
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
    <div>
      <h2>Admin Login</h2>
      {error && <p>{error}</p>}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
