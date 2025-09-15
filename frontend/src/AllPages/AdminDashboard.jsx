import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  FaCheckCircle,
  FaRegListAlt,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";
import "../index.css";

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// 🔑 Unified localStorage keys
const CACHE_KEY = "adminDoctorListCache";
const ACCEPT_KEY = "adm_accept";
const DECLINE_KEY = "adm_decline";

export default function AdminDashboard() {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [acceptedDoctors, setAcceptedDoctors] = useState([]);
  const [declinedDoctors, setDeclinedDoctors] = useState([]);
  const [showDoctorInfo, setShowDoctorInfo] = useState(false);
  const [showAcceptedDoctors, setShowAcceptedDoctors] = useState(false);
  const [showAccount, setShowAccount] = useState(true);
  const [doubleClickError, setDoubleClickError] = useState("");

  // Load cached doctor list
  const loadCache = () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  // Save the list to localStorage
  const saveCache = (list) => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(list || []));
  };

  // Fetch doctor list from the API
  const fetchDoctors = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/doctor-info`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed to load doctors");

      const list = Array.isArray(json?.data) ? json.data : [];
      setDoctorList(list);
      saveCache(list);
    } catch (e) {
      const cache = loadCache();
      setDoctorList(cache);
      setError(
        e?.message ||
          "Could not fetch from server. Showing cached data if available."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cache = loadCache();
    if (cache.length) {
      setDoctorList(cache);
      setLoading(false);
    }
    fetchDoctors();

    // Disable back functionality
    const handlePopState = (e) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Load accepted and declined doctors from localStorage on mount
  useEffect(() => {
    try {
      const savedAccepted = localStorage.getItem(ACCEPT_KEY);
      if (savedAccepted) setAcceptedDoctors(JSON.parse(savedAccepted));
    } catch {}
    try {
      const savedDeclined = localStorage.getItem(DECLINE_KEY);
      if (savedDeclined) setDeclinedDoctors(JSON.parse(savedDeclined));
    } catch {}
  }, []);

  // Show selected doctor's details
  const handleDoctorClick = (doc) => {
    setSelectedDoctor(doc);
    setShowDoctorInfo(true);
    setShowAccount(false);
    setShowAcceptedDoctors(false);
  };

  // Go back from Doctor Details
  const handleBackClick = () => {
    setShowDoctorInfo(false);
    setSelectedDoctor(null);
    setShowAccount(true);
  };

  // Handle accept button click
  const handleAcceptClick = (doctor) => {
    if (acceptedDoctors.some((d) => d.email === doctor.email)) {
      setDoubleClickError("This doctor has already been accepted.");
      return;
    }
    const newAccepted = [doctor, ...acceptedDoctors];
    setAcceptedDoctors(newAccepted);
    localStorage.setItem(ACCEPT_KEY, JSON.stringify(newAccepted));

    // Remove from declined if exists
    const newDeclined = declinedDoctors.filter((d) => d.email !== doctor.email);
    setDeclinedDoctors(newDeclined);
    localStorage.setItem(DECLINE_KEY, JSON.stringify(newDeclined));
  };

  // Handle decline button click
  const handleDeclineClick = (doctor) => {
    if (declinedDoctors.some((d) => d.email === doctor.email)) {
      setDoubleClickError("This doctor has already been declined.");
      return;
    }
    const newDeclined = [doctor, ...declinedDoctors];
    setDeclinedDoctors(newDeclined);
    localStorage.setItem(DECLINE_KEY, JSON.stringify(newDeclined));

    // Remove from accepted if exists
    const newAccepted = acceptedDoctors.filter((d) => d.email !== doctor.email);
    setAcceptedDoctors(newAccepted);
    localStorage.setItem(ACCEPT_KEY, JSON.stringify(newAccepted));
  };

  // Delete doctor from Doctor Details (remove permanently)
  const handleDeleteDoctorFromDetails = (doctor) => {
    const newList = doctorList.filter((d) => d.email !== doctor.email);
    setDoctorList(newList);
    localStorage.setItem(CACHE_KEY, JSON.stringify(newList));

    const na = acceptedDoctors.filter((d) => d.email !== doctor.email);
    setAcceptedDoctors(na);
    localStorage.setItem(ACCEPT_KEY, JSON.stringify(na));

    const nd = declinedDoctors.filter((d) => d.email !== doctor.email);
    setDeclinedDoctors(nd);
    localStorage.setItem(DECLINE_KEY, JSON.stringify(nd));
  };

  // Delete doctor from Accepted Doctors
  const handleDeleteDoctorFromAccepted = (doctor) => {
    const na = acceptedDoctors.filter((d) => d.email !== doctor.email);
    setAcceptedDoctors(na);
    localStorage.setItem(ACCEPT_KEY, JSON.stringify(na));
  };

  // Toggle sections
  const toggleAcceptedDoctors = () => {
    setShowAcceptedDoctors(true);
    setShowAccount(false);
    setShowDoctorInfo(false);
  };
  const toggleAccount = () => {
    setShowAccount(!showAccount);
    setShowAcceptedDoctors(false);
  };

  // Handle click on Accepted Doctors row
  const handleAcceptedDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorInfo(true);
    setShowAcceptedDoctors(false);
    setShowAccount(false);
  };

  return (
    <div>
      <Container className="my-4">
        <Row className="g-3">
          <Col md={2}>
            <Card
              className="shadow-sm text-center h-100 border-0 account-card"
              style={{ cursor: "pointer" }}
              onClick={toggleAccount}
            >
              <Card.Body>
                <div style={{ fontSize: "2rem" }}>👤</div>
                <Card.Title className="mt-2">Account</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Accepted Doctors */}
          <Col md={2}>
            <Card
              className="shadow-sm text-center h-100 border-0 account-card"
              style={{ cursor: "pointer" }}
              onClick={toggleAcceptedDoctors}
            >
              <Card.Body>
                <div style={{ fontSize: "2rem" }}>
                  <FaRegListAlt />
                </div>
                <Card.Title className="mt-2">Accepted Doctors</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            {loading && (
              <div className="d-flex align-items-center gap-2">
                <Spinner animation="border" size="sm" />{" "}
                <span>Loading doctors…</span>
              </div>
            )}
            {!loading && error && (
              <Alert variant="warning" className="mt-2">
                {error}
              </Alert>
            )}
          </Col>
        </Row>

        {/* Double Click Error */}
        {doubleClickError && (
          <Alert variant="danger" className="mt-2">
            {doubleClickError}
          </Alert>
        )}

        {/* Account (Doctor Information) */}
        {showAccount && !showDoctorInfo && (
          <Container className="mt-3">
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Doctor Information</h5>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive className="mt-3">
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>Doctor's Name</th>
                      <th>Specialization</th>
                      <th>Hospital</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctorList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center">
                          No doctor found
                        </td>
                      </tr>
                    ) : (
                      doctorList.map((d, idx) => (
                        <tr
                          key={`${d.email}-${idx}`}
                          onClick={() => handleDoctorClick(d)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{idx + 1}</td>
                          <td>{d.doctorName}</td>
                          <td>{d.specialization}</td>
                          <td>{d.hospitalName}</td>
                          <td>{d.email}</td>
                          <td>{d.phone}</td>
                          <td>
                            {acceptedDoctors.some(
                              (doc) => doc.email === d.email
                            ) ? (
                              <FaCheckCircle style={{ color: "green" }} />
                            ) : declinedDoctors.some(
                                (doc) => doc.email === d.email
                              ) ? (
                              <FaTimesCircle style={{ color: "red" }} />
                            ) : (
                              "Pending"
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
        )}

        {/* Doctor details */}
        {selectedDoctor && showDoctorInfo && (
          <Container className="mt-3">
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

                <div className="d-flex justify-content-center mt-4 gap-3">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={() => handleAcceptClick(selectedDoctor)}
                    title="Accept this doctor"
                    className="btn-small"
                    disabled={acceptedDoctors.some(
                      (d) => d.email === selectedDoctor.email
                    )}
                  >
                    <FaCheckCircle style={{ marginRight: "8px" }} />
                    Accept Doctor
                  </Button>

                  <Button
                    variant="danger"
                    size="lg"
                    onClick={() => handleDeclineClick(selectedDoctor)}
                    title="Decline this doctor"
                    className="btn-small"
                    disabled={declinedDoctors.some(
                      (d) => d.email === selectedDoctor.email
                    )}
                  >
                    <FaTimesCircle style={{ marginRight: "8px" }} />
                    Decline Doctor
                  </Button>
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <Button
                    variant="secondary"
                    onClick={handleBackClick}
                    size="lg"
                    className="btn-back"
                  >
                    Back
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Container>
        )}

        {/* Accepted Doctors Section */}
        {showAcceptedDoctors && acceptedDoctors.length > 0 && (
          <Container className="mt-3">
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">Accepted Doctors</h5>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive className="mt-3">
                  <thead className="table-success">
                    <tr>
                      <th>Doctor's Name</th>
                      <th>Specialization</th>
                      <th>Hospital</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptedDoctors.map((d) => (
                      <tr
                        key={d.email}
                        onClick={() => handleAcceptedDoctorClick(d)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{d.doctorName}</td>
                        <td>{d.specialization}</td>
                        <td>{d.hospitalName}</td>
                        <td>{d.email}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDoctorFromAccepted(d);
                            }}
                            title="Delete this doctor"
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
        )}
      </Container>
    </div>
  );
}
