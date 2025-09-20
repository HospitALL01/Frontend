import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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
import "../index.css";

// Static Data
const emergencyTypes = [
  { id: "cardiac", name: "Cardiac Emergency", icon: <FaHeartbeat /> },
  { id: "trauma", name: "Trauma/Accident", icon: <FaCarCrash /> },
  { id: "breathing", name: "Breathing Problems", icon: <FaLungs /> },
  { id: "stroke", name: "Stroke/Seizure", icon: <FaBolt /> },
  { id: "other", name: "Other Emergency", icon: <FaQuestionCircle /> },
];

export default function EmergencyPage() {
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationError, setLocationError] = useState("");
  const [ambulances, setAmbulances] = useState([]); // Stores all available ambulances
  const [loadingAmbulances, setLoadingAmbulances] = useState(false);
  const [bookedAmbulance, setBookedAmbulance] = useState(null); // Store booked ambulance for the logged-in user
  const [hasActiveBooking, setHasActiveBooking] = useState(false); // Track if user has an active booking
  const [selectedEmergency, setSelectedEmergency] = useState("");

  const GOOGLE_MAPS_API_KEY = "AIzaSyA6PCeCOsrqLxuUa3e-QbbrG-8g30nIe8A"; // Paste your API key here

  useEffect(() => {
    // Fetch the booked ambulance from state on initial load
    // This state is now cleared after cancellation, no need to check localStorage anymore
  }, []);

  // Fetch nearby ambulances
  const fetchNearbyAmbulances = (lat, lng) => {
    setLoadingAmbulances(true);
    fetch(`http://127.0.0.1:8000/api/ambulances/nearby?lat=${lat}&lng=${lng}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        // Check for booked ambulance for the current user
        const patientData = JSON.parse(localStorage.getItem("user"));
        const patientId = patientData?.id;

        if (patientId) {
          const booked = data.find((ambulance) => ambulance.status === "Booked" && ambulance.booked_by === patientId);
          setBookedAmbulance(booked || null); // Set the booked ambulance if found
          setHasActiveBooking(!!booked); // Set active booking status based on availability
        }

        // Set available ambulances
        setAmbulances(data.filter((ambulance) => ambulance.status === "Available"));
      })
      .catch((err) => {
        console.error("Failed to fetch ambulances:", err);
        toast.error("Could not fetch ambulance data.");
      })
      .finally(() => {
        setLoadingAmbulances(false);
      });
  };

  // Handle share location button click
  const handleShareLocation = () => {
    if (hasActiveBooking) {
      toast.error(
        "You have already booked an ambulance. Please cancel the existing booking before booking another one."
      );
      return;
    }

    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(newLocation);
        setLocationStatus("success");

        // Always fetch nearby ambulances, and check for booked ambulance
        fetchNearbyAmbulances(newLocation.lat, newLocation.lng);

        // If there's a booked ambulance, show it even without fetching nearby ambulances
        if (bookedAmbulance) {
          setAmbulances([bookedAmbulance]); // Show only the booked ambulance
        }
      },
      (error) => {
        setLocationStatus("error");
        setLocationError("Permission denied or error fetching location.");
      }
    );
  };

  // Request ambulance (book an ambulance)
  const handleRequestAmbulance = (ambulance) => {
    if (hasActiveBooking) {
      toast.error(
        "You have already booked an ambulance. Please cancel the existing booking before booking another one."
      );
      return;
    }

    const patientData = JSON.parse(localStorage.getItem("user"));
    const patientName = patientData?.p_name || patientData?.name;
    const patientId = patientData?.id; // Getting patient id

    if (!patientName || !patientId) {
      toast.error("Patient name or ID not found. Please login again.");
      return;
    }

    // Immediately set ambulance status as "BookedByMe" after clicking
    setAmbulances((prev) =>
      prev.map((a) =>
        a.id === ambulance.id
          ? { ...a, status: "BookedByMe", driver_name: ambulance.driver_name, driver_phone: ambulance.driver_phone }
          : a
      )
    );

    // Proceed with API request to book the ambulance
    fetch(`http://127.0.0.1:8000/api/ambulances/${ambulance.id}/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patient_name: patientName, patient_id: patientId }), // Send patient_id
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          toast.success(`Ambulance from ${data.hospital_name} has been booked!`);
          // Update status if required
          setAmbulances((prev) =>
            prev.map((a) =>
              a.id === data.ambulance_id
                ? { ...a, status: "BookedByMe", driver_name: data.driver_name, driver_phone: data.driver_phone }
                : a
            )
          );
          // Save the booked ambulance in state for persistence
          setBookedAmbulance(data);
          setHasActiveBooking(true); // Set active booking flag
        } else {
          toast.error("Failed to book ambulance.");
        }
      })
      .catch(() => toast.error("Error occurred during booking."));
  };

  // Cancel booking for an ambulance (both active and from the ambulance list)
  const handleCancelBooking = (ambulance) => {
    const patientData = JSON.parse(localStorage.getItem("user"));
    const patientId = patientData?.id;

    fetch(`http://127.0.0.1:8000/api/ambulances/${ambulance.id}/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patient_id: patientId }), // Send patient_id to ensure cancellation is for the correct user
    })
      .then((res) => res.json())
      .then((data) => {
        toast.info("Booking has been cancelled.");

        // Remove the booked ambulance from the state
        setHasActiveBooking(false);
        setBookedAmbulance(null);

        // Update the status of the ambulance to "Available" in the state and database
        setAmbulances((prevAmbulances) =>
          prevAmbulances.map((amb) => (amb.id === ambulance.id ? { ...amb, status: "Available" } : amb))
        );
      })
      .catch(() => toast.error("An error occurred during cancellation."));
  };

  const handleCall911 = () => {
    toast.info("Calling 911...");
  };

  return (
    <div className='emergency-page-bg'>
      <div className='container py-5'>
        {/* Top Header */}
        <div className='text-center mb-5'>
          <h1 className='fw-bold display-5 text-danger d-flex align-items-center justify-content-center'>
            <FaExclamationTriangle className='me-3' /> Emergency Services
          </h1>
          <p className='lead text-muted'>Get immediate medical assistance when you need it most.</p>
        </div>

        {/* Life-Threatening Box */}
        <div className='card shadow-sm border-danger text-center p-4 mb-5 bg-light'>
          <h3 className='fw-bold'>Life-Threatening Emergency?</h3>
          <p className='text-muted'>For immediate life-threatening emergencies, call emergency services directly.</p>
          <div className='mt-2'>
            <a href='tel:911' className='btn btn-danger btn-call-911' onClick={handleCall911}>
              <FaPhone className='me-2' /> Call 911 Now
            </a>
          </div>
        </div>

        {/* Main content row */}
        <div className='row g-4'>
          {/* Left Column for Request Assistance */}
          <div className='col-lg-6'>
            <div className='card shadow-sm border-0 h-100'>
              <div className='card-body p-4'>
                <h4 className='fw-bold mb-3'>Request Medical Assistance</h4>
                <label className='form-label fw-semibold'>Type of Emergency *</label>
                {emergencyTypes.map((type) => (
                  <span
                    key={type.id}
                    className={`btn emergency-type-btn ${selectedEmergency === type.id ? "active" : ""}`}>
                    {type.icon} {type.name}
                  </span>
                ))}

                <div className='mt-3'>
                  <label className='form-label fw-semibold'>Location</label>
                  <div className='location-box'>
                    {locationStatus === "idle" && (
                      <>
                        <p className='text-muted mb-2'>Share your location for nearby assistance</p>
                        <button className='btn btn-outline-primary btn-sm' onClick={handleShareLocation}>
                          <FaShareAlt className='me-2' /> Share Current Location
                        </button>
                      </>
                    )}
                    {locationStatus === "loading" && <p>Detecting your location...</p>}
                    {locationStatus === "error" && <p className='text-danger'>{locationError}</p>}
                    {locationStatus === "success" && location && (
                      <div className='map-container'>
                        <iframe
                          title='Google Map of your location'
                          width='100%'
                          height='100%'
                          style={{ border: 0 }}
                          loading='lazy'
                          allowFullScreen
                          src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${location.lat},${location.lng}`}></iframe>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column for Nearby Ambulances */}
          <div className='col-lg-6'>
            <div className='card shadow-sm border-0 h-100'>
              <div className='card-body p-4'>
                <h4 className='fw-bold mb-3 d-flex align-items-center'>
                  <FaMapMarkerAlt className='me-2' /> Nearby Ambulances
                </h4>

                {/* Ambulance List */}
                {!loadingAmbulances &&
                  ambulances.length > 0 &&
                  ambulances.map((ambulance) => (
                    <div key={ambulance.id} className='ambulance-card'>
                      <div>
                        <h6 className='fw-bold mb-1'>{ambulance.hospital_name}</h6>
                        <p className='small text-muted mb-0'>Approx. {Number(ambulance.distance).toFixed(2)} km away</p>
                      </div>
                      <div className='text-end'>
                        {ambulance.status === "Available" && !hasActiveBooking && (
                          <>
                            <span className='badge ambulance-status available'>Available</span>
                            <button
                              className='btn btn-sm btn-danger request-ambulance-btn'
                              onClick={() => handleRequestAmbulance(ambulance)}>
                              Request Ambulance
                            </button>
                          </>
                        )}
                        {ambulance.status === "BookedByMe" && (
                          <button className='btn btn-outline-danger' onClick={() => handleCancelBooking(ambulance)}>
                            Cancel Booking
                          </button>
                        )}

                        {ambulance.status === "Booked" && <span>Busy</span>}
                      </div>
                    </div>
                  ))}

                {!loadingAmbulances && ambulances.length === 0 && locationStatus === "success" && (
                  <p className='text-muted'>No available ambulances found within a 25km radius.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
