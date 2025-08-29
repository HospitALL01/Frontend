import React, { useState } from "react";
// ✅ 1. Import 'useNavigate' along with 'useParams'
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaStar,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
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
import { doctors } from "../data/doctors";

// --- Calendar Component (This section is unchanged) ---
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
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
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

// --- Main Component ---
export default function DoctorProfile() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const { id } = useParams();

  // ✅ 2. Initialize the navigate hook
  const navigate = useNavigate();

  const doctorData = doctors.find((doc) => doc.id === parseInt(id));

  if (!doctorData) {
    return (
      <div className="container text-center py-5">
        <h2>Doctor Not Found</h2>
        <p>The profile you are looking for does not exist.</p>
      </div>
    );
  }

  // ✅ 3. Create a handler function to navigate with data
  const handleBookAppointment = () => {
    navigate("/book-now", {
      state: {
        doctor: doctorData,
        date: selectedDate,
        time: selectedTime,
      },
    });
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Left Column: Doctor Details */}
        <div className="col-lg-8">
          {/* Main Info Card */}
          <div className="card shadow-sm border-0 p-4 mb-4 doctor-profile-card">
            {/* (No changes in this section) */}
            <div className="d-flex align-items-start">
              <div className="doctor-img-placeholder me-4">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="#e9ecef"
                >
                  <path d="M50,10A40,40,0,1,1,10,50,40,40,0,0,1,50,10M50,0A50,50,0,1,0,100,50,50,50,0,0,0,50,0Z" />
                  <path d="M50,60A20,20,0,1,1,70,40,20,20,0,0,1,50,60Z" />
                  <path d="M50,70A30,30,0,0,1,20,100H80A30,30,0,0,1,50,70Z" />
                </svg>
              </div>
              <div className="flex-grow-1">
                <h2 className="fw-bold mb-1">{doctorData.name}</h2>
                <p className="text-primary fw-semibold">
                  {doctorData.specialty}
                </p>
                <div className="d-flex flex-wrap align-items-center text-muted small gap-3 mb-3">
                  <span className="d-flex align-items-center text-warning fw-bold">
                    <FaStar className="me-1" /> {doctorData.rating} (
                    {doctorData.reviewsCount} reviews)
                  </span>
                  <span className="d-flex align-items-center">
                    <FaBriefcase className="me-1" /> {doctorData.experience}
                  </span>
                  <span className="d-flex align-items-center">
                    <FaMapMarkerAlt className="me-1" /> {doctorData.location}
                  </span>
                </div>
                <p className="fw-bold fs-5 mb-0">
                  Consultation Fee: ${doctorData.consultationFee}
                </p>
              </div>
            </div>
          </div>

          {/* About, Qualifications, Reviews Cards (No changes here) */}
          <div className="card shadow-sm border-0 p-4 mb-4 profile-section-card">
            <h4 className="fw-bold mb-3">About</h4>
            <p className="text-muted">{doctorData.about}</p>
          </div>
          <div className="card shadow-sm border-0 p-4 mb-4 profile-section-card">
            <h4 className="fw-bold mb-3 d-flex align-items-center">
              <FaGraduationCap className="me-2 text-primary" />
              Qualifications
            </h4>
            <ul className="list-unstyled">
              {doctorData.qualifications.map((q, index) => (
                <li key={index} className="mb-2">
                  <p className="fw-semibold mb-0">{q.degree}</p>
                  <p className="text-muted small">{q.institution}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="card shadow-sm border-0 p-4 profile-section-card">
            <h4 className="fw-bold mb-3">Patient Reviews</h4>
            {doctorData.reviews.map((review, index) => (
              <div key={index} className="review-item mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="fw-semibold mb-0">{review.name}</p>
                  <span className="text-muted small">{review.date}</span>
                </div>
                <div className="text-warning my-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-muted small">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Booking */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4 mb-4">
            <h4 className="fw-bold mb-3">Book Appointment</h4>
            <label className="form-label fw-semibold">Select Date</label>
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            <label className="form-label fw-semibold mt-4">
              Available Times
            </label>
            <div className="time-slot-grid">
              {doctorData.availableTimes.map((time) => (
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

            {/* ✅ 4. The button now calls the handler on click */}
            <button
              className="btn btn-primary w-100 mt-4"
              disabled={!selectedDate || !selectedTime}
              onClick={handleBookAppointment}
            >
              Book Appointment
            </button>
          </div>

          <div className="card shadow-sm border-0 p-4">
            {/* (No changes in this section) */}
            <h5 className="fw-bold mb-3">Contact Information</h5>
            <p className="text-muted d-flex align-items-center mb-2">
              <FaPhone className="me-2 text-primary" /> +1 (555) 123-4567
            </p>
            <p className="text-muted d-flex align-items-center mb-2">
              <FaEnvelope className="me-2 text-primary" />{" "}
              dr.johnson@citymedical.com
            </p>
            <p className="text-muted d-flex align-items-center mb-0">
              <FaMapMarkerAlt className="me-2 text-primary" />{" "}
              {doctorData.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
