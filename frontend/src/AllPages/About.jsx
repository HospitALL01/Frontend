import React from "react";

import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegClock, FaCalendarAlt } from "react-icons/fa";
import { FaTruckMedical } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

import doctorImage from "../assets/doctor.jpg";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <header
        className="hero-section-new"
        style={{ backgroundImage: `url(${doctorImage})` }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12}>
              <div className="hero-content">
                <div className="line-above-text"></div>
                <h1 className="display-3 fw-bold">
                  Find the Good Life <br />
                  With <span className="text-brand-green">Good Health.</span>
                </h1>
                <p className="lead text-muted my-4">
                  "Hospitals are not just centers of treatment—they are
                  sanctuaries of hope. Within these doors, we fight illness with
                  knowledge, we fight pain with compassion, and we fight despair
                  with trust. Because every life is precious, and every story
                  deserves a chance to heal."
                </p>
                <Link to="/find-doctors" className="btn btn-brand-green btn-lg">
                  Make Appointment &gt;
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      {/* ✅ 2. RESTORED: Main Content with all card sections */}
      <main className="about-section-bg">
        {/* Our Services Section */}
        <section className="py-5">
          <Container>
            <Row>
              <Col md={4} className="mb-4">
                <Card className="info-card h-100 text-center">
                  <Card.Body className="p-4">
                    <h3 className="fw-bold">Comprehensive Medical Services</h3>
                    <p className="text-muted">
                      We offer a wide range of services, including cardiology,
                      neurology, orthopedics, pediatrics, and more. Our team of
                      experts uses the latest technology and treatment methods.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="info-card h-100 text-center">
                  <Card.Body className="p-4">
                    <h3 className="fw-bold">24/7 Emergency Care</h3>
                    <p className="text-muted">
                      Our emergency department is open 24/7, ensuring that
                      urgent medical needs are met promptly with highly skilled
                      professionals and state-of-the-art facilities.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="info-card h-100 text-center">
                  <Card.Body className="p-4">
                    <h3 className="fw-bold">Advanced Diagnostic Services</h3>
                    <p className="text-muted">
                      We provide cutting-edge diagnostic services, including
                      imaging, lab tests, and advanced procedures to accurately
                      diagnose and treat various conditions.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Benefits for Patients Section */}
        <section className="py-5">
          <Container>
            <Card className="info-card">
              <Card.Body className="p-4 p-md-5">
                <h2 className="fw-bold mb-4">Benefits for Patients</h2>
                <ul className="benefits-list">
                  <li>
                    <strong>Easy Access:</strong> Book appointments, consult
                    with doctors, and manage healthcare from the comfort of your
                    home.
                  </li>
                  <li>
                    <strong>Expert Care:</strong> Access a team of experienced
                    doctors across various specialties.
                  </li>
                  <li>
                    <strong>Timely Treatment:</strong> Fast-track your treatment
                    through our efficient online appointment and consultation
                    system.
                  </li>
                  <li>
                    <strong>Health Records:</strong> Keep track of your medical
                    history and treatments in one secure location.
                  </li>
                  <li>
                    <strong>Community Support:</strong> Join our online support
                    groups and health forums to share experiences and learn from
                    others.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Container>
        </section>

        {/* Our Future Vision Section */}
        <section className="py-5">
          <Container>
            <Card className="info-card">
              <Card.Body className="p-4 p-md-5">
                <h2 className="text-center fw-bold mb-4">Our Future Vision</h2>
                <p className="lead text-center text-muted">
                  "Hospitals are not just centers of treatment—they are
                  sanctuaries of hope. Within these doors, we fight illness with
                  knowledge, we fight pain with compassion, and we fight despair
                  with trust. Because every life is precious, and every story
                  deserves a chance to heal."
                </p>
              </Card.Body>
            </Card>
          </Container>
        </section>
      </main>

      {/* Purple Appointment Banner at the end of the page */}
      <section className="appointment-banner">
        <Container>
          <Row className="align-items-center">
            {/* Working Time */}
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

            {/* Timetable */}
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

            {/* Emergency Cases */}
            <Col lg={3} md={6} className="mb-4 mb-md-0">
              <Link to="/emergency" className="emergency-link">
                <FaTruckMedical className="banner-icon-small" />
                For emergency cases &gt;
              </Link>
            </Col>

            {/* Make Appointment Button */}
            <Col lg={3} md={6} className="text-md-end">
              <Link to="/find-doctors" className="btn btn-brand-green btn-lg">
                Make Appointment &gt;
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;
