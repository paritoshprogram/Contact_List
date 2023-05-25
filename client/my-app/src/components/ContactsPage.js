/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/ContactsPage.css';
const jwt = require('jsonwebtoken');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

  

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {

        const token = localStorage.getItem('token');
       decodedToken =  jwt.verify(token, 'secretkey')

       usern = decodedToken.username;


      const response = await axios.get('http://localhost:8800/auth/profile/:id/contacts',{
        params:{
           id: usern
        }
      }); // Replace with your endpoint URL

      if (response.status === 200) {
        setContacts(response.data);
      } else {
        console.log('Failed to fetch contacts');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="contacts-page">
      <h2>Contacts</h2>
      {contacts.map((contact) => (
        <div key={contact.contact_id} className="contact-item">
          <p>Name: {contact.contact_name}</p>
          <p>Email: {contact.email}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactsPage; */
