import React, { useState } from 'react';
import axios from 'axios';
import '../assets/LoginPage.css';

const LoginPage = ({onLoginSuccess}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here, e.g., send data to a server

    try {
      const response = axios.post('http://localhost:8800/auth/login', {
        username,
        password
      });

      // Handle response based on status code
      if (response.status === 200) {
        // Successful sign-up logic
        console.log('Login successful');
        
      } else {
        // Handle sign-up error
        console.log('Login failed');
      }
    } catch (error) {
      // Handle axios error
      console.log('Error:', error);
    }

    onLoginSuccess();

    // Reset form fields
    setUsername('');
    setPassword('');
  };

  return (
    <div className='login-page'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username :</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
