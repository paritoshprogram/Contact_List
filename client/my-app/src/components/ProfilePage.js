import React from 'react';
import axios from 'axios';
import '../assets/ProfilePage.css';
import ContactsPage from './ContactsPage';

const ProfilePage = ({ onLogout }) => {
  const handleLogout = () => {
    // Perform logout logic

    try{
    const response = axios.post('http://localhost:8800/auth/logout');

    if(response.status === 200){
        console.log('Logout successful');
    }
    else{
        console.log('Logout failed');
    }
    }
    catch(error){
        console.log('Error:', error);
    }

    onLogout();
  };

  return (
    <div className='profile-page'>
      <h2>Welcome to your Profile Page</h2>
      <p>User information and other profile details can go here.</p>
      <button onClick={handleLogout}>Logout</button>
    
    </div>
  );
};

export default ProfilePage;
