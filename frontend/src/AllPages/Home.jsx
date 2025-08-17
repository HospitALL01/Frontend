import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import brainImage from "../assets/brain.avif";

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className='navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4'>
        <a className='navbar-brand fw-bold text-primary' href='#'>
          ❤ HospitALL
        </a>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item mx-2'>
              <a className='nav-link' href='#'>
                Home
              </a>
            </li>
            <li className='nav-item mx-2'>
              <a className='nav-link' href='#'>
                Find Doctors
              </a>
            </li>
            <li className='nav-item mx-2'>
              <a className='nav-link' href='#'>
                Hospitals
              </a>
            </li>
            <li className='nav-item mx-2'>
              <a className='nav-link' href='#'>
                AI Chatbot
              </a>
            </li>
            <li className='nav-item mx-2'>
              <a className='nav-link' href='#'>
                Emergency
              </a>
            </li>
          </ul>
          <div className='ms-3'>
            <button className='btn btn-outline-primary me-2'>Login</button>
            <button className='btn btn-primary'>Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className='container py-5'>
        <div className='row align-items-center'>
          {/* Left side */}
          <div className='col-md-6'>
            <h1 className='fw-bold display-5'>
              Welcome to <span className='text-primary'>HospitALL</span> <br />
              Your Complete Healthcare Solution
            </h1>
            <p className='mt-3 text-muted'>
              Connect with top doctors, chat with our AI assistant for health guidance, and access emergency services
              all in one comprehensive platform.
            </p>
            <div className='d-flex flex-wrap gap-2 mt-4'>
              <button className='btn btn-primary'>🔍 Find a Doctor</button>
              <button className='btn btn-outline-primary'>📅 Book Appointment</button>
              <button className='btn btn-success'>💬 AI Chatbot</button>
              <button className='btn btn-danger'>📞 Emergency</button>
            </div>
            <div className='d-flex gap-4 mt-4 text-muted'>
              <span>✅ 500+ Doctors</span>
              <span>🏥 50+ Hospitals</span>
              <span>🤖 AI-Powered Chatbot</span>
            </div>
          </div>

          {/* Right side image */}
          <div className='col-md-6 text-center mt-4 mt-md-0'>
            <div className='card shadow-lg border-0'>
              <img src={brainImage} className='card-img-top' alt='Brain Model' />
              <div className='position-absolute bottom-0 end-0 bg-primary text-white px-3 py-1 rounded'>
                24/7 Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
