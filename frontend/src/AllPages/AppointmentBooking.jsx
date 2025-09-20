import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaBriefcase,
  FaRegClock,
  FaBell, // Import bell icon
} from "react-icons/fa";
import "../index.css";

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function AppointmentBooking() {
  const [accepted, setAccepted] = useState([]);
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // State for notifications
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("adm_accept");
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setAccepted(parsed);
      else setAccepted([]);
    } catch {
      setAccepted([]);
    }
  }, []);

  // Handle the "View More" and "Show Less" button click
  const handleToggleDoctors = () => {
    setShowAllDoctors(!showAllDoctors);
  };

  // Toggle notification visibility
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="container py-5">
      {/* Notification Bell + Dropdown */}
      <div className="position-absolute" style={{ right: "50px", top: "50px" }}>
        <div className="position-relative">
          <button
            className="btn btn-light"
            onClick={toggleNotifications}
            style={{
              fontSize: "22px",
              color: "#22034bff",
              backgroundColor: "transparent",
              border: "none",
              transition: "transform 0.3s ease",
            }}
          >
            <FaBell />
          </button>

          {showNotifications && (
            <div
              className="card shadow-lg position-absolute"
              style={{
                width: "350px",
                top: "100%", // directly below bell
                right: "0",
                marginTop: "10px",
                zIndex: 10,
              }}
            >
              <div className="card-header bg-primary text-white">
                <h5>Notifications</h5>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  {/* Sample Notifications */}
                  <li className="d-flex justify-content-between align-items-center py-2">
                    <p className="mb-0">
                      New appointment booked with Dr. Smith
                    </p>
                    <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                      Just now
                    </span>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2">
                    <p className="mb-0">Dr. Lee updated availability</p>
                    <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                      2 hours ago
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">Featured Doctors</h1>
      </div>

      <div className="row">
        {accepted.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">
              Doctors are not available right now. Please check back later.
            </div>
          </div>
        ) : (
          (showAllDoctors ? accepted : accepted.slice(0, 3)).map((doctor) => (
            <div
              className="col-lg-4 col-md-6 mb-4"
              key={doctor._raw?.email || doctor.id}
            >
              <div className="card h-100 shadow-sm border-0 doctor-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    {/* Image Placeholder */}
                    <div className="doctor-img-placeholder me-3">
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 100 100"
                        fill="#e9ecef"
                      >
                        <path d="M50,10A40,40,0,1,1,10,50,40,40,0,0,1,50,10M50,0A50,50,0,1,0,100,50,50,50,0,0,0,50,0Z" />
                        <path d="M50,60A20,20,0,1,1,70,40,20,20,0,0,1,50,60Z" />
                        <path d="M50,70A30,30,0,0,1,20,100H80A30,30,0,0,1,50,70Z" />
                      </svg>
                    </div>

                    <div className="flex-grow-1">
                      <h5 className="card-title fw-bold mb-1">
                        {doctor.doctorName}
                      </h5>
                      <p className="text-primary fw-semibold mb-2">
                        {doctor.specialization}
                      </p>
                      <div className="d-flex align-items-center text-warning">
                        <FaStar className="me-1" />
                        <span className="fw-bold">{doctor.rating || 4.9}</span>
                        <span className="text-muted ms-1">
                          ({doctor.reviewsCount || 0} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  <div className="verified-badge position-absolute top-0 end-0 m-3">
                    <span className="badge bg-success">Verified</span>
                  </div>

                  <div className="info-section">
                    <p className="text-muted d-flex align-items-center mb-2">
                      <FaMapMarkerAlt className="me-2 text-secondary" />{" "}
                      {doctor.hospitalName || "Not specified"}
                    </p>
                    <p className="text-muted d-flex align-items-center mb-3">
                      <FaBriefcase className="me-2 text-secondary" />{" "}
                      {doctor.yearsOfExperience + " years experience"}
                    </p>
                  </div>

                  <div className="availability-section mb-4">
                    <p className="fw-semibold d-flex align-items-center">
                      <FaRegClock className="me-2 text-success" />{" "}
                      {doctor.availability || "Available Today"}
                    </p>
                  </div>

                  <div className="d-grid gap-2 d-sm-flex">
                    {/* Book Now Button */}
                    <button
                      className="btn btn-primary flex-grow-1"
                      onClick={() => {
                        navigate("/book-now", { state: { doctor } });
                      }}
                    >
                      Book Now
                    </button>

                    {/* View Profile Link */}
                    <Link
                      to={`/doctor/${doctor._raw?.email}`} // Use email as part of the URL
                      state={{ doctor }} // Passing doctor data as state
                      className="btn btn-outline-secondary flex-grow-1"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View More / Show Less Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-primary btn-lg px-5"
          onClick={handleToggleDoctors}
        >
          {showAllDoctors ? "Show Less" : "View More"}
        </button>
      </div>
    </div>
  );
}
