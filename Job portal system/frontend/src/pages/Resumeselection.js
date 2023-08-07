import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Footer from './Footer';
const Resumeselection = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [nlpResults, setNlpResults] = useState([]);
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
  
  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleKeywordChange = (e) => {
    setKeywords(e.target.value);
  };
  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('resumes', selectedFiles[i]);
    }

    try {
      const response = await axios.post('http://localhost:4000/resume/processResumes', formData, {
        params: {
          keywords: keywords.trim().split(' ')
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNlpResults(response.data);
    } catch (error) {
      console.error('Error uploading resumes:', error);
    }
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
            <Link to="/adminhome" className="nav-item nav-link">Home</Link>
             
             
             <Link to="/addjobs" className="nav-item nav-link">addjobs</Link>
             <Link to="/resumeselect" className="nav-item nav-link active">Resume Select</Link>
             <Link to="/delete" className="nav-item nav-link">deletejob</Link>
             <Link to="/applications" className="nav-item nav-link">Applications</Link>
               
        
             <Link to="/login" onClick={handleLogout} className="nav-item nav-link">Signout</Link>
            </div>
        </div>
    </nav>
    <div className="tr-job-posted section-padding">
        <div className="container">
          <div className="job-tab text-center">
            <br></br>
      <center><h2>Resume Shortlising</h2></center>
      <br></br>
      <center>
     Upload resume here for shortlising:&nbsp; &nbsp;
    <input type="file" multiple onChange={handleFileChange} />
    </center>
       <br></br>
       <br></br>
       <center>
      Enter keywords here to shortlising: &nbsp; &nbsp;
      <input type="text" placeholder="Enter keywords separated by spaces" onChange={handleKeywordChange} />
      <button onClick={handleUpload}>Shortlize Resume</button>
      </center> 
     </div>
     </div>

      <div>
        <br></br>
        <center><h2>NLP Analysis Results</h2></center>
        <br></br>
        {nlpResults.length > 0 ? (
          <div className="row">
          
            {nlpResults.map((result, index) => (
           
              <div key={index}>
                <p><h3><b>Resume { index + 1}</b></h3></p>
                <ul>
                  {result.entities.map((entity, idx) => (
                    <li key={idx}>
                      {entity.text} - {entity.label}
                    </li>
                  ))}
                </ul>
                <p>Sentiment Score: {result.sentiment_score}</p>
                <p>Filtered Job desc: {result.filtered_job_descriptions}</p>
                <p>Overall Result: {result.prediction}</p>
              </div>
             
            ))}
        
          </div>
        ) : (
          <p>No NLP analysis results yet. Upload and process resumes to see the results.</p>
          
        )}
    
    </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Resumeselection;

