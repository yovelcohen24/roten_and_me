// admin login page
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  const handleLogin = async () => {
    try {
        // todo: create endpoint etc
      const response = await axios.post('http://localhost:4000/api/admin/login', {
        username,
        password,
      });
      console.log(response);
      // Handle successful login, set authentication status, etc.
      // Redirect to admin dashboard
    //   await sleep(10000);
      window.location.href = '/admin/dashboard';
    } catch (error) {
      // Handle login error
      console.log(error);
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
