import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/Footer.css";


const Footer = () => {
  return (
    <footer>
     
      <div className="row primary">
        <div className="column about">
          <h3>Interview Door</h3>
          <p>
           It is an application which allows user to apply for the various top mnc 
           companies and submit their resume.So that admin can receive the application
           and shortlise the Resume 
          </p>
        </div>
        <div className="column links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#faq">F.A.Q</a>
            </li>
            <li>
              <a href="#cookies-policy">Cookies Policy</a>
            </li>
            <li>
              <a href="#terms-of-services">Terms Of Service</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
          </ul>
        </div>
        <div className="column subscribe">
          <h3>Follow me on social media</h3>
          <center><p>Social Media Links</p></center>
          <div className="social">
            <i className="fab fa-github-square"></i>
            <i className="fab fa-yahoo-square"></i>
            <i className="fab fa-linkedin-square"></i>
          </div>
        </div>
      </div>
    
       <center> <p>copyrights &copy; vr008 | All Rights Reserved</p></center>

    </footer>
  );
};

export default Footer;
