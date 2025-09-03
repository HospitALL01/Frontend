import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div className='about-page'>
      <Container className='py-5'>
        {/* Section: Introduction */}
        <Row className='text-center mb-5'>
          <Col>
            <h1 className='display-4 font-weight-bold'>Welcome to HospitALL</h1>
            <p className='lead'>
              Your Complete Healthcare Solution. Connect with top doctors, chat with our AI assistant, and access
              emergency services all in one comprehensive platform.
            </p>
            <Button variant='primary' href='#features' className='mt-3'>
              Discover More
            </Button>
          </Col>
        </Row>

        {/* Section: Why Choose Us */}
        <Row className='text-center mb-5' id='features'>
          <Col>
            <h2 className='font-weight-bold mb-4'>Why Choose HospitALL?</h2>
          </Col>
        </Row>

        <Row className='text-center'>
          <Col md={4} className='mb-4'>
            <Card>
              <Card.Body>
                <h5 className='card-title'>AI Health Chatbot</h5>
                <p>
                  Chat with our intelligent AI assistant for instant health guidance, symptom analysis, and preliminary
                  diagnosis recommendations.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className='mb-4'>
            <Card>
              <Card.Body>
                <h5 className='card-title'>Expert Specialists</h5>
                <p>
                  Connect with verified healthcare professionals and specialists across various medical fields through
                  HospitALL.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className='mb-4'>
            <Card>
              <Card.Body>
                <h5 className='card-title'>24/7 Emergency Services</h5>
                <p>
                  Access emergency services and ambulance requests anytime, anywhere with real-time tracking through our
                  platform.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Section: Patient Testimonials */}
        <Row className='text-center mb-5'>
          <Col>
            <h2 className='font-weight-bold mb-4'>What Our Patients Say</h2>
          </Col>
        </Row>

        <Row>
          <Col md={3} className='mb-4'>
            <Card className='text-center'>
              <Card.Body>
                <p className='card-text'>
                  "The AI diagnosis feature gave me peace of mind before my appointment. Dr. Johnson was exactly what I
                  needed, and the platform made booking so easy."
                </p>
                <footer className='blockquote-footer'>Maria Gonzalez, Cardiology Consultation</footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className='mb-4'>
            <Card className='text-center'>
              <Card.Body>
                <p className='card-text'>
                  "Emergency service was incredibly fast. The ambulance arrived within minutes, and the hospital
                  coordination was seamless."
                </p>
                <footer className='blockquote-footer'>David Kim, Emergency Service</footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className='mb-4'>
            <Card className='text-center'>
              <Card.Body>
                <p className='card-text'>
                  "Finding a pediatrician for my daughter was stress-free. The reviews helped me choose Dr. Rodriguez,
                  and she's been amazing with my child."
                </p>
                <footer className='blockquote-footer'>Sarah Williams, Pediatric Care</footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className='mb-4'>
            <Card className='text-center'>
              <Card.Body>
                <p className='card-text'>
                  "The platform's hospital finder helped me locate the nearest facility when I needed immediate care.
                  The information was accurate and up-to-date."
                </p>
                <footer className='blockquote-footer'>James Thompson, Hospital Finder</footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Section: Nearby Hospitals */}
        <Row className='text-center mb-5'>
          <Col>
            <h2 className='font-weight-bold mb-4'>Nearby Hospitals</h2>
          </Col>
        </Row>

        <Row>
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Img variant='top' src='path/to/hospital-image.jpg' />
              <Card.Body>
                <Card.Title>City Medical Center</Card.Title>
                <Card.Text>
                  Emergency, Cardiology, Surgery, ICU
                  <br />
                  45 Doctors | Open 24/7 | Ambulance Available
                </Card.Text>
                <Button variant='primary' href='#hospital-details'>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Img variant='top' src='path/to/hospital-image.jpg' />
              <Card.Body>
                <Card.Title>Advanced Brain Institute</Card.Title>
                <Card.Text>
                  Neurology, Neurosurgery, Rehabilitation
                  <br />
                  28 Doctors | Limited Hours | No Ambulance
                </Card.Text>
                <Button variant='primary' href='#hospital-details'>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
