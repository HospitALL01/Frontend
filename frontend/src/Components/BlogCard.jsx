import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

// This is our single, reusable component for displaying a blog card.
const BlogCard = ({ blog }) => {
  // Safety check: If for some reason a blog object is not passed, don't render anything.
  if (!blog) {
    return null;
  }

  return (
    <Col md={4} className="mb-4">
      <Card className="blog-card h-100">
        {/* We add a check here to only render the image if the URL exists */}
        {blog.image && <Card.Img variant="top" src={blog.image} />}
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
};

export default BlogCard;
