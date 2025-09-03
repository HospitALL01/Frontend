// src/AllPages/AdminDashboard.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Navbar,
  Nav,
} from "react-bootstrap";

export default function AdminDashboard() {
  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">🏥 HospitALL Admin</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#">View Site</Nav.Link>
            <Button variant="light" size="sm">
              Log Out
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-4">
        <Row className="g-3">
          {[
            { name: "Recent Posts", icon: "📝" },
            { name: "Products", icon: "📦" },
            { name: "Coupons", icon: "🎟️" },
            { name: "Users", icon: "👥" },
            { name: "Settings", icon: "⚙️" },
            { name: "Account", icon: "👤" },
          ].map((item, index) => (
            <Col key={index} md={2}>
              <Card className="shadow-sm text-center h-100 border-0">
                <Card.Body>
                  <div style={{ fontSize: "2rem" }}>{item.icon}</div>
                  <Card.Title className="mt-2">{item.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container>
        <Card className="shadow-sm border-0">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">Products</h5>
          </Card.Header>
          <Card.Body>
            <Button variant="success" size="sm" className="me-2">
              + Add Product
            </Button>
            <Button variant="outline-secondary" size="sm" className="me-2">
              Import
            </Button>
            <Button variant="outline-secondary" size="sm">
              Export
            </Button>

            <Table striped bordered hover responsive className="mt-3">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>🩺 Product A</td>
                  <td>
                    <span className="text-success">In stock</span>
                  </td>
                  <td>$50.00</td>
                  <td>2025-09-03</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>💊 Medicine B</td>
                  <td>
                    <span className="text-danger">Out of stock</span>
                  </td>
                  <td>$30.00</td>
                  <td>2025-09-02</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
