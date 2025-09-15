import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import "../index.css";

export default function AdminDashboard() {
  const [doctorData, setDoctorData] = useState(null);
  const [showDoctorName, setShowDoctorName] = useState(false);
  const [showDoctorInfo, setShowDoctorInfo] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Fetch doctor's data from localStorage
  useEffect(() => {
    const storedDoctorData = localStorage.getItem("doctorData"); // Get doctor data from localStorage

    if (storedDoctorData) {
      const parsedData = JSON.parse(storedDoctorData); // Parse the data from JSON string
      setDoctorData(parsedData); // Save the data in the state
      console.log("Fetched doctor data: ", parsedData); // Log to ensure correct data is fetched
    } else {
      console.log("No doctor data found in localStorage");
    }
  }, []); // Run once on mount

  // Toggle visibility of doctor's name
  const handleAccountClick = () => {
    setShowDoctorName((prevState) => !prevState); // Toggle the visibility of the doctor's name
  };

  // Handle doctor's name click to show detailed information
  const handleDoctorClick = () => {
    setSelectedDoctor(doctorData); // Set the selected doctor to the single doctor object
    setShowDoctorInfo(true); // Show detailed info
  };

  // Handle back click to hide doctor details
  const handleBackClick = () => {
    setShowDoctorInfo(false); // Hide doctor details
    setSelectedDoctor(null); // Reset selected doctor
    setShowDoctorName(false); // Reset doctor name visibility
  };

  return (
    <div>
      <Container className="my-4">
        <Row className="g-3">
          <Col md={2}>
            <Card
              className="shadow-sm text-center h-100 border-0 account-card"
              style={{ cursor: "pointer" }} // Show pointer cursor
              onClick={handleAccountClick} // Handle click on Account card
            >
              <Card.Body>
                <div style={{ fontSize: "2rem" }}>👤</div>
                <Card.Title className="mt-2">Account</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Display Doctor's Name if doctorData is available and Account card is clicked */}
        {showDoctorName && !showDoctorInfo && doctorData && (
          <Container>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Doctor Information</h5>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive className="mt-3">
                  <thead className="table-primary">
                    <tr>
                      <th>Doctor's Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Display doctor name */}
                    <tr
                      onClick={handleDoctorClick} // Show detailed info on click
                      style={{ cursor: "pointer" }} // Make rows clickable
                    >
                      <td>{doctorData.doctorName}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
        )}

        {/* Show Doctor's Details when the doctor name is clicked */}
        {showDoctorInfo && selectedDoctor && (
          <Container>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Doctor Details</h5>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive className="mt-3">
                  <thead className="table-primary">
                    <tr>
                      <th>Field</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Display selected doctor's detailed information */}
                    <tr>
                      <td>Doctor's Name</td>
                      <td>{selectedDoctor.doctorName}</td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>{selectedDoctor.gender}</td>
                    </tr>
                    <tr>
                      <td>Specialization</td>
                      <td>{selectedDoctor.specialization}</td>
                    </tr>
                    <tr>
                      <td>License Number</td>
                      <td>{selectedDoctor.licenseNumber}</td>
                    </tr>
                    <tr>
                      <td>License Issue Date</td>
                      <td>{selectedDoctor.licenseIssueDate}</td>
                    </tr>
                    <tr>
                      <td>Hospital Name</td>
                      <td>{selectedDoctor.hospitalName}</td>
                    </tr>
                    <tr>
                      <td>Years of Experience</td>
                      <td>{selectedDoctor.yearsOfExperience}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{selectedDoctor.phone}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{selectedDoctor.email}</td>
                    </tr>
                    <tr>
                      <td>Current Position</td>
                      <td>{selectedDoctor.currentPosition}</td>
                    </tr>
                    <tr>
                      <td>Previous Positions</td>
                      <td>{selectedDoctor.previousPositions}</td>
                    </tr>
                  </tbody>
                </Table>
                <Button variant="secondary" onClick={handleBackClick}>
                  Back
                </Button>
              </Card.Body>
            </Card>
          </Container>
        )}
      </Container>
    </div>
  );
}
