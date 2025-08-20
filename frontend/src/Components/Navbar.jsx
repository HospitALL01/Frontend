import React from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className='navbar navbar-expand-lg bg-white shadow-sm px-4'>
      {/* Logo */}
      <a className='navbar-brand fw-bold text-primary d-flex align-items-center' href='#'>
        <FaHeart className='me-2 text-primary' />
        HospitALL
      </a>

      {/* Mobile toggle */}
      <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
        <span className='navbar-toggler-icon'></span>
      </button>

      {/* Nav Links */}
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav mx-auto'>
          <li className='nav-item mx-2'>
            <a className='nav-link active text-primary' href='#'>
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

        {/* Right Side Buttons */}
        <div className='d-flex'>
          <button onClick={() => navigate("/login")} className='btn btn-outline-dark me-2 d-flex align-items-center'>
            <FaUser className='me-1' /> Login
          </button>
          <button onClick={() => navigate("/signup")} className='btn btn-primary d-flex align-items-center'>
            <FaUser className='me-1' /> Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
