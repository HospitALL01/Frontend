import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaExclamationTriangle,
  FaPhone,
  FaMapMarkerAlt,
  FaShareAlt,
  FaHeartbeat,
  FaCarCrash,
  FaLungs,
  FaBolt,
  FaQuestionCircle,
  FaPhoneAlt,
  FaHeart,
  FaBrain,
} from "react-icons/fa";
import ConfirmationModal from "../Components/ConfirmationModal";
import { toast } from "react-toastify";
import "../index.css";

// --- Static Data ---
const emergencyTypes = [
  { id: "cardiac", name: "Cardiac Emergency", icon: <FaHeartbeat /> },
  { id: "trauma", name: "Trauma/Accident", icon: <FaCarCrash /> },
  { id: "breathing", name: "Breathing Problems", icon: <FaLungs /> },
  { id: "stroke", name: "Stroke/Seizure", icon: <FaBolt /> },
  { id: "other", name: "Other Emergency", icon: <FaQuestionCircle /> },
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
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationError, setLocationError] = useState("");
  const [ambulances, setAmbulances] = useState([]);
  const [loadingAmbulances, setLoadingAmbulances] = useState(false);
  const [ambulanceToConfirm, setAmbulanceToConfirm] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasActiveBooking, setHasActiveBooking] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState("cardiac");

  const GOOGLE_MAPS_API_KEY = "AIzaSyA6PCeCOsrqLxuUa3e-QbbrG-8g30nIe8A"; // Paste your API key here

  const fetchNearbyAmbulances = (lat, lng) => {
    setLoadingAmbulances(true);
    fetch(`http://127.0.0.1:8000/api/ambulances/nearby?lat=${lat}&lng=${lng}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setAmbulances(data);
        // This logic is a simulation. A real app would get the user's specific booking from the API.
        if (data.some((amb) => amb.status === "Booked")) {
          setHasActiveBooking(true);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch ambulances:", err);
        toast.error("Could not fetch ambulance data.");
      })
      .finally(() => {
        setLoadingAmbulances(false);
      });
  };

  const handleShareLocation = () => {
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(newLocation);
        setLocationStatus("success");
        fetchNearbyAmbulances(newLocation.lat, newLocation.lng);
      },
      (error) => {
        setLocationStatus("error");
        setLocationError("Permission denied or error fetching location.");
      }
    );
  };

  const handleRequestAmbulance = (ambulance) => {
    setAmbulanceToConfirm(ambulance);
    setConfirmAction("book");
    setShowConfirmModal(true);
  };

  const handleConfirmBooking = () => {
    if (!ambulanceToConfirm) return;
    setIsProcessing(true);
    fetch(
      `http://127.0.0.1:8000/api/ambulances/${ambulanceToConfirm.id}/request`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          toast.success(
            `Ambulance from ${data.hospital_name} has been booked!`
          );
          setHasActiveBooking(true);
          setAmbulances((prevAmbulances) =>
            prevAmbulances.map((amb) =>
              amb.id === data.id
                ? {
                    ...amb,
                    status: "Booked",
                    driver_name: data.driver_name,
                    driver_phone: data.driver_phone,
                  }
                : amb
            )
          );
        } else {
          toast.error(
            "Failed to book ambulance. It may no longer be available."
          );
        }
      })
      .catch(() => toast.error("An error occurred during booking."))
      .finally(() => {
        setIsProcessing(false);
        setShowConfirmModal(false);
        setAmbulanceToConfirm(null);
      });
  };

  const handleCancelBooking = (ambulance) => {
    setAmbulanceToConfirm(ambulance);
    setConfirmAction("cancel");
    setShowConfirmModal(true);
  };

  const handleConfirmCancellation = () => {
    if (!ambulanceToConfirm) return;
    setIsProcessing(true);
    fetch(
      `http://127.0.0.1:8000/api/ambulances/${ambulanceToConfirm.id}/cancel`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast.info("Booking has been cancelled.");
        setHasActiveBooking(false);
        setAmbulances((prevAmbulances) =>
          prevAmbulances.map((amb) =>
            amb.id === ambulanceToConfirm.id
              ? { ...amb, status: "Available" }
              : amb
          )
        );
      })
      .catch(() => toast.error("An error occurred during cancellation."))
      .finally(() => {
        setIsProcessing(false);
        setShowConfirmModal(false);
        setAmbulanceToConfirm(null);
      });
  };

  return (
    <>
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
              For immediate life-threatening emergencies, call emergency
              services directly.
            </p>
            <div className="mt-2">
              <a href="tel:911" className="btn btn-danger btn-call-911">
                <FaPhone className="me-2" /> Call 911 Now
              </a>
            </div>
          </div>

          {/* This is the main content row that contains the two columns */}
          <div className="row g-4">
            {/* Left Column for Request Assistance */}
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
                            Share your location for nearby assistance
                          </p>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={handleShareLocation}
                          >
                            <FaShareAlt className="me-2" /> Share Current
                            Location
                          </button>
                        </>
                      )}
                      {locationStatus === "loading" && (
                        <p>Detecting your location...</p>
                      )}
                      {locationStatus === "error" && (
                        <p className="text-danger">{locationError}</p>
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

            {/* Right Column for Nearby Ambulances */}
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3 d-flex align-items-center">
                    <FaMapMarkerAlt className="me-2" /> Nearby Ambulances
                  </h4>
                  {hasActiveBooking && (
                    <div className="alert alert-info small">
                      You have an active booking. Please cancel it before
                      requesting another ambulance.
                    </div>
                  )}
                  {locationStatus === "idle" && !hasActiveBooking && (
                    <p className="text-muted">
                      Share your location to see nearby ambulances.
                    </p>
                  )}
                  {loadingAmbulances && <p>Finding nearby ambulances...</p>}
                  {!loadingAmbulances &&
                    ambulances.length > 0 &&
                    ambulances.map((ambulance) => (
                      <div key={ambulance.id} className="ambulance-card">
                        <div>
                          <h6 className="fw-bold mb-1">
                            {ambulance.hospital_name}
                          </h6>
                          <p className="small text-muted mb-0">
                            Approx. {Number(ambulance.distance).toFixed(2)} km
                            away
                          </p>
                          {ambulance.status === "Booked" && (
                            <div className="mt-2 driver-details">
                              <strong>Driver: {ambulance.driver_name}</strong>
                              <br />
                              <a href={`tel:${ambulance.driver_phone}`}>
                                <FaPhone className="me-1" />{" "}
                                {ambulance.driver_phone}
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="text-end">
                          {ambulance.status === "Available" && (
                            <>
                              <span className="badge ambulance-status available">
                                Available
                              </span>
                              <button
                                className="btn btn-sm btn-danger request-ambulance-btn"
                                disabled={hasActiveBooking}
                                onClick={() =>
                                  handleRequestAmbulance(ambulance)
                                }
                              >
                                Request Ambulance
                              </button>
                            </>
                          )}
                          {ambulance.status === "Booked" && (
                            <>
                              <span className="badge ambulance-status booked">
                                Booked
                              </span>
                              <button
                                className="btn btn-sm btn-outline-danger request-ambulance-btn"
                                onClick={() => handleCancelBooking(ambulance)}
                              >
                                Cancel Booking
                              </button>
                            </>
                          )}
                          {ambulance.status !== "Available" &&
                            ambulance.status !== "Booked" && (
                              <span
                                className={`badge ambulance-status ${ambulance.status.toLowerCase()}`}
                              >
                                {ambulance.status}
                              </span>
                            )}
                        </div>
                      </div>
                    ))}
                  {!loadingAmbulances &&
                    ambulances.length === 0 &&
                    locationStatus === "success" && (
                      <p className="text-muted">
                        No available ambulances found within a 25km radius.
                      </p>
                    )}
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

          {/* Bottom Section for Emergency Contacts */}
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

      <ConfirmationModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={
          confirmAction === "book"
            ? handleConfirmBooking
            : handleConfirmCancellation
        }
        ambulance={ambulanceToConfirm}
        isLoading={isProcessing}
        actionType={confirmAction}
      />
    </>
  );
}
