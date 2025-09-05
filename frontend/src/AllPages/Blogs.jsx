import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

import { blogs } from "../data/blogs";
import blogHeaderImage from "../assets/gotit.jpg"; // Corrected image name as requested previously

// The first 3 blogs in your data file will always be the "Featured Blogs".
const featuredBlogs = blogs.slice(0, 3);

// "All Blogs" will be the rest of the posts, with a preview of the first 3 from that list.
const allOtherBlogs = blogs.slice(3);
const healthcareTipsPreview = allOtherBlogs.slice(0, 3);

const BlogCard = ({ blog }) => (
  <Col md={4} className="mb-4">
    <Card className="blog-card h-100">
      <Card.Img variant="top" src={blog.image} />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h5" className="fw-bold">
          {blog.title}
        </Card.Title>
        {blog.author && (
          <Card.Subtitle className="mb-2 text-muted">
            by {blog.author}
          </Card.Subtitle>
        )}
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

const Blogs = () => {
  return (
    <div>
      <header
        className="blogs-header text-center text-white"
        style={{ backgroundImage: `url(${blogHeaderImage})` }}
      >
        <Container>
          <h1 className="display-4 fw-bold">Hospital Blogs</h1>
          <p className="lead col-lg-8 mx-auto">
            Stay informed with the latest news, updates, and expert opinions.
          </p>
        </Container>
      </header>

      <main className="blogs-section-bg">
        <section className="py-5">
          <Container>
            {/* ✅ MODIFIED: Added the new 'section-heading' class */}
            <h2 className="text-center fw-bold mb-5 section-heading">
              Featured Blogs
            </h2>
            <Row>
              {featuredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </Row>
          </Container>
        </section>

        <section className="py-5">
          <Container>
            {/* ✅ MODIFIED: Added the new 'section-heading' class */}
            <h2 className="text-center fw-bold mb-5 section-heading">
              All Blogs
            </h2>
            <Row>
              {healthcareTipsPreview.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </Row>
            <div className="text-center mt-4">
              <Link to="/blogs/all" className="btn btn-outline-primary btn-lg">
                See More Healthcare Tips
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default Blogs;
