import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCalendarAlt } from "react-icons/fa";
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

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

/* ---------------- Helpers ---------------- */
const normalizeDoctor = (raw) => {
  if (!raw || typeof raw !== "object") return null;
  const id = raw.id ?? raw.d_id ?? raw.doctor_id ?? null;
  const name =
    raw.d_name ?? raw.name ?? raw.doctor_name ?? raw.doctorName ?? null;
  const email = raw.d_email ?? raw.email ?? null;
  const specialization =
    raw.specialization ?? raw.speciality ?? raw.department ?? "Specialist";
  return name || id || email ? { id, name, email, specialization } : null;
};

// patient id/name পড়ার সেফ হেল্পার
const getPatientFromStorage = () => {
  const raw = localStorage.getItem("user");
  let user = {};
  try {
    user = raw ? JSON.parse(raw) : {};
  } catch {}
  const id =
    Number(localStorage.getItem("user_id")) ||
    Number(user?.id) ||
    Number(user?.user?.id) ||
    Number(user?.patient?.id);
  const name =
    localStorage.getItem("user_name") ||
    user?.p_name ||
    user?.name ||
    user?.user?.name ||
    user?.patient?.p_name ||
    "Patient";
  return { id, name };
};

const PaymentLogo = ({ method, onClick, disabled, isSelected }) => (
  <div
    className={`payment-logo-wrapper ${disabled ? "disabled" : ""} ${
      isSelected ? "selected" : ""
    }`}
    onClick={!disabled ? () => onClick(method) : undefined}
    role="button"
    aria-label={`Pay with ${method}`}
    style={{ userSelect: "none" }}
  >
    <span className={`payment-logo-text ${method.toLowerCase()}`}>
      {method}
    </span>
  </div>
);

