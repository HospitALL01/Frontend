import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Support = () => {
  return (
    <div className='support-page'>
      <Container className='py-5'>
        {/* Section: Introduction */}
        <Row className='text-center mb-5'>
          <Col>
            <h1 className='display-4 font-weight-bold'>Support</h1>
            <p className='lead'>
              Need assistance? We’re here to help. Browse our FAQs or contact us for further support.
            </p>
          </Col>
        </Row>

        {/* Section: FAQ */}
        <Row className='text-center mb-5'>
          <Col>
            <h2 className='font-weight-bold mb-4'>Frequently Asked Questions</h2>
          </Col>
        </Row>

        <Row>
          {/* FAQ 1 */}
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title>How do I book an appointment?</Card.Title>
                <Card.Text>
                  To book an appointment, simply go to the "Find a Doctor" section, select your preferred doctor, and
                  choose an available slot.
                </Card.Text>
                <Button variant='link' href='#faq-details'>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* FAQ 2 */}
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title>How do I access emergency services?</Card.Title>
                <Card.Text>
                  You can access emergency services directly from the homepage by clicking on the "Emergency Service"
                  button for immediate assistance.
                </Card.Text>
                <Button variant='link' href='#faq-details'>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* FAQ 3 */}
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title>How secure is my health data?</Card.Title>
                <Card.Text>
                  Your health data is protected with enterprise-grade security, ensuring compliance with privacy
                  regulations for the safety of your information.
                </Card.Text>
                <Button variant='link' href='#faq-details'>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* FAQ 4 */}
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title>How do I get in touch with support?</Card.Title>
                <Card.Text>
                  You can contact support through our live chat feature or by sending an email to support@hospitall.com.
                </Card.Text>
                <Button variant='link' href='#faq-details'>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Section: Contact Support */}
        <Row className='text-center mb-5'>
          <Col>
            <h2 className='font-weight-bold mb-4'>Contact Support</h2>
          </Col>
        </Row>

        <Row>
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title>Live Chat</Card.Title>
                <Card.Text>
                  Have an urgent issue? Our support team is available 24/7 through live chat for instant assistance.
                </Card.Text>
                <Button variant='primary' href='#live-chat'>
                  Start Live Chat
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title>Email Support</Card.Title>
                <Card.Text>
                  You can email us at <strong>support@hospitall.com</strong> for general inquiries or technical issues.
                </Card.Text>
                <Button variant='primary' href='mailto:support@hospitall.com'>
                  Send Email
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Section: Additional Resources */}
        <Row className='text-center mb-5'>
          <Col>
            <h2 className='font-weight-bold mb-4'>Additional Resources</h2>
          </Col>
        </Row>

        <Row>
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title>Help Center</Card.Title>
                <Card.Text>
                  Explore our Help Center for in-depth guides, tutorials, and articles to assist you with using the
                  platform.
                </Card.Text>
                <Button variant='link' href='#help-center'>
                  Visit Help Center
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title>Community Forum</Card.Title>
                <Card.Text>
                  Join our Community Forum to discuss issues, share tips, and get advice from fellow users.
                </Card.Text>
                <Button variant='link' href='#forum'>
                  Visit Forum
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Support;
