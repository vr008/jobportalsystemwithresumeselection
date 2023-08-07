import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import './css/Loginres.css';
import Footer from './Footer';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        // Redirect to the profile page
        window.location.href = '/dashboard';
      } else {
        alert('invalid username or password')
        const { message } = await response.json();
        console.log(message);
      }
    } catch (error) {
      alert('invalid username or password')
      console.error(error);
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
            <div className="navbar-nav ms-auto p-4 p-lg-0">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    
                   
                    <Link to="/login" className="nav-item nav-link active">Login</Link>
                    <Link to="/register" className="nav-item nav-link">Register</Link>
                    <Link to="/adminlogin" className="nav-item nav-link">AdminLogin</Link>
                </div>
            </div>
        </div>
    </nav>
  
    <body className="a1">
    
    <div className="cont">
   
    <div className="Login Form">
    <header>Login</header>
          <form onSubmit={(e) => handleLogin(e)}>
         
             
                  <b>Username</b><input type="text" name="username"  onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
              
                <b>Password</b><input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <input type="submit" className="But" value="Login"></input>
                </form>
                <div className="signup">
            <span className="signup">
              Don't have an account?{' '}
              <Link to="/register">
                Signup
              </Link>
            </span>
          </div>
            
     
          </div>
        
    </div>
    <a href="/" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    
    </body>
    <Footer></Footer>
    </div>
  

    
  );
};

export default Login;
