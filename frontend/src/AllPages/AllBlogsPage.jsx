import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

// Import the centralized blog data
import { blogs } from "../data/blogs";
// ✅ 1. Import your new background image
import tipsHeaderImage from "../assets/Healthcare-Tips2.jpg";

// Filter for only the healthcare tip blogs
const healthcareTips = blogs.filter((b) => b.category === "Healthcare Tips");

// Reusable Blog Card Component for this page
const BlogCard = ({ blog }) => (
  <Col md={4} className="mb-4">
    <Card className="blog-card h-100">
      <Card.Img variant="top" src={blog.image} />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h5" className="fw-bold">
          {blog.title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          by {blog.author}
        </Card.Subtitle>
        <Card.Text>{blog.excerpt}</Card.Text>
        <Button
          as={Link}
          to={`/blogs/${blog.id}`}
          variant="primary"
          className="mt-auto align-self-start"
        >
          Read More
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

const AllBlogsPage = () => {
  return (
    // Use a React Fragment <> to wrap both header and main
    <>
      {/* ✅ 2. ADD the new header section */}
      <header
        className="blogs-header text-center text-white"
        style={{ backgroundImage: `url(${tipsHeaderImage})` }}
      >
        <Container>
          <h1 className="display-4 fw-bold">All Healthcare Tips</h1>
          <p className="lead col-lg-8 mx-auto">
            Browse our complete library of health advice from renowned doctors.
          </p>
        </Container>
      </header>

      <main className="blogs-section-bg">
        <Container className="py-5">
          {/* ✅ 3. MOVED the title out of the main section and into the header */}
          {/* The Row of blog cards remains the same */}
          <Row>
            {healthcareTips.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </Row>
        </Container>
      </main>
    </>
  );
};

export default AllBlogsPage;
