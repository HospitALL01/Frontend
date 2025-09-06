import React from "react";
import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

import BlogCard from "../Components/BlogCard"; // Using the central component
import { blogs } from "../data/blogs";
import tipsHeaderImage from "../assets/Healthcare-Tips2.jpg";

const AllBlogsPage = () => {
  // This filter correctly gets ALL blogs with the "Healthcare Tips" category
  const healthcareTips = blogs.filter((b) => b.category === "Healthcare Tips");

  return (
    <>
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
          <Row>
            {/* We are mapping over the correctly filtered 'healthcareTips' array */}
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
