import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserMd, FaCalendarAlt, FaClock } from "react-icons/fa";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  getDate,
} from "date-fns";
import "../index.css";

// --- Payment Method Logos (unchanged) ---
const BkashLogo = () => <span className="payment-logo-text bkash">bKash</span>;
const NagadLogo = () => <span className="payment-logo-text nagad">Nagad</span>;
const RocketLogo = () => (
  <span className="payment-logo-text rocket">Rocket</span>
);

// ✅ 1. ADD CALENDAR COMPONENT (Moved from DoctorProfile)
const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const renderHeader = () => (
    <div className="calendar-header">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
        &lt;
      </button>
      <span>{format(currentMonth, "MMMM yyyy")}</span>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
        &gt;
      </button>
    </div>
  );
  const renderDays = () => {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return (
      <div className="calendar-grid days">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
    );
  };
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth),
      monthEnd = endOfMonth(monthStart),
      startDate = startOfWeek(monthStart),
      endDate = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    return (
      <div className="calendar-grid">
        {days.map((day) => (
          <div
            key={day}
            className={`day ${
              !isSameMonth(day, monthStart) ? "disabled" : ""
            } ${isToday(day) ? "today" : ""} ${
              selectedDate &&
              format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                ? "selected"
                : ""
            }`}
            onClick={() => setSelectedDate(day)}
          >
            {getDate(day)}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default function BookingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ 2. ADD STATE FOR DATE AND TIME SELECTION
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeTab, setActiveTab] = useState("mobile");

  const { doctor } = state || {};

  if (!doctor) {
    return (
      <div className="container text-center py-5">
        <h2 className="fw-bold text-danger">Invalid Booking</h2>
        <p className="text-muted">
          No doctor details found. Please select a doctor first.
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

  const serviceFee = 25;
  const totalAmount = doctor.consultationFee + serviceFee;

  const handlePayment = () => {
    alert(
      `Thank you for booking with ${doctor.name} on ${format(
        selectedDate,
        "MMMM dd"
      )} at ${selectedTime}!`
    );
    navigate("/home");
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* ✅ 3. MODIFIED: Left Column is now for Booking Actions */}
        <div className="col-lg-7">
          <h2 className="fw-bold mb-4">Book Your Appointment</h2>
          {/* Appointment Details */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4 d-flex align-items-center">
              <div className="doctor-img-placeholder me-3">
                {/* SVG placeholder */}
              </div>
              <div>
                <h5 className="mb-0">{doctor.name}</h5>
                <p className="text-muted mb-0">{doctor.specialty}</p>
              </div>
            </div>
          </div>
          {/* Calendar and Time Slots */}
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <label className="form-label fw-semibold">Select Date</label>
              <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <label className="form-label fw-semibold mt-4">
                Available Times
              </label>
              <div className="time-slot-grid">
                {doctor.availableTimes.map((time) => (
                  <button
                    key={time}
                    className={`btn time-slot ${
                      selectedTime === time ? "selected" : ""
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ 4. MODIFIED: Right Column is for Summary & Payment */}
        <div className="col-lg-5">
          <h2 className="fw-bold mb-4">Summary & Payment</h2>
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              {/* Billing Summary */}
              <div className="billing-summary mb-4">
                <h5 className="fw-semibold">Billing Summary</h5>
                {selectedDate && selectedTime ? (
                  <>
                    <p className="d-flex align-items-center mb-2">
                      <FaCalendarAlt className="me-2 text-primary" />
                      <strong>Date:</strong>&nbsp;{" "}
                      {format(selectedDate, "eeee, MMM dd")}
                    </p>
                    <p className="d-flex align-items-center">
                      <FaClock className="me-2 text-primary" />
                      <strong>Time:</strong>&nbsp; {selectedTime}
                    </p>
                  </>
                ) : (
                  <p className="text-muted">Please select a date and time.</p>
                )}
                <hr />
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
              {/* Payment Methods */}
              <h5 className="fw-semibold">Choose Payment Method</h5>
              <ul className="nav nav-pills nav-fill mb-4">
                {/* Tabs for payment */}
              </ul>
              <div>{/* Payment tab content */}</div>
              <div className="d-grid mt-4">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handlePayment}
                  disabled={!selectedDate || !selectedTime}
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
