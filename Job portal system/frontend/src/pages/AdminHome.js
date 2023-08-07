import React, { useState, useEffect, useHistory } from 'react';
import imag from './img/home.jpg';
import img1 from './img/about-1.jpg';
import img2 from './img/about-2.jpg';
import img3 from './img/about-3.jpg';
import img4 from './img/about-4.jpg';
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from './Footer';

const AdminHome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No token found');
        }
        
        const response = await fetch('http://localhost:4000/admin/adminhome', {
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
    window.location.href = '/adminlogin';
  };
  if (!user) {
    return <div>Loading...</div>;
  }

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
                <Link to="/adminhome" className="nav-item nav-link active">Home</Link>
             
             
                <Link to="/addjobs" className="nav-item nav-link">addjobs</Link>
                <Link to="/resumeselect" className="nav-item nav-link">Resume Select</Link>
                <Link to="/delete" className="nav-item nav-link">deletejob</Link>
                <Link to="/applications" className="nav-item nav-link">Applications</Link>
               
           
                <Link to="/login" onClick={handleLogout} className="nav-item nav-link">Signout</Link>
            </div>
        </div>
    </nav>

    <div className="container-fluid p-0">
        <div className="owl-carousel header-carousel position-relative">
            <div className="owl-carousel-item position-relative">
                <img className="img-fluid" src={imag} alt=""/>
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center comp">
                    <div className="container">
                        <div className="row justify-content-start">
                            <div className="col-10 col-lg-8">
                            <h1 className="display-3 text-white animated slideInDown mb-4">Welcome {user.username}</h1>
                                    <p className="fs-5 fw-medium text-white mb-4 pb-2">You are important part of this process.</p>
                                    <Link to="/addjobs" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Add jobs</Link>
                                    <Link to="/resumeselect" className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Resume Select</Link>
                            
                            
                               

                        </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        

        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                        <div className="row g-0 about-bg rounded overflow-hidden">
                            <div className="col-6 text-start">
                                <img alt="i1" className="img-fluid w-100" src={img1}/>
                            </div>
                            <div className="col-6 text-start">
                                <img alt ="i2" className="img-fluid s1" src={img2}/>
                            </div>
                            <div className="col-6 text-end">
                                <img alt="i3" className="img-fluid s2" src={img3} />
                            </div>
                            <div className="col-6 text-end">
                                <img alt="i4" className="img-fluid w-100" src={img4}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <h1 className="mb-4">We Help To Get The Best Job And Find A Talent</h1>
                        <p className="mb-4">Why admin is important </p>
                        <p><i className="fa fa-check text-primary me-3"></i>Adds Job</p>
                        <p><i className="fa fa-check text-primary me-3"></i>Recieve Resume</p>
                        <p><i className="fa fa-check text-primary me-3"></i>Shortlizes resume</p>
                        
                    </div>
                </div>
            </div>
        </div>






    <a className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    <Footer></Footer>
</div>   
    /*<div>
      <h1>Profile Page</h1>
      <p>Welcome, {user.username}!</p>
      <p>Email: {user.email}</p>
      <input type="text" placeholder="Username" value={user.username} />
      <button onClick={handleLogout}>Logout</button>
    </div>*/
  );
};

export default AdminHome;
