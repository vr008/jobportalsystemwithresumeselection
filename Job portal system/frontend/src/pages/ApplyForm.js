import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link,useNavigate } from 'react-router-dom';
import './css/Apply.css';
import img from './img/apply.jpg';
import Footer from './Footer.js';

const ApplyForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

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

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    jobType: '',
    title: '',
    company: '',
    location: '',
    level: '',
    salary: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      resume: e.target.files[0],
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the required fields are empty
    if (
      !user?.username ||
      !user?.email ||
      !job?.jobType ||
      !job?.title ||
      !job?.company ||
      !job?.location ||
      !job?.level ||
      !job?.salary ||
      !formData?.resume
    ) {
      alert('Please fill out all the required fields.');
      return; // Exit the function and prevent form submission
    }
  
    // Check if the user has already applied for the job
    if (user && user.username && job && job.title) {
      try {
        const queryParams = {
          username: user.username,
          jobType: job.jobType,
          title: job.title,
          company: job.company,
          location: job.location,
          level: job.level,
          salary: job.salary,
        };
  
        const response = await axios.get('http://localhost:4000/auth/checkapplication', {
          params: queryParams,
        });
  
        if (response.data.alreadyApplied) {
          alert('You have already applied for this job.');
          return; // Exit the function and prevent form submission
        } else {
          // Proceed with the form submission if the user hasn't applied already
          try {
            const formDataToSend = new FormData();
            formDataToSend.append('username', user.username);
            formDataToSend.append('email', user.email);
            formDataToSend.append('jobType', job.jobType);
            formDataToSend.append('title', job.title);
            formDataToSend.append('company', job.company);
            formDataToSend.append('location', job.location);
            formDataToSend.append('level', job.level);
            formDataToSend.append('salary', job.salary);
            formDataToSend.append('resume', formData.resume);
  
            const response = await axios.post('http://localhost:4000/auth/apply', formDataToSend, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            alert('Job successfully applied!');
            // Navigate to the job list page
            navigate('/showjobs');
            console.log(response.data);
            // Handle success (e.g., show a success message)
          } catch (error) {
            console.error('Error applying for the job:', error);
            // Handle error (e.g., show an error message)
          }
        }
      } catch (error) {
        console.error('Error checking application:', error);
        // Handle error (e.g., show an error message)
      }
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
    <div className="formbold-main-wrapper">
     
      <div className="formbold-form-wrapper">
      <center><h1>Submit Your Application</h1></center>
        <img src={img} alt="Your Image" />
        <form onSubmit={handleSubmit}>
          <div className="formbold-input-flex">
            <div>
              <label htmlFor="Username" className="formbold-form-label">
                UserName
              </label>
              {user && user.username &&<input
                type="text"
                name="username"
                id="username"
                placeholder="Your first name"
                className="formbold-form-input"
                value={user.username}
                onChange={handleChange}
                required
              />}
            </div>

           
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="email" className="formbold-form-label">
                Email
              </label>
              {user && user.email &&<input
                type="email"
                name="email"
                id="email"
                placeholder="example@email.com"
                className="formbold-form-input"
                value={user.email}
                onChange={handleChange}
                required
              />}
            </div>

          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="email" className="formbold-form-label">
                Company
              </label>
              {job && job.company && <input
                type="text"
                name="company"
                id="company"
                placeholder="example@email.com"
                className="formbold-form-input"
                value={job.company}
                onChange={handleChange}
                required
              />}
            </div>

            <div>
              <label htmlFor="jobType" className="formbold-form-label">
                Job Title
              </label>
              {job && job.title&& <input
                type="text"
                name="jobType"
                id="jobType"
                placeholder="Job Type"
                className="formbold-form-input"
                value={job.title}
                onChange={handleChange}
              />}
            </div>
          </div>
          <div className="formbold-input-flex">
            <div>
              <label htmlFor="email" className="formbold-form-label">
                Job Type
              </label>
              {job && job.level &&<input
                type="text"
                name="email"
                id="email"
                placeholder="example@email.com"
                className="formbold-form-input"
                value={job.level}
                onChange={handleChange}
                required
              />}
            </div>

            <div>
              <label htmlFor="jobType" className="formbold-form-label">
                Job Type
              </label>
              {job && job.jobType &&<input
                type="text"
                name="jobType"
                id="jobType"
                placeholder="Job Type"
                className="formbold-form-input"
                value={job.jobType}
                onChange={handleChange}
              />}
            </div>
          </div>
          <div className="formbold-input-flex">
            <div>
              <label htmlFor="email" className="formbold-form-label">
                Location
              </label>
              {job && job.location &&<input
                type="text"
                name="email"
                id="email"
                placeholder="example@email.com"
                className="formbold-form-input"
                value={job.location}
                onChange={handleChange}
                required
              />}
            </div>

            <div>
              <label htmlFor="jobType" className="formbold-form-label">
                Salary
              </label>
              {job && job.jobType &&<input
                type="text"
                name="jobType"
                id="jobType"
                placeholder="Job Type"
                className="formbold-form-input"
                value={job.salary}
                onChange={handleChange}
              />}
            </div>
          </div>



          <div className="formbold-form-file-flex">
            <label htmlFor="upload" className="formbold-form-label">
              Upload Resume
            </label>
            <input
              type="file"
              name="resume"
              id="upload"
              className="formbold-form-file"
              onChange={handleFileChange}
              required
            />
          </div>
         
          <button type="submit" className="formbold-btn">
            Apply Now
          </button>
          
        </form>
      </div>
    </div>
 <Footer></Footer>

    </div>
  );
};

export default ApplyForm;
