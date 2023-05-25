import React, { useState } from 'react';
import '../assets/App.css';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {

    setLoggedIn(true);


  }

  const handleLogout = () => {
      
      setLoggedIn(false);
  }



  return (
   
    <div className="App">
    <h1>Contact List App</h1>
    {!loggedIn ? (
      <div className="form-container">
        <div className="form-column">
          <SignUpPage />
        </div>
        <div className="form-column">
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    ) : (
      <ProfilePage onLogout={handleLogout} />
    )}
  </div>



  );
}

export default App;
