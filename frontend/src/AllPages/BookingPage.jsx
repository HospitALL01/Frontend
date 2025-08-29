import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserMd, FaCalendarAlt, FaClock, FaCreditCard } from "react-icons/fa";
import { format } from "date-fns";
import "../index.css"; 

// --- Payment Method Logos (Placeholders) ---
// In a real app, you would use actual SVG or image files for these.
const BkashLogo = () => <span className="payment-logo-text bkash">bKash</span>;
const NagadLogo = () => <span className="payment-logo-text nagad">Nagad</span>;
const RocketLogo = () => (
  <span className="payment-logo-text rocket">Rocket</span>
);

export default function BookingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("mobile");

  // Destructure booking details from the state passed during navigation
  const { doctor, date, time } = state || {};

  // If the page is accessed directly without booking details, show an error and redirect.
  if (!doctor || !date || !time) {
    return (
      <div className="container text-center py-5">
        <h2 className="fw-bold text-danger">Invalid Booking</h2>
        <p className="text-muted">
          No appointment details found. Please select a doctor and a time slot
          first.
        </p>
        <button
          onClick={() => navigate("/find-doctors")}
          className="btn btn-primary"
        >
          Find a Doctor
        </button>
      </div>
    );
  }

  const serviceFee = 25; // Example service fee
  const totalAmount = doctor.consultationFee + serviceFee;

  const handlePayment = () => {
    // In a real application, this is where you would trigger the payment gateway API.
    alert(
      `Thank you for your booking! \n\nA confirmation will be sent to your email shortly.`
    );
    navigate("/home");
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* Left Column: Booking Summary */}
        <div className="col-lg-7">
          <h2 className="fw-bold mb-4">Confirm Your Appointment</h2>
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h4 className="fw-semibold mb-3">Appointment Details</h4>
              <div className="d-flex align-items-center mb-3">
                <div className="doctor-img-placeholder me-3">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 100 100"
                    fill="#e9ecef"
                  >
                    <path d="M50,10A40,40,0,1,1,10,50,40,40,0,0,1,50,10M50,0A50,50,0,1,0,100,50,50,50,0,0,0,50,0Z" />
                    <path d="M50,60A20,20,0,1,1,70,40,20,20,0,0,1,50,60Z" />
                    <path d="M50,70A30,30,0,0,1,20,100H80A30,30,0,0,1,50,70Z" />
                  </svg>
                </div>
                <div>
                  <h5 className="mb-0">{doctor.name}</h5>
                  <p className="text-muted mb-0">{doctor.specialty}</p>
                </div>
              </div>
              <hr />
              <p className="d-flex align-items-center mb-2">
                <FaCalendarAlt className="me-2 text-primary" />
                <strong>Date:</strong>&nbsp;{" "}
                {format(date, "eeee, MMMM dd, yyyy")}
              </p>
              <p className="d-flex align-items-center">
                <FaClock className="me-2 text-primary" />
                <strong>Time:</strong>&nbsp; {time}
              </p>
              <hr />
              <h4 className="fw-semibold mb-3">Billing Summary</h4>
              <div className="d-flex justify-content-between text-muted">
                <p>Consultation Fee</p>
                <p>৳{doctor.consultationFee}</p>
              </div>
              <div className="d-flex justify-content-between text-muted">
                <p>Service Fee</p>
                <p>৳{serviceFee}</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <p>Total Amount</p>
                <p>৳{totalAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Methods */}
        <div className="col-lg-5">
          <h2 className="fw-bold mb-4">Choose Payment Method</h2>
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              {/* Payment Tabs */}
              <ul className="nav nav-pills nav-fill mb-4">
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "mobile" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("mobile")}
                  >
                    Mobile Banking
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "card" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("card")}
                  >
                    Card
                  </button>
                </li>
              </ul>

              {/* Tab Content */}
              <div>
                {activeTab === "mobile" && (
                  <div>
                    <p className="text-center text-muted">Select a provider:</p>
                    <div className="d-flex justify-content-center gap-3 mb-4">
                      <BkashLogo />
                      <NagadLogo />
                      <RocketLogo />
                    </div>
                    <p className="small text-center">
                      You will be redirected to complete the payment securely.
                    </p>
                  </div>
                )}
                {activeTab === "card" && (
                  <div>
                    <div className="mb-3">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Card Holder Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">CVC</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="d-grid mt-4">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handlePayment}
                >
                  Pay ৳{totalAmount}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
