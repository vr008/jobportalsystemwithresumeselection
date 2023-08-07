import React, { useState, useEffect, useHistory } from 'react';
import imag from './img/carousel-2.jpg';
import img1 from './img/about-1.jpg';
import img2 from './img/about-2.jpg';
import img3 from './img/about-3.jpg';
import img4 from './img/about-4.jpg';
import home from './img/home.jpg';
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from './Footer';
const Dashboard = () => {
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
                <Link to="/dashboard" className="nav-item nav-link active">Home</Link>
              
                <Link to="/showjobs" className="nav-item nav-link">Apply Job</Link>
               
                <Link to="/appliedjob" className="nav-item nav-link">Job applied by user</Link>
                <div className="nav-item dropdown">
                {user&&user.username&& <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{user.username}</a>}
                        <div className="dropdown-menu rounded-0 m-0">
                            <Link to="/profileview" className="dropdown-item">ViewProfile</Link>
                            <Link to="/profileadd" className="dropdown-item">UpdateProfile</Link>
                        </div>
                    </div>
             
                <Link to="/login" onClick={handleLogout} className="nav-item nav-link">Signout</Link>
            </div>
        </div>
    </nav>

    <div className="container-fluid p-0">
        <div className="owl-carousel header-carousel position-relative">
            <div className="owl-carousel-item position-relative">
                <img className="img-fluid" src={home} alt=""/>
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center comp">
                    <div className="container">
                        <div className="row justify-content-start">
                            <div className="col-10 col-lg-8">
                            <h1 className="display-3 text-white animated slideInDown mb-4">Find The Best Startup Job That Fit You</h1>
                                    <p className="fs-5 fw-medium text-white mb-4 pb-2">Crack You dream Job now.</p>
                                    <Link to="/showjobs" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">View Jobs</Link>
                                    <Link to="/appliedjob" className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Jobs Already Applied</Link>
                            
                            
                               

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
                        <p className="mb-4">Recruiters Are Always in touch which us</p>
                        <p><i className="fa fa-check text-primary me-3"></i>We save lot of time to recruiters to find lot of talent</p>
                        <p><i className="fa fa-check text-primary me-3"></i>It helps job seekers to save time</p>
                        <p><i className="fa fa-check text-primary me-3"></i>We will provide best possible job</p>
                      
                    </div>
                </div>
            </div>
        </div>





 <Footer></Footer>
    <a className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
</div>   
  
  );
};

export default Dashboard;
