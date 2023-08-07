import React, { useState, useEffect, useHistory } from 'react';
import './css/profile.css';
import imag from './img/carousel-2.jpg';
import img1 from './img/about-1.jpg';
import img2 from './img/about-2.jpg';
import img3 from './img/about-3.jpg';
import img4 from './img/about-4.jpg';
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from './Footer';
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
                      <div className="dropdown-menu rounded-0 m-0">
                          <Link to="/profileview" className="dropdown-item active">ViewProfile</Link>
                          <Link to="/profileadd" className="dropdown-item">UpdateProfile</Link>
                      </div>
                  </div>
           
              <Link to="/login" onClick={handleLogout} className="nav-item nav-link">Signout</Link>
            </div>
        </div>
    </nav>
    <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
              <span className="font-weight-bold">{user.username}</span>
              <span className="text-black-50">{user.email}</span>
            </div>
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
                    placeholder="first name"
                    value={name}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="surname"
                    value={surname}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value={mobileNumber}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 1"
                    value={addressLine1}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    value={addressLine2}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Postcode</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter postcode"
                    value={postcode}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter state"
                    value={state}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Area</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter area"
                    value={area}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter email id"
                    value={email}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Education</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="education"
                    value={education}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    value={country}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">State/Region</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="state/region"
                    value={stateRegion}
                  />
                </div>
              </div>
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience">
                  <span><b>Experience</b></span>
                </div>
                <br />
                <div className="col-md-12">
                  <label className="labels">Experience (in years)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="experience"
                    value={experienceYears}
                  />
                </div>
                <br />
                <div className="col-md-12">
                  <label className="labels">Additional Details</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="additional details"
                    value={additionalDetails}
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft" type="button">
                <Link to="/profileadd" className="tex">updateProfile</Link>
                </button>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span><b>College</b></span>
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">College name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="college name"
                  value={collegeName}
                />
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">College city</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="college city"
                  value={collegeCity}
                />
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Degree</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="degree"
                    value={degree}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Dept</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="dept"
                    value={dept}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Starting year</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="starting year"
                    value={startingYear}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Graduating year</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="graduating year"
                    value={graduatingYear}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <label className="labels">C.G.P.A</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="C.G.P.A"
                  value={cgpa}
                />
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">History of arrears (Provide 0 if there are no arrears)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="history of arrears"
                  value={historyOfArrears}
                />
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Standing arrears (Provide 0 if there are no arrears)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="standing arrears"
                  value={standingArrears}
                />
              </div>
              <br />
            </div>
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span><b>School</b></span>
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Class 10 percentage</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="class 10 percentage"
                  value={class10Percentage}
                />
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Passing year</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="passing year"
                  value={class10PassingYear}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Class 12 percentage</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="class 12 percentage"
                  value={class12Percentage}
                />
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Passing year</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="passing year"
                  value={class12PassingYear}
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