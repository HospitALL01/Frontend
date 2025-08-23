import React from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../index.css"; // 👈 Custom CSS import

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
      {/* Logo */}
      <button
        className="navbar-brand fw-bold text-primary d-flex align-items-center btn btn-link p-0"
        onClick={() => navigate("/home")}
      >
        <FaHeart className="me-2 text-primary" />
        HospitALL
      </button>

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
            <button
              className="nav-link btn btn-link nav-link-custom"
              onClick={() => navigate("/home")}
            >
              Home
            </button>
          </li>
          <li className="nav-item mx-2">
            <button
              className="nav-link btn btn-link nav-link-custom"
              onClick={() => navigate("/doctors")}
            >
              Find Doctors
            </button>
          </li>
          <li className="nav-item mx-2">
            <button
              className="nav-link btn btn-link nav-link-custom"
              onClick={() => navigate("/hospitals")}
            >
              Hospitals
            </button>
          </li>
          <li className="nav-item mx-2">
            {/* ✅ navigate to /ai */}
            <button
              className="nav-link btn btn-link nav-link-custom"
              onClick={() => navigate("/ai")}
            >
              AI Chatbot
            </button>
          </li>
          <li className="nav-item mx-2">
            <button
              className="nav-link btn btn-link nav-link-custom"
              onClick={() => navigate("/emergency")}
            >
              Emergency
            </button>
          </li>
        </ul>

        {/* Right Side Buttons */}
        <div className="d-flex">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-outline-dark btn-sm me-2 d-flex align-items-center"
              >
                <FaUser className="me-1" /> Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="btn btn-primary btn-sm d-flex align-items-center"
              >
                <FaUser className="me-1" /> Sign Up
              </button>
            </>
          ) : (
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
