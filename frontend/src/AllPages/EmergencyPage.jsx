import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaExclamationTriangle,
  FaPhone,
  FaHeartbeat,
  FaCarCrash,
  FaLungs,
  FaBolt,
  FaQuestionCircle,
  FaMapMarkerAlt,
  FaShareAlt,
  FaPhoneAlt,
  FaHeart,
  FaBrain,
} from "react-icons/fa";
import "../index.css"; // Ensure your custom CSS is imported

// --- Mock Data ---
const emergencyTypes = [
  { id: "cardiac", name: "Cardiac Emergency", icon: <FaHeartbeat /> },
  { id: "trauma", name: "Trauma/Accident", icon: <FaCarCrash /> },
  { id: "breathing", name: "Breathing Problems", icon: <FaLungs /> },
  { id: "stroke", name: "Stroke/Seizure", icon: <FaBolt /> },
  { id: "other", name: "Other Emergency", icon: <FaQuestionCircle /> },
];

const nearbyAmbulances = [
  {
    name: "City Medical Center",
    distance: "2.3 km",
    eta: "8 minutes",
    status: "Available",
  },
  {
    name: "Emergency Care Hospital",
    distance: "3.1 km",
    eta: "12 minutes",
    status: "Available",
  },
  {
    name: "Regional Medical Center",
    distance: "4.7 km",
    eta: "15 minutes",
    status: "Busy",
  },
];

const emergencyContacts = [
  {
    name: "Emergency Services",
    number: "911",
    icon: <FaPhoneAlt />,
    color: "danger",
  },
  {
    name: "Poison Control",
    number: "1-800-222-1222",
    icon: <FaHeart />,
    color: "primary",
  },
  {
    name: "Crisis Hotline",
    number: "988",
    icon: <FaBrain />,
    color: "success",
  },
];

export default function EmergencyPage() {
  const [selectedEmergency, setSelectedEmergency] = useState("cardiac");
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationError, setLocationError] = useState("");

  // ==================================================================
  // ✅ STEP 1: PASTE YOUR API KEY HERE INSIDE THE QUOTATION MARKS
  // ==================================================================
  const GOOGLE_MAPS_API_KEY = "AIzaSyA6PCeCOsrqLxuUa3e-QbbrG-8g30nIe8A";
  // ==================================================================

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationStatus("success");
      },
      (error) => {
        setLocationStatus("error");
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("You denied the request for Geolocation.");
        } else {
          setLocationError("An error occurred while fetching location.");
        }
      }
    );
  };

  return (
    <div className="emergency-page-bg">
      <div className="container py-5">
        {/* Top Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 text-danger d-flex align-items-center justify-content-center">
            <FaExclamationTriangle className="me-3" /> Emergency Services
          </h1>
          <p className="lead text-muted">
            Get immediate medical assistance when you need it most.
          </p>
        </div>

        {/* Life-Threatening Box */}
        <div className="card shadow-sm border-danger text-center p-4 mb-5 bg-light">
          <h3 className="fw-bold">Life-Threatening Emergency?</h3>
          <p className="text-muted">
            For immediate life-threatening emergencies, call emergency services
            directly.
          </p>
          <div className="mt-2">
            <a href="tel:911" className="btn btn-danger btn-call-911">
              <FaPhone className="me-2" /> Call 911 Now
            </a>
          </div>
        </div>

        <div className="row g-4">
          {/* Left Column: Request Assistance */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3">Request Medical Assistance</h4>

                <label className="form-label fw-semibold">
                  Type of Emergency *
                </label>
                {emergencyTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`btn emergency-type-btn ${
                      selectedEmergency === type.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedEmergency(type.id)}
                  >
                    {type.icon} {type.name}
                  </button>
                ))}

                <div className="mt-4">
                  <label
                    htmlFor="contactNumber"
                    className="form-label fw-semibold"
                  >
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    className="form-control"
                    defaultValue="678769870607"
                  />
                </div>

                <div className="mt-3">
                  <label className="form-label fw-semibold">Location</label>
                  <div className="location-box">
                    {locationStatus === "idle" && (
                      <>
                        <p className="text-muted mb-2">
                          Unable to detect location automatically
                        </p>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={handleShareLocation}
                        >
                          <FaShareAlt className="me-2" /> Share Current Location
                        </button>
                      </>
                    )}
                    {locationStatus === "loading" && (
                      <div className="d-flex align-items-center">
                        <div
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></div>
                        <span>Detecting your location...</span>
                      </div>
                    )}
                    {locationStatus === "error" && (
                      <p className="text-danger mb-0">{locationError}</p>
                    )}
                    {locationStatus === "success" && location && (
                      <div className="map-container">
                        <iframe
                          title="Google Map of your location"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          allowFullScreen
                          // This line now correctly uses the variable from above
                          src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${location.lat},${location.lng}`}
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="description"
                    className="form-label fw-semibold"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    rows="3"
                    placeholder="Briefly describe the emergency..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Nearby Ambulances */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3 d-flex align-items-center">
                  <FaMapMarkerAlt className="me-2" /> Nearby Ambulances
                </h4>
                {nearbyAmbulances.map((ambulance, index) => (
                  <div key={index} className="ambulance-card">
                    <div>
                      <h6 className="fw-bold mb-1">{ambulance.name}</h6>
                      <p className="small text-muted mb-0">
                        {ambulance.distance} <span className="mx-1">|</span>{" "}
                        ETA: {ambulance.eta}
                      </p>
                    </div>
                    <div className="text-end">
                      <span
                        className={`badge ambulance-status ${ambulance.status.toLowerCase()}`}
                      >
                        {ambulance.status}
                      </span>
                      <button
                        className="btn btn-sm btn-danger request-ambulance-btn"
                        disabled={ambulance.status === "Busy"}
                      >
                        Request Ambulance <FaPhone className="ms-1" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="tips-box mt-4">
                  <h6 className="fw-bold">Emergency Tips</h6>
                  <ul className="small text-muted ps-3 mb-0">
                    <li>Stay calm and ensure your safety first</li>
                    <li>Provide clear location information</li>
                    <li>Keep your phone charged and accessible</li>
                    <li>Follow dispatcher instructions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Emergency Contacts */}
        <div className="mt-5">
          <h3 className="fw-bold text-center mb-4">Emergency Contacts</h3>
          <div className="row g-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="col-md-4">
                <div className={`contact-card bg-${contact.color}-soft`}>
                  <div className={`icon-wrapper text-${contact.color}`}>
                    {contact.icon}
                  </div>
                  <h5 className="fw-bold mt-3">{contact.name}</h5>
                  <p className="fs-4 text-dark mb-0">{contact.number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
