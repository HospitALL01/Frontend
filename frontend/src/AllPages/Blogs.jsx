import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

// ✅ 1. IMPORT the new central BlogCard component
import BlogCard from "../Components/BlogCard";
import { blogs } from "../data/blogs";
import blogHeaderImage from "../assets/gotit.jpg";

// Filtering logic remains the same and is correct
const featuredBlogs = blogs.filter((b) => b.category !== "Healthcare Tips");
const healthcareTipsPreview = blogs
  .filter((b) => b.category === "Healthcare Tips")
  .slice(0, 3);

// ❌ 2. REMOVED the old local BlogCard definition from here

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
            <h2 className="text-center fw-bold mb-5 section-heading">
              Featured Blogs
            </h2>
            <Row>
              {/* This now uses the imported BlogCard component */}
              {featuredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </Row>
          </Container>
        </section>

        <section className="py-5">
          <Container>
            <h2 className="text-center fw-bold mb-5 section-heading">
              All Blogs
            </h2>
            <Row>
              {/* This also uses the same imported BlogCard component */}
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
