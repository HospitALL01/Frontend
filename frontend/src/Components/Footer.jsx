import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// ✅ 1. CORRECTED IMPORTS: Icons are now imported from their correct packages.
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaRegClock,
  FaCalendarAlt, // This icon is in 'fa'
} from "react-icons/fa";

import { FaTruckMedical } from "react-icons/fa6"; // This icon is in 'fa6'

import "../index.css";

export default function Footer() {
  return (
    // The main footer container now has the 'appointment-banner' class for the purple background
    <footer className="appointment-banner main-footer">
      <Container>
        {/* Top Section (from the old banner) */}
        <Row className="align-items-center pre-footer-section">
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <div className="d-flex align-items-center">
              <FaRegClock className="banner-icon" />
              <div>
                <h5 className="text-white mb-1">Working Time</h5>
                <p className="text-white-50 mb-0">Monday - Friday</p>
                <p className="text-white-50 mb-0">8:00 - 17:00</p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <div className="d-flex align-items-center">
              <FaCalendarAlt className="banner-icon" />
              <div>
                <h5 className="text-white mb-1">Working Time</h5>
                <p className="text-white-50 mb-1">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </p>
                <a href="#" className="btn btn-sm btn-light-outline">
                  View Timetable &gt;
                </a>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <Link to="/emergency" className="emergency-link">
              <FaTruckMedical className="banner-icon-small" />
              For emergency cases &gt;
            </Link>
          </Col>
          <Col lg={3} md={6} className="text-md-end">
            <Link to="/find-doctors" className="btn btn-brand-green btn-lg">
              Make Appointment &gt;
            </Link>
          </Col>
        </Row>

        <hr className="footer-divider" />

        {/* Bottom Section (your original footer content) */}
        <Row className="text-center text-md-start">
          <Col md={3} lg={3} xl={3} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-brand-green-light">
              HospitALL
            </h5>
            <p className="text-white-50">
              Connecting patients with healthcare professionals through
              AI-powered chatbot assistance, appointment booking, and emergency
              services.
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
          </Col>

          <Col md={2} lg={2} xl={2} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Quick Links</h5>
            <p>
              <Link to="/find-doctors" className="footer-link">
                Find Doctors
              </Link>
            </p>
            <p>
              <Link to="/book-now" className="footer-link">
                Book Appointment
              </Link>
            </p>
            <p>
              <Link to="/ai" className="footer-link">
                AI Chatbot
              </Link>
            </p>
            <p>
              <Link to="/emergency" className="footer-link">
                Emergency Services
              </Link>
            </p>
          </Col>

          <Col md={3} lg={2} xl={2} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">For Providers</h5>
            <p>
              <a href="#" className="footer-link">
                Doctor Registration
              </a>
            </p>
            <p>
              <a href="#" className="footer-link">
                Hospital Partnership
              </a>
            </p>
            <p>
              <a href="#" className="footer-link">
                Support Center
              </a>
            </p>
          </Col>

          <Col md={4} lg={3} xl={3} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Contact Us</h5>
            <p className="text-white-50 d-flex align-items-center justify-content-center justify-content-md-start">
              <FaPhone className="me-3" /> +1 (555) 123-4567
            </p>
            <p className="text-white-50 d-flex align-items-center justify-content-center justify-content-md-start">
              <FaEnvelope className="me-3" /> support@hospital.com
            </p>
            <p className="text-white-50 d-flex align-items-center justify-content-center justify-content-md-start">
              <FaMapMarkerAlt className="me-3" /> 123 Healthcare Plaza
            </p>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-start text-white-50 mb-0">
              © 2025 HospitALL. All rights reserved.
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <a href="#" className="footer-link me-3">
                Privacy Policy
              </a>
              <a href="#" className="footer-link me-3">
                Terms of Service
              </a>
              <a href="#" className="footer-link">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
