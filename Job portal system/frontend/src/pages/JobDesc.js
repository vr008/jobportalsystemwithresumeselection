import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import './css/jobdesc.css';
import ImageComponent from './ImageComponent';
import Footer from './Footer';
function JobDesc() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
 
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
            Authorization: `Bearer ${token}`,
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


  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/auth/showjobs/${jobId}`);
        setJob(response.data.job);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!job) {
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
            <Link to="/dashboard" className="nav-item nav-link">Home</Link>
              
              <Link to="/showjobs" className="nav-item nav-link active">Apply Job</Link>
             
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
 
   <br></br>
   <br></br>

   <div className="wrapper">
      <div className="intro">
        <div className="profile">
        <div className="job-info">
          <div className="company-logo">
          {job.image && <ImageComponent imageName={job.image} />}
          <div className="bio">
            <h1 className="name">{job.company}</h1>
           
            <br></br>
            <br></br>
          </div>
        </div>
        </div>
        </div>
        <div className="intro-section about">
          <h1 className="title">Job Summary</h1>
          <p className="paragraph">
            company:{job.company}<br></br>
            title:{job.title}<br></br>
            jobtype:{job.jobType}<br></br>
            level:{job.level}<br></br>
            location:{job.location}<br></br>
            salary:{job.salary}<br></br>
          </p>
        </div>
      </div>
      <div className="detail">
        <div className="detail-section edu">
          <div className="detail-title">
            <div className="title-icon">
              <i className="fas fa-user-graduate"></i>
            </div>
            <span>About the company</span>
          </div>
          <div className="detail-content">
            {job.about}
          </div>
        </div>
        <div className="detail-section pg-skill">
          <div className="detail-title">
            <div className="title-icon">
              <i className="fas fa-laptop-code"></i>
            </div>
            <span>Job Description</span>
          </div>
          <div className="detail-content">
            {job.jobdescription}
          </div>
        </div>
        <div className="detail-section tool-skill">
          <div className="detail-title">
            <div className="title-icon">
              <i className="fas fa-tools"></i>
            </div>
            <span>Qualification</span>
          </div>
          <div className="detail-content">
            {job.qualification}
          </div>
        </div>
        <div className="detail-section interests">
          <div className="detail-title">
            <div className="title-icon">
              <i className="fas fa-heart"></i>
            </div>
            <span>Responsibility</span>
          </div>
          <div className="detail-content">
            {job.responsiblity}
          </div>
        </div>
        <div className="apply-button">
        <Link to={`/apply/${jobId}`} className="btn btn-primary">Apply</Link>
      </div>
      </div>
    </div>
    <Footer></Footer>
    </div>   
   

  );
}

export default JobDesc;
