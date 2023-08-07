import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/jobs.css';
import { Link,useNavigate } from 'react-router-dom';
import ImageComponent from './ImageComponent';
import Footer from './Footer';
const Displayimage=() => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedJobType, setSelectedJobType] = useState('All');
 
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
  const filteredJobs = selectedJobType === 'All' ? jobs : jobs.filter((job) => job.jobType === selectedJobType);

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
              <center>Job Listings</center>
            </h1>
            <br></br>
            <div className="row">
              {filteredJobs.map((job, index) => (
                <div className="col-md-6 col-lg-3" key={index}>
                  <div className="job-item">
                    <div className="item-overlay">
                      <div className="job-info">
                        <a href="#" className="btn btn-primary">
                          {job.jobType}
                        </a>
                        <span className="tr-title">
                          <a href="#"><center><b>{job.title}</b></center></a>
                          <span>
                            <a href="#"><center><b>{job.company}</b></center></a>
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
                          
                         
                           <center>
                           
                            <button
                              className="btn btn-danger"
                              onClick={() => navigate(`/showjobs/${job._id}`)}
                            >
                              View JobDesc
                            </button>
                            
                            </center>
                      
                        </ul>
                      </div>
                    </div>
                    <div className="job-info">
                      <div className="company-logo">
                        {job.image && <ImageComponent imageName={job.image} />}
                      </div>
                      <span className="tr-title">
                        <a href="#"><center><b>{job.title}</b></center></a>
                        <span>
                          <a href="#"><center><b>{job.company}</b></center></a>
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
      <Footer></Footer>
    </div>
  );
}

export default Displayimage;
