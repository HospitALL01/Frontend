import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import "../index.css";
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

// Payment method components
const PaymentLogo = ({ method, onClick, disabled, isSelected }) => (
  <div
    className={`payment-logo-wrapper ${disabled ? "disabled" : ""} ${
      isSelected ? "selected" : ""
    }`}
    onClick={!disabled ? () => onClick(method) : undefined}
  >
    <span className={`payment-logo-text ${method.toLowerCase()}`}>
      {method}
    </span>
  </div>
);

// Calendar component
const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date(); // Get today's date

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
        {days.map((day) => {
          const isDisabled = day < today; // Compare with today's date
          const isTodayDay = isToday(day);
          const isSelected =
            selectedDate &&
            format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <div
              key={day}
              className={`day ${
                !isSameMonth(day, monthStart) ? "disabled" : ""
              } ${isTodayDay ? "today" : ""} ${isSelected ? "selected" : ""} ${
                isDisabled ? "disabled" : ""
              }`}
              onClick={() => !isDisabled && setSelectedDate(day)} // Prevent click on disabled dates
            >
              {getDate(day)}
            </div>
          );
        })}
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

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("mobile"); // Track active tab for Mobile Banking and Card/Other
  const [availableTimes, setAvailableTimes] = useState([]); // Holds available time slots

  // Generate random consultation fee for the doctor (range 10-15)
  const generateRandomConsultationFee = (doctorEmail) => {
    const storedFee = localStorage.getItem(`doctor_fee_${doctorEmail}`);
    if (storedFee) {
      return parseInt(storedFee); // Return the stored fee if available
    } else {
      const randomFee = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
      localStorage.setItem(`doctor_fee_${doctorEmail}`, randomFee); // Save the fee for this specific doctor
      return randomFee;
    }
  };

  // If doctor data is not passed via state, fetch it from the API
  useEffect(() => {
    if (state?.doctor) {
      const updatedDoctor = { ...state.doctor };
      updatedDoctor.consultationFee = generateRandomConsultationFee(
        updatedDoctor.email
      ); // Set unique fee
      setDoctor(updatedDoctor);
      setAvailableTimes(generateAvailableTimes(updatedDoctor)); // Set available time slots for the doctor
    } else {
      const fetchDoctorData = async () => {
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/doctor-info/doctor@example.com",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await response.json();

          const fetchedDoctor = data.data;
          fetchedDoctor.consultationFee = generateRandomConsultationFee(
            fetchedDoctor.email
          ); // Assign unique fee

          setDoctor(fetchedDoctor);
          setAvailableTimes(generateAvailableTimes(fetchedDoctor)); // Set available time slots for the doctor
        } catch (error) {
          console.error("Error fetching doctor data:", error);
        }
      };

      fetchDoctorData();
    }
  }, [state?.doctor]);

  // Generate available time slots for the doctor (fixed range of hours)
  const generateAvailableTimes = (doctor) => {
    const startHour = 9; // Example start hour (9 AM)
    const endHour = 17; // Example end hour (5 PM)
    let times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      times.push(formattedHour);
    }
    return times;
  };

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

  const serviceFee = 25; // Example service fee in BDT
  const consultationFee = doctor.consultationFee || 30; // Use the dynamically generated fee
  const totalAmount = consultationFee + serviceFee; // Calculate total fee

  const handlePayment = async () => {
    if (!selectedPaymentMethod || !selectedDate || !selectedTime) {
      alert("Please fill all the fields.");
      return;
    }

    const paymentData = {
      patient_name: localStorage.getItem("user_name"),
      doctor_name: doctor.name,
      appointment_date: format(selectedDate, "yyyy-MM-dd"),
      appointment_time: selectedTime,
      payment_method: selectedPaymentMethod,
      fees: totalAmount,
      doctor_id: doctor.id,
      patient_id: localStorage.getItem("user_id"),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      if (response.ok) {
        setPaymentSuccess(true);
        alert(`Payment successful with ${selectedPaymentMethod}!`);
        navigate("/home"); // Navigate to home after payment
      } else {
        alert(data.message || "Error processing payment.");
      }
    } catch (error) {
      alert("An error occurred while processing the payment.");
      console.error("Error:", error);
    }
  };

  // Handle selecting a payment method
  const handlePaymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method); // Update the payment method state
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* Left Column for Booking Actions */}
        <div className="col-lg-7">
          <h2 className="fw-bold mb-4">
            Book Your Appointment with Dr. {doctor.name}
          </h2>
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4 d-flex align-items-center">
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
          </div>
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <label className="form-label fw-semibold">Select Date</label>
              <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
          </div>
          <div className="card shadow-sm border-0 mt-4">
            <div className="card-body p-4">
              <label className="form-label fw-semibold">Select Time</label>
              <div className="d-flex flex-wrap gap-3">
                {availableTimes.map((time, index) => (
                  <button
                    key={index}
                    className={`btn btn-outline-secondary ${
                      selectedTime === time ? "active" : ""
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

        {/* Right Column for Summary & Payment */}
        <div className="col-lg-5">
          <h2 className="fw-bold mb-4">Summary & Payment</h2>
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="billing-summary mb-4">
                <h5 className="fw-semibold">Billing Summary</h5>
                {selectedDate ? (
                  <>
                    <p className="d-flex align-items-center mb-2">
                      <FaCalendarAlt className="me-2 text-primary" />
                      <strong>Date:</strong>&nbsp;{" "}
                      {format(selectedDate, "eeee, MMM dd")}
                    </p>
                    <p className="d-flex align-items-center mb-2">
                      <FaClock className="me-2 text-primary" />
                      <strong>Time:</strong>&nbsp;{" "}
                      {selectedTime || "Not selected"}
                    </p>
                  </>
                ) : (
                  <p className="text-muted">Please select a date.</p>
                )}
                <hr />
                <div className="d-flex justify-content-between text-muted">
                  <p>Consultation Fee</p>
                  <p>৳{consultationFee}</p>
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

              <h5 className="fw-semibold">Choose Payment Method</h5>
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
                    Card / Other
                  </button>
                </li>
              </ul>

              {activeTab === "mobile" && (
                <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
                  <PaymentLogo
                    method="bKash"
                    onClick={handlePaymentMethodSelection}
                    disabled={!selectedDate || !selectedTime}
                    isSelected={selectedPaymentMethod === "bKash"}
                  />
                  <PaymentLogo
                    method="Nagad"
                    onClick={handlePaymentMethodSelection}
                    disabled={!selectedDate || !selectedTime}
                    isSelected={selectedPaymentMethod === "Nagad"}
                  />
                  <PaymentLogo
                    method="Rocket"
                    onClick={handlePaymentMethodSelection}
                    disabled={!selectedDate || !selectedTime}
                    isSelected={selectedPaymentMethod === "Rocket"}
                  />
                </div>
              )}

              {activeTab === "card" && (
                <p className="text-center unavailable-message">
                  This method is currently unavailable.
                </p>
              )}

              <div className="d-grid mt-4">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handlePayment}
                  disabled={
                    !selectedDate || !selectedTime || !selectedPaymentMethod
                  }
                >
                  Pay ৳{totalAmount}
                </button>
              </div>

              {paymentSuccess && (
                <div className="mt-4 alert alert-success">
                  Payment Successful! Thank you for booking with Dr.{" "}
                  {doctor.name}.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
