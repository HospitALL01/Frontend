import React from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
// 1. Import NavLink for proper navigation
import { NavLink, Link } from "react-router-dom";
import "../index.css"; // 👈 Custom CSS import

function Navbar({ user, onLogout }) {
  // We don't need useNavigate for the links anymore, but we can keep it for the buttons if needed.
  // For this setup, Link/NavLink is cleaner.

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
      {/* Logo - Use Link for navigation */}
      <Link
        className="navbar-brand fw-bold text-primary d-flex align-items-center btn btn-link p-0"
        to="/home"
      >
        <FaHeart className="me-2 text-primary" />
        HospitALL
      </Link>

      {/* Mobile toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Nav Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item mx-2">
            <NavLink className="nav-link nav-link-custom" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            {/* 2. ✅ CORRECTED: Changed path from "/doctors" to "/find-doctors" and used NavLink */}
            <NavLink className="nav-link nav-link-custom" to="/find-doctors">
              Find Doctors
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink className="nav-link nav-link-custom" to="/hospitals">
              Hospitals
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink className="nav-link nav-link-custom" to="/ai">
              AI Chatbot
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink className="nav-link nav-link-custom" to="/emergency">
              Emergency
            </NavLink>
          </li>
        </ul>

        {/* Right Side Buttons */}
        <div className="d-flex align-items-center">
          {!user ? (
            <>
              {/* Use Link for login/signup as they are navigation actions */}
              <Link
                to="/login"
                className="btn btn-outline-dark btn-sm me-2 d-flex align-items-center"
              >
                <FaUser className="me-1" /> Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary btn-sm d-flex align-items-center"
              >
                <FaUser className="me-1" /> Sign Up
              </Link>
            </>
          ) : (
            // Logout is an action, so a <button> is correct here
            <button
              onClick={onLogout}
              className="btn btn-danger btn-sm d-flex align-items-center"
            >
              <FaUser className="me-1" /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
