import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaHeart, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Needed for dropdowns

function Navbar({ user, onLogout }) {
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
      <Link className="navbar-brand fw-bold text-primary d-flex align-items-center" to="/">
        <FaHeart className="me-2 text-primary" />
        HospitALL
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          {/* Guest links (visible when logged out) */}
          {!user && (
            <>
              <li className="nav-item mx-2"><NavLink className="nav-link nav-link-custom" to="/about">About</NavLink></li>
              <li className="nav-item mx-2"><NavLink className="nav-link nav-link-custom" to="/blogs">Blogs</NavLink></li>
              <li className="nav-item mx-2"><NavLink className="nav-link nav-link-custom" to="/support">Support</NavLink></li>
            </>
          )}

          {/* Admin link */}
          {role === "Admin" && (
            <li className="nav-item mx-2"><NavLink className="nav-link" to="/admin-dashboard">Admin Dashboard</NavLink></li>
          )}

          {/* Patient links (visible when logged in as Patient) */}
          {user && role === "Patient" && (
            <>
              <li className="nav-item mx-2"><NavLink className="nav-link nav-link-custom" to="/home">Home</NavLink></li>
              <li className="nav-item mx-2"><NavLink className="nav-link nav-link-custom" to="/find-doctors">Find Doctors</NavLink></li>
              <li className="nav-item mx-2"><NavLink className="nav-link nav-link-custom" to="/hospitals">Hospitals</NavLink></li>
              <li className="nav-item mx-2"><NavLink className="nav-link nav-link-custom" to="/emergency">Emergency</NavLink></li>
              <li className="nav-item mx-2"><NavLink className="nav-link nav-link-custom" to="/ai">AI Chatbot</NavLink></li>
            </>
          )}

          {/* Doctor links (visible when logged in as Doctor) */}
          {user && role === "Doctor" && (
            <>
              <li className="nav-item mx-2"><NavLink className="nav-link nav-link-custom" to="/appointments">Appointments</NavLink></li>
              <li className="nav-item mx-2"><NavLink className="nav-link nav-link-custom" to="/profile_doctor">Profile</NavLink></li>
              <li className="nav-item mx-2"><NavLink className="nav-link nav-link-custom" to="/support">Support</NavLink></li>
            </>
          )}
        </ul>

        <div className="d-flex align-items-center">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline-dark btn-sm me-2 d-flex align-items-center"><FaUser className="me-1" /> Login</Link>
              <Link to="/signup" className="btn btn-primary btn-sm d-flex align-items-center"><FaUser className="me-1" /> Sign Up</Link>
            </>
          ) : (
            <button onClick={onLogout} className="btn btn-danger btn-sm d-flex align-items-center"><FaUser className="me-1" /> Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;