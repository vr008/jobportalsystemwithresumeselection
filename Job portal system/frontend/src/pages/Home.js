
import '../App.css';
import imag from './img/login.jpg'

import { Link } from 'react-router-dom';
import Footer from './Footer';
function Home() {
  
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
                    <Link to="/" className="nav-item nav-link active">Home</Link>
                    
                   
                    <Link to="/login" className="nav-item nav-link">Login</Link>
                    <Link to="/register" className="nav-item nav-link">Register</Link>
                    <Link to="/adminlogin" className="nav-item nav-link">AdminLogin</Link>
                </div>
            </div>
        </nav>

        <div className="container-fluid p-0">
            <div className="owl-carousel header-carousel position-relative">
                <div className="owl-carousel-item position-relative">
                    <img className="img-fluid" src={imag} alt=""/>
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center comp">
                        <div className="container">
                            <div className="row justify-content-start">
                                <div className="col-10 col-lg-8">
                                    <h1 className="display-3 text-white animated slideInDown mb-4">This the Best Place to find the job</h1>
                                    <p className="fs-5 fw-medium text-white mb-4 pb-2">Find the best job that fits You</p>
                                    
                                    
                                  
                                    
                                <Link to="/login" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Login</Link>
                                
                                    
                                
                                <Link to="/register" className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Register</Link>
                                
                                
                                   

                            </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>

            








        <a className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
        <Footer></Footer>
    </div>   


  );
  
}


export default Home;