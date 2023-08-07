import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/jobs.css';
import { Link } from "react-router-dom";
import ImageComponent from './ImageComponent';
function Showjobs() {
  const [jobs, setJobs] = useState([]);
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
  const getJobTypeColor = (jobType) => {
    let color = '';

    if (jobType === 'freelancing') {
      color = 'freelance';
    } else if (jobType === 'parttime') {
      color = 'part-time';
    } else if (jobType === 'fulltime') {
      color = 'fulltime ';
    }
    else{
      color='fulltime'
    }

    return color;
  };

  useEffect(() => {
   

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:4000/auth/showjobs');
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  fetchJobs();
}, []);
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
                <Link to="/" className="nav-item nav-link">About</Link>
                <Link to="/showjobs" className="nav-item nav-link">Apply Job</Link>
                <a className="nav-item nav-link active">Upload A resume</a>

                <div className="nav-item dropdown">
                        {user&&user.username&&<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{user.username}</a>}
                        <div className="dropdown-menu rounded-0 m-0">
                            <Link to="/profileview" className="dropdown-item">ViewProfile</Link>
                            <Link to="/profileadd" className="dropdown-item">UpdateProfile</Link>
                            <a href="404.html" className="dropdown-item">404</a>
                        </div>
                    </div>
                <Link to="/main" className="nav-item nav-link">HOMEPAGE</Link>
                <Link to="/login" onClick={handleLogout} className="nav-item nav-link">Signout</Link>
            </div>
        </div>
    </nav>
    <div className="tr-job-posted section-padding">
<div className="container">
<div className="job-tab text-center">
<br></br>

<ul className="nav nav-tabs justify-content-center" role="tablist">
<li role="presentation" className="active">
<a className="active show" href="#hot-jobs" aria-controls="hot-jobs" role="tab" data-toggle="tab" aria-selected="true">Hot Jobs</a>
</li>
<li role="presentation"><a href="#recent-jobs" aria-controls="recent-jobs" role="tab" data-toggle="tab" class aria-selected="false">Recent Jobs</a></li>
<li role="presentation"><a href="#popular-jobs" aria-controls="popular-jobs" role="tab" data-toggle="tab" class aria-selected="false">Popular Jobs</a></li>
</ul>
</div>
  <div className="tab-content text-left">
<div role="tabpanel" className="tab-pane fade active show" id="hot-jobs"></div>
    
      <h1 className="head"><center>Job Listings</center></h1>
      <br></br>
      <div className="row">
        {jobs.map((job, index) => (
          <div className="col-md-6 col-lg-3" key={index}>
            <div className="job-item">
              <div className="item-overlay">
                <div className="job-info">
                  <a href="#" className="btn btn-primary">
                    {job.jobType}
                  </a>
                  <span className="tr-title">
                    <b><center>{job.title}</center></b>
                    <span>
                      <b><center>{job.company}</center></b>
                    </span>
                  </span>
                  <ul className="tr-list job-meta">
                    <li>
                      <i className="fa fa-map-signs" aria-hidden="true"></i>
                      {job.location}
                    </li>
                    <li>
                      <i className="fa fa-briefcase" aria-hidden="true"></i>
                      {job.level}
                    </li>
                    <li>
                      <i className="fa fa-money" aria-hidden="true"></i>
                      {job.salary}
                    </li>
                  </ul>
                  <ul className="job-social tr-list">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart-o" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-expand" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="job-info">
                <div className="company-logo">
                {job.image && <ImageComponent imageName={job.image} />}
              
                </div>
                <span className="tr-title">
                  <a href="#"><b><center>{job.title}</center></b></a>
                  <span>
                    <a href="#"><b><center>{job.company}</center></b></a>
                  </span>
                </span>
                <ul className="tr-list job-meta">
                  <li>
                    <span>
                      <i className="fa fa-map-signs" aria-hidden="true"></i>
                    </span>
                    {job.location}
                  </li>
                  <li>
                    <span>
                      <i className="fa fa-briefcase" aria-hidden="true"></i>
                    </span>
                    {job.level}
                  </li>
                  <li>
                    <span>
                      <i className="fa fa-money" aria-hidden="true"></i>
                    </span>
                    {job.salary}
                  </li>
                </ul>
                <div className="time">
                  <a href="#">
                    <span className={`${getJobTypeColor(job.jobType)}`}>{job.jobType}</span>
                  </a>
                  <span className="pull-right">Posted {job.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
    </div>


    
    
  );
}


export default Showjobs;
