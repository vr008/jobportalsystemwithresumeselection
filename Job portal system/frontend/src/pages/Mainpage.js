import React, { useState, useEffect, useHistory } from 'react';
import imag from './img/carousel-2.jpg';
import img1 from './img/about-1.jpg';
import img2 from './img/about-2.jpg';
import img3 from './img/about-3.jpg';
import img4 from './img/about-4.jpg';
import { Link } from "react-router-dom";
import axios from "axios";
const Mainpage = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          
          if (!token) {
            throw new Error('No token found');
          }
          
          const response = await fetch('http://localhost:4000/auth/dashboard', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
    
          if (response.ok) {
            localStorage.setItem('token', token);
            const userData = await response.json();
            setUser(userData);
          } else {
            const { message } = await response.json();
            console.log(message);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchProfile();
    }, []);
    
  
    const handleLogout = () => {
      // Clear the token from local storage
      localStorage.removeItem('token');
  
      // Redirect the user to the login page
      window.location.href = '/login';
    };
    if (!user) {
      return <div>Loading...</div>;
    }
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {user.username}!</p>
      <p>Email: {user.email}</p>
      <input type="text" placeholder="Username" value={user.username} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Mainpage;