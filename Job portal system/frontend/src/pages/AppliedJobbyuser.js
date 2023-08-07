

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/jobs.css';
import { Link,useNavigate } from "react-router-dom";
import ImageComponent from './ImageComponent';
import Footer from './Footer';
const AppliedJobbyuser = () => {
  
  const [userJobs, setUserJobs] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState('All');
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
    const fetchUserJobs = async () => {
      try {
        if (user?.username) {
        const response = await axios.get(`http://localhost:4000/auth/userjobs/${user.username}`);
        setUserJobs(response.data);
        }
      } catch (error) {
        console.error('Error fetching user jobs:', error);
        // Handle error (e.g., show an error message)
      }
    };

    fetchUserJobs();
  }, [user?.username]);
 
  const handleJobTypeChange = (jobType) => {
    setSelectedJobType(jobType);
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
  const navigate = useNavigate();
  const filteredJobs = selectedJobType === 'All' ? userJobs : userJobs.filter((job) => job.jobType === selectedJobType);



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
              
              <Link to="/showjobs" className="nav-item nav-link">Apply Job</Link>
             
             
              <Link to="/appliedjob" className="nav-item nav-link active">Job applied by user</Link>
              <div className="nav-item dropdown">
              {user&&user.username&& <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{user.username}</Link>}
                      <div className="dropdown-menu rounded-0 m-0">
                          <Link to="/profileview" className="dropdown-item">ViewProfile</Link>
                          <Link to="/profileadd" className="dropdown-item">UpdateProfile</Link>
                      </div>
                  </div>
           
              <Link to="/login" onClick={handleLogout} className="nav-item nav-link">Signout</Link>
            </div>
        </div>
    </nav>
    <div className="tr-job-posted section-padding">
        <div className="container">
          <div className="job-tab text-center">
            <br></br>
            <ul className="nav nav-tabs justify-content-center" role="tablist">
              <li role="presentation" className={selectedJobType === 'All' ? 'active' : ''}>
                <a
                  className={selectedJobType === 'All' ? 'active show' : ''}
                  href="#all-jobs"
                  aria-controls="all-jobs"
                  role="tab"
                  data-toggle="tab"
                  aria-selected={selectedJobType === 'All'}
                  onClick={() => handleJobTypeChange('All')}
                >
                  All Jobs
                </a>
              </li>
              <li role="presentation" className={selectedJobType === 'freelancing' ? 'active' : ''}>
                <a
                  className={selectedJobType === 'freelancing' ? 'active show' : ''}
                  href="#all-jobs"
                  aria-controls="all-jobs"
                  role="tab"
                  data-toggle="tab"
                  aria-selected={selectedJobType === 'freelancing'}
                  onClick={() => handleJobTypeChange('freelancing')}
                >
                  FreeLancing
                </a>
                </li>
              <li role="presentation" className={selectedJobType === 'fulltime' ? 'active' : ''}>
                <a
                  className={selectedJobType === 'fulltime' ? 'active show' : ''}
                  href="#fulltime"
                  aria-controls="freelancing-jobs"
                  role="tab"
                  data-toggle="tab"
                  aria-selected={selectedJobType === 'fulltime'}
                  onClick={() => handleJobTypeChange('fulltime')}
                >
                  FullTime
                </a>
              </li>
              <li role="presentation" className={selectedJobType === 'parttime' ? 'active' : ''}>
                <a
                  className={selectedJobType === 'parttime' ? 'active show' : ''}
                  href="#parttime"
                  aria-controls="freelancing-jobs"
                  role="tab"
                  data-toggle="tab"
                  aria-selected={selectedJobType === 'parttime'}
                  onClick={() => handleJobTypeChange('parttime')}
                >
                  PartTime
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content text-left">
            <div role="tabpanel" className="tab-pane fade active show" id="hot-jobs"></div>
            <h1 className="head">
              <center>Job Applied By User</center>
            </h1>
            <br></br>
            <div className="row">
              {filteredJobs.map((job, index) => (
                <div className="col-md-6 col-lg-3" key={index}>
                
                  <div className="job-item">
                  
                    <div className="job-info">
                  
                      <ul className="tr-list job-meta">
                      
                      <h3 className="l1"><li>
                          <span>
                           Company:
                          </span>
                          {job.company}
                        </li></h3>
                      <h3><li>
                          <span>
                           Title:
                          </span>
                          {job.title}
                        </li></h3>
                     
                       
                        <h3><li>
                          <span>
                           Location:
                          </span>
                          {job.location}
                        </li></h3>
                       
                        <h3><li>
                          <span>
                           Level:
                          </span>
                          {job.level}
                        </li></h3>
                        <h3><li>
                          <span>
                           Job Type:
                          </span>
                          {job.jobType}
                        </li></h3>
                        <h3><li>
                          <span>
                           Salary:
                          </span>
                          {job.salary}
                        </li></h3>
                        
                      </ul>
                     
                    </div>
                   
                  </div>
               
                </div>
              ))}
            </div>
          </div>
      
     
    </div>
    </div> 
    <Footer></Footer>
    </div>
  );
  
  
};

export default AppliedJobbyuser;
