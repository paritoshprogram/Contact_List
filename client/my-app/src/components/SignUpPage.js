import React, { useState } from 'react';
import axios from 'axios';

import '../assets/SignUpPage.css';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Perform sign-up logic here, e.g., send data to a server

    try {
      const response = axios.post('http://localhost:8800/auth/register', {
        username,
        password,
        name,
      });

      // Handle response based on status code
      if (response.status === 200) {
        // Successful sign-up logic
        console.log('Sign-up successful');
      } else {
        // Handle sign-up error
        console.log('Sign-up failed');
      }
    } catch (error) {
      // Handle axios error
      console.log('Error:', error);
    }

    // Reset form fields
    setUsername('');
    setName('');
    setPassword('');
  };

  return (
    <div className='signup-page'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Name :</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
