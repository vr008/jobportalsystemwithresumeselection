import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer'
function Addjobs() {
  const [jobs, setJobs] = useState([]);
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
  

  const handleAddJob = () => {
    setJobs((prevJobs) => [...prevJobs, createEmptyJob()]);
  };

  const handleRemoveJob = (index) => {
    setJobs((prevJobs) => prevJobs.filter((_, i) => i !== index));
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setJobs((prevJobs) =>
      prevJobs.map((job, i) => (i === index ? { ...job, [name]: value } : job))
    );
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    setJobs((prevJobs) =>
      prevJobs.map((job, i) => (i === index ? { ...job, image: file } : job))
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await Promise.all(
        jobs.map(async (job) => {
          const formData = new FormData();
          formData.append('jobType', job.jobType);
          formData.append('title', job.title);
          formData.append('company', job.company);
          formData.append('location', job.location);
          formData.append('level', job.level);
          formData.append('salary', job.salary);
          formData.append('image', job.image);
          formData.append('about',job.about);
      formData.append('jobdescription',job.jobdescription);
      formData.append('qualification',job.qualification);
      formData.append('responsiblity',job.responsiblity);

          await axios.post('http://localhost:4000/admin/jobs', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        })
      );

      console.log('Jobs created successfully');
    } catch (error) {
      console.error('Error creating jobs:', error);
    }
  };

  const createEmptyJob = () => {
    return {
      jobType: '',
      title: '',
      company: '',
      location: '',
      level: '',
      salary: '',
      image: null,
      about:'',
      jobdescription:'',
      qualification:'',
      responsiblity:'',
    };
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
             
             
             <Link to="/addjobs" className="nav-item nav-link active">addjobs</Link>
             <Link to="/resumeselect" className="nav-item nav-link">Resume Select</Link>
             <Link to="/delete" className="nav-item nav-link">deletejob</Link>
             <Link to="/applications" className="nav-item nav-link">Applications</Link>
             
        
             <Link to="/login" onClick={handleLogout} className="nav-item nav-link">Signout</Link>
            </div>
        </div>
    </nav>
    <div className="formbold-main-wrapper">
    <div className="formbold-form-wrapper">
      <center><h1>Create New Jobs</h1></center>
      <br></br>
      <form onSubmit={handleSubmit}>
      <div className="formbold-input-flex">
        {jobs.map((job, index) => (
          <div key={index}>
          <label Job htmlFor="Username" className="formbold-form-label"><h5>Job Type:</h5></label>
            <input
              type="text"
              name="jobType"
              className="formbold-form-input"
              value={job.jobType}
              onChange={(e) => handleInputChange(e, index)}
            />

<label Job htmlFor="Username" className="formbold-form-label"><h5>Title:</h5></label>
            <input
              type="text"
              name="title"
              value={job.title}
              className="formbold-form-input"
              onChange={(e) => handleInputChange(e, index)}
            />

<label Job htmlFor="Username" className="formbold-form-label"><h5>Company:</h5></label>
            <input
              type="text"
              name="company"
              value={job.company}
              className="formbold-form-input"
              onChange={(e) => handleInputChange(e, index)}
            />

<label Job htmlFor="Username" className="formbold-form-label"><h5>Location:</h5></label>
            <input
              type="text"
              name="location"
              value={job.location}
              className="formbold-form-input"
              onChange={(e) => handleInputChange(e, index)}
            />

<label Job htmlFor="Username" className="formbold-form-label"><h5>Level:</h5></label>
            <input
              type="text"
              name="level"
              value={job.level}
              className="formbold-form-input"
              onChange={(e) => handleInputChange(e, index)}
            />

<label Job htmlFor="Username" className="formbold-form-label"><h5>Salary:</h5></label>
            <input
              type="text"
              name="salary"
              value={job.salary}
              className="formbold-form-input"
              onChange={(e) => handleInputChange(e, index)}
            />
<label Job htmlFor="Username" className="formbold-form-label"><h5>About:</h5></label>
            <textarea
              name="about"
              value={job.about}
              onChange={(e) => handleInputChange(e, index)}
              className="formbold-form-input"
              rows={4} // Set the number of rows for the textarea
            />

<label Job htmlFor="Username" className="formbold-form-label"><h5>Job Description:</h5></label>
            <textarea
              name="jobdescription"
              value={job.jobdescription}
              className="formbold-form-input"
              onChange={(e) => handleInputChange(e, index)}
              rows={4} // Set the number of rows for the textarea
            />

<label Job htmlFor="Username" className="formbold-form-label"><h5>Qualification:</h5></label>
            <textarea
              name="qualification"
              value={job.qualification}
              className="formbold-form-input"
              onChange={(e) => handleInputChange(e, index)}
              rows={4} // Set the number of rows for the textarea
            />
<label Job htmlFor="Username" className="formbold-form-label"><h5>Responsibility:</h5></label>
            <textarea
              name="responsiblity"
              value={job.responsiblity}
              className="formbold-form-input"
              onChange={(e) => handleInputChange(e, index)}
              rows={4} // Set the number of rows for the textarea
            />
<label Job htmlFor="Username" className="formbold-form-label"><h5>Image:</h5></label>
            <input
              type="file"
              className="formbold-form-file"
              onChange={(e) => handleFileChange(e, index)}
            />

            <button type="button" className="formbold-btn" onClick={() => handleRemoveJob(index)}>
              Remove Job
            </button>
          </div>
         
        ))}
        </div>
        <button type="button"  className="formbold-btn" onClick={handleAddJob}>
          Add Job
        </button>

        <button type="submit"  className="formbold-btn">Submit</button>
        
      </form>
      </div>
    </div>
    <Footer></Footer>
    </div>
   
  );
}

export default Addjobs;