/* ---------------- Calendar ---------------- */
const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const renderHeader = () => (
    <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
      >
        &lt;
      </button>
      <span className="fw-semibold">{format(currentMonth, "MMMM yyyy")}</span>
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
      >
        &gt;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return (
      <div className="calendar-grid days d-flex justify-content-between">
        {days.map((day) => (
          <div key={day} className="text-center fw-bold">
            {day}
          </div>
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
      <div className="calendar-grid d-flex flex-wrap">
        {days.map((day) => {
          const disabled = day < today.setHours(0, 0, 0, 0);
          const todayFlag = isToday(day);
          const isSelected =
            selectedDate &&
            format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <div
              key={day.toISOString()}
              className={`day p-2 text-center border m-1 rounded ${
                !isSameMonth(day, monthStart) ? "text-muted" : ""
              } ${todayFlag ? "bg-primary text-white" : ""} ${
                isSelected ? "border border-3 border-success" : ""
              } ${disabled ? "text-muted disabled" : "cursor-pointer"}`}
              onClick={() => !disabled && setSelectedDate(day)}
              style={{ width: 40, height: 40, lineHeight: "36px" }}
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

/* --------------- Booking Page --------------- */
export default function BookingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [doctor, setDoctor] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // 1) Router state
    if (state?.doctor) {
      const norm = normalizeDoctor(state.doctor);
      if (norm) {
        setDoctor({ ...norm, consultationFee: guessFee(norm.email) });
        return;
      }
    }
    // 2) LocalStorage cache
    const cached = localStorage.getItem("selected_doctor");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const norm = normalizeDoctor(parsed);
        if (norm) {
          setDoctor({ ...norm, consultationFee: guessFee(norm.email) });
        }
      } catch {}
    }
  }, [state?.doctor]);

  const guessFee = (email) => {
    const key = `doctor_fee_${email || "unknown"}`;
    const stored = localStorage.getItem(key);
    if (stored) return Number(stored);
    const rnd = Math.floor(Math.random() * 6) + 10; // 10–15
    localStorage.setItem(key, String(rnd));
    return rnd;
  };

  const serviceFee = 25;
  const consultationFee = doctor?.consultationFee ?? 30;
  const totalAmount = consultationFee + serviceFee;

  const handlePayment = async () => {
    if (!selectedPaymentMethod || !selectedDate) {
      alert("Please fill all the fields.");
      return;
    }

    // ✅ Patient info robustly read
    const { id: patientId, name: patientName } = getPatientFromStorage();
    if (!patientId || Number.isNaN(patientId)) {
      alert("Patient ID missing/invalid. Please login again.");
      return;
    }

    // ✅ id থাকলে নেবে; না থাকলেও email + name থাকলেই চলবে (backend resolve করবে)
    if (!doctor?.name || !(doctor?.id || doctor?.email)) {
      alert("Doctor info incomplete. Please reselect the doctor.");
      return;
    }

    // (চাইলে শেষ দুই নির্বাচন লোকালস্টোরেজে রেখে দিতে পারেন)
    // localStorage.setItem("last_payment_method", selectedPaymentMethod);
    // localStorage.setItem("last_booking_date", format(selectedDate, "yyyy-MM-dd"));

    const payload = {
      patient_name: patientName,
      doctor_name: doctor.name,
      appointment_date: format(selectedDate, "yyyy-MM-dd"),
      payment_method: selectedPaymentMethod,
      fees: totalAmount,
      doctor_id: doctor.id ?? null,
      doctor_email: doctor.email ?? null, // backend fallback
      patient_id: patientId,
    };

    try {
      const res = await fetch(`${API_BASE}/api/book-appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        setPaymentSuccess(true);
        alert(`Booking successful with ${selectedPaymentMethod}!`);
        navigate("/home");
      } else {
        alert(data?.message || "Error processing booking.");
        console.error("Booking error:", data);
      }
    } catch (e) {
      alert("An error occurred while processing the booking.");
      console.error(e);
    }
  };

  if (!doctor?.name || !(doctor?.id || doctor?.email)) {
    return (
      <div className="container text-center py-5">
        <h2 className="fw-bold text-danger">Doctor not selected</h2>
        <p className="text-muted">
          Doctor info is missing. Please go back and select a doctor again.
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

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* Left */}
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
                  aria-hidden="true"
                >
                  <path d="M50,10A40,40,0,1,1,10,50,40,40,0,0,1,50,10M50,0A50,50,0,1,0,100,50,50,50,0,0,0,50,0Z" />
                  <path d="M50,60A20,20,0,1,1,70,40,20,20,0,0,1,50,60Z" />
                  <path d="M50,70A30,30,0,0,1,20,100H80A30,30,0,0,1,50,70Z" />
                </svg>
              </div>
              <div>
                <h5 className="fw-semibold mb-1">{doctor.name}</h5>
                <p className="mb-0 text-muted">{doctor.specialization}</p>
                <p className="mb-0 text-muted">
                  Consultation Fee: {consultationFee} BDT
                </p>
              </div>
            </div>
          </div>

          <h5 className="fw-semibold mb-3">
            Select Appointment Date <FaCalendarAlt />
          </h5>
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <h5 className="fw-semibold mt-4 mb-3">Select Payment Method</h5>
          <div className="d-flex gap-3 mb-4">
            {["Mobile", "Credit Card", "Bkash"].map((m) => (
              <PaymentLogo
                key={m}
                method={m}
                onClick={setSelectedPaymentMethod}
                disabled={false}
                isSelected={selectedPaymentMethod === m}
              />
            ))}
          </div>

          <button className="btn btn-success btn-lg" onClick={handlePayment}>
            Pay {totalAmount} BDT & Book
          </button>
        </div>

        {/* Right */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="fw-bold mb-3">Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Consultation Fee:</span>
              <span>{consultationFee} BDT</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Service Fee:</span>
              <span>25 BDT</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>{totalAmount} BDT</span>
            </div>
            {paymentSuccess && (
              <div className="alert alert-success mt-3 mb-0" role="alert">
                Booking confirmed!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
