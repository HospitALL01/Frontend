import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Blogs = () => {
  return (
    <div className='blogs-page'>
      <Container className='py-5'>
        {/* Section: Blogs Introduction */}
        <Row className='text-center mb-5'>
          <Col>
            <h1 className='display-4 font-weight-bold'>Hospital Blogs</h1>
            <p className='lead'>
              Stay informed with the latest news, updates, and expert opinions about hospitals, healthcare advancements,
              and patient care.
            </p>
          </Col>
        </Row>

        {/* Section: Featured Blogs */}
        <Row className='text-center mb-5'>
          <Col>
            <h2 className='font-weight-bold mb-4'>Featured Blogs</h2>
          </Col>
        </Row>

        <Row>
          {/* Blog 1 */}
          <Col md={4} className='mb-4'>
            <Card>
              <Card.Img variant='top' src='path/to/blog-image.jpg' />
              <Card.Body>
                <Card.Title>Understanding Hospital Emergency Services</Card.Title>
                <Card.Text>
                  Learn everything you need to know about hospital emergency services and how they can save lives in
                  critical situations.
                </Card.Text>
                <Button variant='primary' href='#blog-details'>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Blog 2 */}
          <Col md={4} className='mb-4'>
            <Card>
              <Card.Img variant='top' src='path/to/blog-image.jpg' />
              <Card.Body>
                <Card.Title>The Importance of Regular Health Checkups</Card.Title>
                <Card.Text>
                  Discover why regular checkups are crucial for early diagnosis and prevention of health issues.
                </Card.Text>
                <Button variant='primary' href='#blog-details'>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Blog 3 */}
          <Col md={4} className='mb-4'>
            <Card>
              <Card.Img variant='top' src='path/to/blog-image.jpg' />
              <Card.Body>
                <Card.Title>How to Choose the Right Hospital for Your Treatment</Card.Title>
                <Card.Text>
                  Choosing the right hospital is key to your treatment’s success. This blog discusses factors to
                  consider when making that choice.
                </Card.Text>
                <Button variant='primary' href='#blog-details'>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Section: All Blogs */}
        <Row className='text-center mb-5'>
          <Col>
            <h2 className='font-weight-bold mb-4'>All Blogs</h2>
          </Col>
        </Row>

        <Row>
          {/* Blog 4 */}
          <Col md={4} className='mb-4'>
            <Card>
              <Card.Img variant='top' src='path/to/blog-image.jpg' />
              <Card.Body>
                <Card.Title>Patient Care: What to Expect During Your Stay</Card.Title>
                <Card.Text>
                  Find out what to expect during your stay at a hospital, from the admission process to the discharge.
                </Card.Text>
                <Button variant='primary' href='#blog-details'>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Blog 5 */}
          <Col md={4} className='mb-4'>
            <Card>
              <Card.Img variant='top' src='path/to/blog-image.jpg' />
              <Card.Body>
                <Card.Title>Innovations in Hospital Technology</Card.Title>
                <Card.Text>
                  Discover the latest technological advancements in healthcare that are transforming hospitals and
                  patient care.
                </Card.Text>
                <Button variant='primary' href='#blog-details'>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Blog 6 */}
          <Col md={4} className='mb-4'>
            <Card>
              <Card.Img variant='top' src='path/to/blog-image.jpg' />
              <Card.Body>
                <Card.Title>How Telemedicine is Changing Healthcare</Card.Title>
                <Card.Text>
                  Explore the rise of telemedicine, and how it's making healthcare more accessible and efficient for
                  patients.
                </Card.Text>
                <Button variant='primary' href='#blog-details'>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Blogs;
