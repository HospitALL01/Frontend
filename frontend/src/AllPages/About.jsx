import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import "../index.css"; // Ensure the correct path to the CSS file

const About = () => {
  const [showModal, setShowModal] = useState(false);

  const features = [
    {
      title: "Hospital Section",
      description:
        "Our hospital section provides in-depth information about each department, the services offered, and the medical staff, so patients can make informed decisions.",
    },
    {
      title: "AI Bot",
      description:
        "Our AI-powered chatbot assists patients in booking appointments, finding information, and providing general healthcare advice around the clock.",
    },
    {
      title: "Emergency Services",
      description:
        "With our emergency services section, patients can access immediate help, find emergency contact numbers, and get location-based assistance.",
    },
    {
      title: "Search Specialist Doctors by Rating",
      description:
        "Our website allows patients to search for specialist doctors by rating, ensuring they can find the best doctors based on patient feedback and expertise.",
    },
    {
      title: "Telemedicine Services",
      description:
        "Patients can consult doctors remotely through our telemedicine feature, eliminating the need for in-person visits in many cases.",
    },
    {
      title: "Health Records Management",
      description:
        "Patients can manage their health records securely and track their medical history over time. This feature ensures continuity of care.",
    },
    {
      title: "Online Appointment Booking",
      description:
        "Easily book appointments with specialists, choose a preferred time slot, and receive reminders through our online booking system.",
    },
  ];

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <header className="about-header">
        <Container>
          <Row>
            <Col>
              <h1>Welcome to HospitALL</h1>
              <p>
                Your trusted partner in healthcare, committed to providing
                comprehensive medical services with a focus on patient care,
                innovation, and community well-being.
              </p>
              <Button variant="primary" onClick={handleShowModal}>
                Learn More
              </Button>
            </Col>
          </Row>
        </Container>
      </header>

      <section className="hospital-overview">
        <Container>
          <Row>
            <Col md={12}>
              <Card className="overview-card">
                <Card.Body>
                  <h2>About Our Hospital</h2>
                  <p>
                    ONN Hospital is a leading healthcare institution, dedicated
                    to providing world-class medical services across a variety
                    of specialties. From advanced diagnostics to personalized
                    treatments, we are committed to delivering the highest
                    standards of care.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="services">
        <Container>
          <Row>
            <Col md={4}>
              <Card className="service-card">
                <Card.Body>
                  <h3>Comprehensive Medical Services</h3>
                  <p>
                    We offer a wide range of services, including cardiology,
                    neurology, orthopedics, pediatrics, and more. Our team of
                    experts uses the latest technology and treatment methods.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="service-card">
                <Card.Body>
                  <h3>24/7 Emergency Care</h3>
                  <p>
                    Our emergency department is open 24/7, ensuring that urgent
                    medical needs are met promptly with highly skilled
                    professionals and state-of-the-art facilities.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="service-card">
                <Card.Body>
                  <h3>Advanced Diagnostic Services</h3>
                  <p>
                    We provide cutting-edge diagnostic services, including
                    imaging, lab tests, and advanced procedures to accurately
                    diagnose and treat various conditions.
                  </p>
                </Card.Body>
              </Card>{" "}
              {/* This was missing */}
            </Col>
          </Row>
        </Container>
      </section>

      <section className="benefits">
        <Container>
          <Row>
            <Col md={12}>
              <Card className="benefits-card">
                <Card.Body>
                  <h2>Benefits for Patients</h2>
                  <ul>
                    <li>
                      <strong>Easy Access:</strong> Book appointments, consult
                      with doctors, and manage healthcare from the comfort of
                      your home.
                    </li>
                    <li>
                      <strong>Expert Care:</strong> Access a team of experienced
                      doctors across various specialties.
                    </li>
                    <li>
                      <strong>Timely Treatment:</strong> Fast-track your
                      treatment through our efficient online appointment and
                      consultation system.
                    </li>
                    <li>
                      <strong>Health Records:</strong> Keep track of your
                      medical history and treatments in one secure location.
                    </li>
                    <li>
                      <strong>Community Support:</strong> Join our online
                      support groups and health forums to share experiences and
                      learn from others.
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="future-vision">
        <Container>
          <Row>
            <Col md={12}>
              <Card className="vision-card">
                <Card.Body>
                  <h2>Our Future Vision</h2>
                  <p>
                    Our goal is to continually innovate and enhance the
                    healthcare experience for our patients. Through the use of
                    telemedicine, AI diagnostics, and mobile health tools, we
                    aim to make healthcare more accessible, personalized, and
                    efficient for everyone.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Modal to show Website Features */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Website Features</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Our Key Features</h5>
          <p>
            Below are the key features that make our website an essential
            platform for patients and healthcare professionals:
          </p>
          {features.map((feature, index) => (
            <Card key={index} className="feature-card">
              <Card.Body>
                <h6>{feature.title}</h6>
                <p>{feature.description}</p>
              </Card.Body>
            </Card>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default About;
