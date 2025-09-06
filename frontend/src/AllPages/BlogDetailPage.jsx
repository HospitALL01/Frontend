import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

// Import the new centralized blog data
import { blogs } from "../data/blogs";

const BlogDetailPage = () => {
  // Get the 'id' from the URL
  const { id } = useParams();

  // Find the specific blog post from our data
  const blog = blogs.find((b) => b.id === parseInt(id));

  // Find other blogs to show as "Recent Posts"
  const recentBlogs = blogs.filter((b) => b.id !== parseInt(id)).slice(0, 3);

  // If no blog is found for the given id, show a "not found" message
  if (!blog) {
    return (
      <Container className="text-center py-5">
        <h2>Blog Post Not Found</h2>
        <p>The post you are looking for does not exist.</p>
        <Link to="/blogs" className="btn btn-primary">
          Back to Blogs
        </Link>
      </Container>
    );
  }

  return (
    <div>
      {/* Header Section with the blog's feature image */}
      <header
        className="blog-detail-header"
        style={{ backgroundImage: `url(${blog.image})` }}
      >
        <Container>
          <h1 className="display-4 fw-bold">{blog.title}</h1>
        </Container>
      </header>

      {/* Main Content Area */}
      <main className="blogs-section-bg">
        <Container className="py-5">
          <Row>
            {/* Left Column: Main Blog Content */}
            <Col lg={8}>
              <div className="blog-content">
                {blog.content.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Col>

            {/* Right Column: Sidebar */}
            <Col lg={4}>
              <Card className="blog-sidebar">
                <Card.Body>
                  <Card.Title as="h5" className="fw-bold">
                    About the Author
                  </Card.Title>
                  <Card.Text>
                    <strong>{blog.author}</strong>
                    <br />
                    <small className="text-muted">
                      Published on {blog.publishedDate}
                    </small>
                  </Card.Text>
                  <hr />
                  <h5 className="fw-bold">Recent Posts</h5>
                  <ul className="list-unstyled">
                    {recentBlogs.map((recent) => (
                      <li key={recent.id} className="mb-2">
                        <Link
                          to={`/blogs/${recent.id}`}
                          className="recent-post-link"
                        >
                          {recent.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default BlogDetailPage;
