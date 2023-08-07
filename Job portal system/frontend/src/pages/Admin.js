import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './css/Loginres.css';
import Footer from './Footer.js'
const Admin = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [otp, setOtp] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleSendOTP = () => {
    fetch('http://localhost:4000/admin/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,username,password}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('otp is sent to email')
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        alert.error('otp not sent')
      });
  };

  /*const handleLogin = () => {
    fetch('http://localhost:4000/admin/adminlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,username,password, otp }),
    })
      .then((response) => response.json())
      .then((data,response) => {
        const { token } =  response.json();
        localStorage.setItem('token', token);
        // Redirect to the profile page
        window.location.href = '/adminhome';
        setVerificationMessage(data.message);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error verifying OTP:', error);
      });*/
      const handleLogin = async () => {
        try {
          const response = await fetch('http://localhost:4000/admin/adminlogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password,email,otp}),
          });
    
          if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            // Redirect to the profile page
            window.location.href = '/adminhome';
          } else {
            const { message } = await response.json();
            console.log(message);

          }
        } catch (error) {
          console.error(error);
          alert('invalid-otp')
        }
  
  };

  return (
    <div className="container-xxl bg-white p-0">

        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
            <Link to="/" className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                <h1 className="m-0 text-primary">InterviewDoor</h1>
            </Link> 
            <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    
                   
                    <Link to="/login" className="nav-item nav-link">Login</Link>
                    <Link to="/register" className="nav-item nav-link">Register</Link>
                    <Link to="/adminlogin" className="nav-item nav-link active">AdminLogin</Link>
                </div>
            </div>
        </nav>
 
        <body className="a2">
    
    <div className="con1">
   
    <div className="Login Form">
    <header>Admin Login</header>
          <form>
         
          <b>Email</b><input type="email" name="email"  onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          <b>Username</b><input type="text" name="username"  onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
              
                <b>Password</b><input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                
                <input type="submit" onClick={handleSendOTP} className="But" value="Generate OTP"></input>
          <b>Enter OTP</b><input type="text" name="password" onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP"/>
          <input type="submit" onClick={handleLogin} className="But" value="Login"></input>
                </form>
           
            
     </div>
        
    </div>
    <a href="/" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </body>
    <Footer></Footer>
    </div>
   
  );
};

export default Admin;