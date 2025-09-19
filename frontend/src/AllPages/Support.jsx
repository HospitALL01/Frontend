import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaUserMd,
  FaStethoscope,
  FaHeartbeat,
  FaBrain,
  FaQuoteLeft,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

// Import your two images
import supportPersonImage from "../assets/amisiam.jpg";
import supportHeaderImage from "../assets/nice.jpg";

const Support = () => {
  return (
    <div>
      {/* New Header Section */}
      <header
        className="page-header-new text-center text-white"
        style={{ backgroundImage: `url(${supportHeaderImage})` }}
      >
        <Container>
          <h1 className="display-4 fw-bold">Professional Healthcare</h1>
          <p className="lead col-lg-8 mx-auto">
            As the leading expert in everything concerning medical treatment I'm
            glad to offer you my help.
          </p>
          <Button variant="primary" className="read-more-btn-teal-filled">
            READ MORE
          </Button>
        </Container>
      </header>
      {/* "About Me" and other sections wrapper */}
      <div className="support-page-new">
        <section className="about-me-section py-5">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="mb-4 mb-lg-0">
                <div className="about-me-card">
                  <div className="experience-badge">18 years of experience</div>
                  <FaQuoteLeft className="quote-icon" />
                  <h2 className="fw-bold">About Us</h2>
                  <p className="lead">
                    Welcome to our hospital’s official website. We are committed
                    to providing compassionate care, advanced medical services,
                    and a safe environment for every patient. Our team of
                    skilled doctors, nurses, and healthcare professionals work
                    together to ensure the highest quality treatment and
                    support. Through this website, you can learn about our
                    services, facilities, and patient care programs designed to
                    meet your health needs with trust and excellence.
                  </p>
                  <p className="text-muted">
                    Our hospital is dedicated to providing quality healthcare
                    with compassion, trust, and modern medical services for
                    every patient.
                  </p>
                  <Button
                    variant="outline-primary"
                    className="read-more-btn-teal"
                  >
                    READ ABOUT US
                  </Button>
                </div>
              </Col>
              <Col lg={6}>
                <div className="support-image-container">
                  <img
                    src={supportPersonImage}
                    alt="Dr. Jane Wilson"
                    className="img-fluid"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* "I Offer Services That Work" Section */}
        <section className="services-section py-5">
          <Container>
            <h2 className="text-center fw-bold mb-5 section-heading-dark">
              We Offer Services That Work
            </h2>
            <Row>
              <Col md={6} lg={3} className="mb-4">
                <div className="service-item">
                  <FaUserMd className="service-icon" />
                  <h5 className="fw-bold mt-3">Dietary Counseling</h5>
                  <p className="text-muted">
                    Dietary Counseling service is available to people who have
                    been diagnosed by a professional with a long-term health
                    condition requiring dietary changes.
                  </p>
                  <a href="#" className="read-more-link">
                    READ MORE
                  </a>
                </div>
              </Col>
              <Col md={6} lg={3} className="mb-4">
                <div className="service-item">
                  <FaStethoscope className="service-icon" />
                  <h5 className="fw-bold mt-3">Health Education</h5>
                  <p className="text-muted">
                    Health Education is a service providing my clients with a
                    deeper and better understanding about how their body works,
                    which can be useful for everyone.
                  </p>
                  <a href="#" className="read-more-link">
                    READ MORE
                  </a>
                </div>
              </Col>
              <Col md={6} lg={3} className="mb-4">
                <div className="service-item">
                  <FaHeartbeat className="service-icon" />
                  <h5 className="fw-bold mt-3">Sports Medicine</h5>
                  <p className="text-muted">
                    My services are not limited to families only. I also offer
                    medical help to athletes. If you have an injury caused by
                    playing sports, I will be glad to help you.
                  </p>
                  <a href="#" className="read-more-link">
                    READ MORE
                  </a>
                </div>
              </Col>
              <Col md={6} lg={3} className="mb-4">
                <div className="service-item">
                  <FaBrain className="service-icon" />
                  <h5 className="fw-bold mt-3">Stress Testing</h5>
                  <p className="text-muted">
                    Stress Tests can provide useful information about the
                    current state of your body and mind. So, they may get used
                    as a diagnostic tool for your future treatment.
                  </p>
                  <a href="#" className="read-more-link">
                    READ MORE
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Statistics Banner Section */}
        <section className="stats-banner text-center text-white">
          <Container>
            <Row>
              <Col md={6} lg={3} className="mb-4 mb-lg-0">
                <h2 className="display-4 fw-bold">19</h2>
                <p className="lead">Years of experience</p>
              </Col>
              <Col md={6} lg={3} className="mb-4 mb-lg-0">
                <h2 className="display-4 fw-bold">236</h2>
                <p className="lead">Consultations</p>
              </Col>
              <Col md={6} lg={3} className="mb-4 mb-lg-0">
                <h2 className="display-4 fw-bold">78</h2>
                <p className="lead">Monthly publications</p>
              </Col>
              <Col md={6} lg={3}>
                <h2 className="display-4 fw-bold">5469</h2>
                <p className="lead">Happy patients</p>
              </Col>
            </Row>
          </Container>
        </section>
      </div>{" "}
      {/* ✅ THIS IS THE MISSING CLOSING TAG */}
    </div>
  );
};

export default Support;
