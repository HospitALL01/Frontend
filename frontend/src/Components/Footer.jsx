import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-primary">
              HospitALL
            </h5>
            <p>
              Connecting patients with healthcare professionals through
              AI-powered chatbot assistance, appointment booking, and emergency
              services - all in one comprehensive platform.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-4">
              <a href="#" className="text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-white">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Quick Links</h5>
            <p>
              <a
                href="/find-doctors"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Find Doctors
              </a>
            </p>
            <p>
              <a
                href="#"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Book Appointment
              </a>
            </p>
            <p>
              <a
                href="/ai"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                AI Chatbot
              </a>
            </p>
            <p>
              <a
                href="#"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Emergency Services
              </a>
            </p>
            <p>
              <a
                href="#"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Hospital Directory
              </a>
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">For Providers</h5>
            <p>
              <a
                href="#"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Doctor Registration
              </a>
            </p>
            <p>
              <a
                href="#"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Hospital Partnership
              </a>
            </p>
            <p>
              <a
                href="#"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Manage Appointments
              </a>
            </p>
            <p>
              <a
                href="#"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Analytics Dashboard
              </a>
            </p>
            <p>
              <a
                href="#"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Support Center
              </a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Contact Us</h5>
            <p>
              <FaPhone className="me-3" /> +1 (555) 123-4567
            </p>
            <p>
              <FaEnvelope className="me-3" /> support@hospital.com
            </p>
            <p>
              <FaMapMarkerAlt className="me-3" /> 123 Healthcare Plaza, Medical
              District, MD 12345
            </p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p>© 2025 HospitALL. All rights reserved.</p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <a
                href="#"
                className="text-white me-3"
                style={{ textDecoration: "none" }}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white me-3"
                style={{ textDecoration: "none" }}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
