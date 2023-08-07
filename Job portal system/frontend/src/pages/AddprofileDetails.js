import React, { useState, useEffect, useHistory } from 'react';
import './css/profile.css';
import Footer from './Footer';
import { Link } from "react-router-dom";
import axios from "axios";
const Profile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [postcode, setPostcode] = useState('');
  const [state, setState] = useState('');
  const [area, setArea] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [country, setCountry] = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [experienceYears, setExperienceYears] = useState(0);
  const [additionalDetails, setAdditionalDetails] = useState('');

  // College fields
  const [collegeName, setCollegeName] = useState('');
  const [collegeCity, setCollegeCity] = useState('');
  const [degree, setDegree] = useState('');
  const [dept, setDept] = useState('');
  const [startingYear, setStartingYear] = useState();
  const [graduatingYear, setGraduatingYear] = useState();
  const [cgpa, setCGPA] = useState(0);
  const [historyOfArrears, setHistoryOfArrears] = useState(0);
  const [standingArrears, setStandingArrears] = useState(0);

  // School fields
  const [class10Percentage, setClass10Percentage] = useState();
  const [class10PassingYear, setClass10PassingYear] = useState();
  const [class12Percentage, setClass12Percentage] = useState();
  const [class12PassingYear, setClass12PassingYear] = useState();

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
   
     

    useEffect(() => {
     
      const RetrieveProfile = async () => {
        const token = localStorage.getItem('token');
  
        if (!token) {
          // Handle token not found
          throw new Error('No token found');
        }
  
        try {
          const response = await axios.get('http://localhost:4000/auth/profileadd', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          const profileData = response.data;
  
          setName(profileData.name);
          setSurname(profileData.surname);
          setMobileNumber(profileData.mobileNumber);
          setAddressLine1(profileData.addressLine1);
          setAddressLine2(profileData.addressLine2);
          setPostcode(profileData.postcode);
          setState(profileData.state);
          setArea(profileData.area);
          setEmail(profileData.email);
          setEducation(profileData.education);
          setCountry(profileData.country);
          setStateRegion(profileData.stateRegion);
          setExperienceYears(profileData.experienceYears);
          setAdditionalDetails(profileData.additionalDetails);
          setCollegeName(profileData.collegeName);
          setCollegeCity(profileData.collegeCity);
          setDegree(profileData.degree);
          setDept(profileData.dept);
          setStartingYear(profileData.startingYear);
          setGraduatingYear(profileData.graduatingYear);
          setCGPA(profileData.cgpa);
          setHistoryOfArrears(profileData.historyOfArrears);
          setStandingArrears(profileData.standingArrears);
          setClass10Percentage(profileData.class10Percentage);
          setClass10PassingYear(profileData.class10PassingYear);
          setClass12Percentage(profileData.class12Percentage);
          setClass12PassingYear(profileData.class12PassingYear);
  
          setUser(profileData.user);
        } catch (error) {
          console.error(error);
          // Handle profile retrieval error
        }
      };
  
      RetrieveProfile();
    }, []);
    const adddetails=async() =>{
      const username=user.username;
      const email=user.email;
      try {
        const response = await axios.put('http://localhost:4000/auth/profileadd', {
          username,
          name,
          surname,
          mobileNumber,
          addressLine1,
          addressLine2,
          postcode,
          state,
          area,
          email,
          education,
          country,
          stateRegion,
          experienceYears,
          additionalDetails,
          collegeName,
          collegeCity,
          degree,
          dept,
          startingYear,
          graduatingYear,
          cgpa,
          historyOfArrears,
          standingArrears,
          class10Percentage,
          class10PassingYear,
          class12Percentage,
          class12PassingYear,
        });
  
        console.log(response.data.message);
        // Handle successful profile update
      } catch (error) {
        console.error(error);
        // Handle profile update error
      }
  };
    
    const handleSaveProfile = async () => {
      const username=user.username;
      const email=user.email;
     try {
        const response = await axios.post('http://localhost:4000/auth/profile', {
          username,
          name,
          surname,
          mobileNumber,
          addressLine1,
          addressLine2,
          postcode,
          state,
          area,
          email,
          education,
          country,
          stateRegion,
          experienceYears,
          additionalDetails,
          collegeName,
          collegeCity,
          degree,
          dept,
          startingYear,
          graduatingYear,
          cgpa,
          historyOfArrears,
          standingArrears,
          class10Percentage,
          class10PassingYear,
          class12Percentage,
          class12PassingYear,
          
        });
         console.log(response);
      }
      catch (error) {
        console.error(error);
        // Handle registration error
      }
      
    
    }
    
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
            <Link to="/dashboard" className="nav-item nav-link">Home</Link>
              
              <Link to="/showjobs" className="nav-item nav-link">Apply Job</Link>
             
             
              <Link to="/appliedjob" className="nav-item nav-link">Job applied by user</Link>
              <div className="nav-item dropdown">
              {user&&user.username&& <a className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">{user.username}</a>}
                      <div className="dropdown-menu rounded-0 m-0 active">
                          <Link to="/profileview" className="dropdown-item">ViewProfile</Link>
                          <Link to="/profileadd" className="dropdown-item active">UpdateProfile</Link>
                      </div>
                  </div>
           
              <Link to="/login" onClick={handleLogout} className="nav-item nav-link">Signout</Link>
            </div>
        </div>
    </nav>
    <div className="container rounded bg-white mt-5 mb-5">
    <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span className="font-weight-bold">{user.username}</span><span className="text-black-50">{user.email}</span><span> </span></div>
        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-12">
              <label className="labels">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phone number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="labels">Address Line 1</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter address line 1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="labels">Address Line 2</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter address line 2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="labels">Postcode</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="labels">State</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="labels">Area</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="labels">Email ID</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email ID"
                value={user.email}
              
              />
            </div>
            <div className="col-md-12">
              <label className="labels">Education</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <label className="labels">Country</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="labels">State/Region</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter state/region"
                value={stateRegion}
                onChange={(e) => setStateRegion(e.target.value)}
              />
            </div>
          </div>
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience">
              <span>
                <b>Experience</b>
              </span>
            </div>
            <br />
            <div className="col-md-12">
              <label className="labels">Experience (in years)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter experience"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
              />
            </div>
            <br />
            <div className="col-md-12">
              <label className="labels">Additional Details</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter additional details"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5 text-center">
            
            <button className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft" type="button" onClick={adddetails}>
              Add Profile
            </button>
            <button className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInRight" type="button" onClick={handleSaveProfile}>
              Save
            </button>
          </div>
        </div>
     
      <br />
      <br />
      <div className="col-md-4">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center experience">
            <span>
              <b>College</b>
            </span>
          </div>
          <br />
          <div className="col-md-12">
            <label className="labels">College name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter college name"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
            />
          </div>
          <br />
          <div className="col-md-12">
            <label className="labels">College city</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter college city"
              value={collegeCity}
              onChange={(e) => setCollegeCity(e.target.value)}
            />
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <label className="labels">Degree</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="labels">Department</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter department"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <label className="labels">Starting year</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter starting year"
                value={startingYear}
                onChange={(e) => setStartingYear(Number(e.target.value))}
              />
            </div>
            <div className="col-md-6">
              <label className="labels">Graduating year</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter graduating year"
                value={graduatingYear}
                onChange={(e) => setGraduatingYear(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="col-md-12">
            <label className="labels">C.G.P.A</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter C.G.P.A"
              value={cgpa}
              onChange={(e) => setCGPA(Number(e.target.value))}
            />
          </div>

          <br />
          <div className="col-md-12">
            <label className="labels">History of arrears (Provide 0 if there are no arrears)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter history of arrears"
              value={historyOfArrears}
              onChange={(e) => setHistoryOfArrears(Number(e.target.value))}
            />
          </div>
          <br />
          <div className="col-md-12">
            <label className="labels">Standing arrears (Provide 0 if there are no arrears)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter standing arrears"
              value={standingArrears}
              onChange={(e) => setStandingArrears(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center experience">
            <span>
              <b>School</b>
            </span>
          </div>
          <br />
          <div className="col-md-12">
            <label className="labels">Class 10 percentage</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter class 10 percentage"
              value={class10Percentage}
              onChange={(e) => setClass10Percentage(Number(e.target.value))}
            />
          </div>
          <br />
          <div className="col-md-12">
            <label className="labels">Class 10 passing year</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter class 10 passing year"
              value={class10PassingYear}
              onChange={(e) => setClass10PassingYear(Number(e.target.value))}
            />
          </div>
          <div className="col-md-12">
            <label className="labels">Class 12 percentage</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter class 12 percentage"
              value={class12Percentage}
              onChange={(e) => setClass12Percentage(Number(e.target.value))}
            />
          </div>
          <br />
          <div className="col-md-12">
            <label className="labels">Class 12 passing year</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter class 12 passing year"
              value={class12PassingYear}
              onChange={(e) => setClass12PassingYear(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
  </div>

  )
}

export default Profile;