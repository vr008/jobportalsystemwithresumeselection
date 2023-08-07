import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Footer from './Footer';
const JobApplications = () => {
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    fetchJobApplications();
  }, []);
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
  const fetchJobApplications = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/applications');
      setJobApplications(response.data);
    } catch (error) {
      console.error('Error fetching job applications:', error);
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:4000/admin/download/${filename}`, {
        responseType: 'blob',
      });

      // Create a URL for the blob data and create an anchor element to initiate the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading resume:', error);
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
            <Link to="/adminhome" className="nav-item nav-link">Home</Link>
             
             
             <Link to="/addjobs" className="nav-item nav-link">addjobs</Link>
             <Link to="/resumeselect" className="nav-item nav-link">Resume Select</Link>
             <Link to="/delete" className="nav-item nav-link">deletejob</Link>
             <Link to="/applications" className="nav-item nav-link active">Applications</Link>
         
        
             <Link to="/login" onClick={handleLogout} className="nav-item nav-link">Signout</Link>
            </div>
        </div>
    </nav>
    <div className="tab-content text-left">
            <div role="tabpanel" className="tab-pane fade active show" id="hot-jobs"></div>
            <br></br>
            <h1 className="head">
              <center>Job Application Submitted By user</center>
            </h1>
            <br></br>
            <div className="row">
              {jobApplications.map((job,index)  => (
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
                          <span>Username:</span> {job.username}
                          </li></h3>
                          <h3><li>
                          <span>Email:</span> {job.email}
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
                        <h3><li>
                          <span>Resume: </span>
             {job.resume} </li></h3>
              <button onClick={() => handleDownload(job.resume)}>Download</button>
          
                      </ul>
                     
                    </div>
                   
                  </div>
               
                </div>
              ))}
            </div>
          </div>
      
     <Footer></Footer>
    </div>
  );
};

export default JobApplications;
