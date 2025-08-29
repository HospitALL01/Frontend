import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaStar,
  FaMapMarkerAlt,
  FaBriefcase,
  FaRegClock,
  FaCheckCircle,
} from "react-icons/fa";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { doctors } from "../data/doctors";

const DoctorCard = ({ doctor }) => (
  <div className="col-lg-4 col-md-6 mb-4">
    <div className="card h-100 shadow-sm border-0 doctor-card">
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-4">
          {/* Image Placeholder */}
          <div className="doctor-img-placeholder me-3">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="#e9ecef">
              <path d="M50,10A40,40,0,1,1,10,50,40,40,0,0,1,50,10M50,0A50,50,0,1,0,100,50,50,50,0,0,0,50,0Z" />
              <path d="M50,60A20,20,0,1,1,70,40,20,20,0,0,1,50,60Z" />
              <path d="M50,70A30,30,0,0,1,20,100H80A30,30,0,0,1,50,70Z" />
            </svg>
          </div>
          <div>
            <h5 className="card-title fw-bold mb-1">{doctor.name}</h5>
            <p className="text-primary fw-semibold mb-2">{doctor.specialty}</p>
            <div className="d-flex align-items-center text-warning">
              <FaStar className="me-1" />
              <span className="fw-bold">{doctor.rating}</span>
              <span className="text-muted ms-1">
                ({doctor.reviewsCount} reviews)
              </span>
            </div>
          </div>
          {doctor.verified && (
            <span className="badge bg-success-soft text-success verified-badge">
              <FaCheckCircle className="me-1" /> Verified
            </span>
          )}
        </div>

        <div className="info-section">
          <p className="text-muted d-flex align-items-center mb-2">
            <FaMapMarkerAlt className="me-2 text-secondary" /> {doctor.location}
          </p>
          <p className="text-muted d-flex align-items-center mb-3">
            <FaBriefcase className="me-2 text-secondary" /> {doctor.experience}
          </p>
        </div>

        <div className="availability-section mb-4">
          <p className="fw-semibold d-flex align-items-center">
            <FaRegClock className="me-2 text-success" /> {doctor.availability}
          </p>
        </div>

        <div className="d-grid gap-2 d-sm-flex">
          {/* ✅ MODIFIED: The "Book Now" button now links directly to the booking page */}
          <Link
            to="/book-now"
            state={{ doctor: doctor }} // Pass the doctor object in the state
            className="btn btn-primary flex-grow-1"
          >
            Book Now
          </Link>

          {/* This button still correctly links to the detailed profile page */}
          <Link
            to={`/doctor/${doctor.id}`}
            className="btn btn-outline-secondary flex-grow-1"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default function AppointmentBooking() {
  return (
    <>
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">Featured Doctors</h1>
          <p className="lead text-muted">
            Connect with our highly-rated specialists and book appointments with
            ease.
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="row">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* View All Doctors Button */}
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary btn-lg px-5">
            View All Doctors
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
