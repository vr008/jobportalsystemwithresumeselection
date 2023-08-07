import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import './css/Loginres.css';
import Footer from './Footer.js';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:4000/auth/register', { username, email, password });

      // Redirect to the login page
      alert("registration completed")
      window.location.href = '/login';
    } catch (error) {
      alert("registration unsucessfull")
      console.error(error);
      // Handle registration error
    }
  };

  return (
    <div>
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
            <div className="navbar-nav ms-auto p-4 p-lg-0">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    
                   
                    <Link to="/login" className="nav-item nav-link">Login</Link>
                    <Link to="/register" className="nav-item nav-link active">Register</Link>
                    <Link to="/adminlogin" className="nav-item nav-link">AdminLogin</Link>
                </div>
            </div>
        </div>
    </nav>
    <body className="a1">
    
    <div className="cont">
   
    <div className="Login Form">
    <header>Sign Up</header>
          <form onSubmit={(e) => handleRegister(e)}>
         
          <b>Email</b><input type="email" name="email"  onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          <b>Username</b><input type="text" name="username"  onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
              
                <b>Password</b><input type="text" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <input type="submit" className="But" value="Sign up"></input>
                </form>
                <div className="signup">
            <span className="signup">
              Already A Member?{' '}
              <Link to="/login">
                Login
              </Link>
            </span>
          </div>
            
     </div>
        
    </div>
    <a href="/" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </body>
    <Footer></Footer>
    </div>
  
  </div>
  

  );
};

export default Register;
