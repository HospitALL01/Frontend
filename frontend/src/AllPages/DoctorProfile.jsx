import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
} from "react-icons/fa";
import "../index.css";

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function DoctorProfile() {
  const { email } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const doctorFromState = location.state?.doctor;

  const [doctorData, setDoctorData] = useState(doctorFromState || null);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState(null);

  useEffect(() => {
    if (!doctorFromState) {
      (async () => {
        try {
          const res = await fetch(`${API_BASE}/api/doctor-info/${email}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await res.json();
          if (res.ok) {
            setDoctorData(data.data);
            setReviews(data.data?.reviews || []);
          } else {
            setError(data?.message || "Failed to fetch doctor data.");
          }
        } catch {
          setError("An error occurred while fetching doctor data.");
        }
      })();
    }
  }, [doctorFromState, email]);

  // ✅ id না থাকলেও name + email থাকলেই booking এ পাঠাবো
  const handleBookAppointment = () => {
    if (!doctorData) {
      alert("Doctor info is not available.");
      return;
    }

    const payload = {
      // id থাকলে ভালো, না থাকলেও সমস্যা নেই
      id: doctorData.id ?? doctorData.d_id ?? doctorData.doctor_id ?? null,
      name:
        doctorData.d_name ??
        doctorData.name ??
        doctorData.doctor_name ??
        doctorData.doctorName ??
        null,
      email: doctorData.d_email ?? doctorData.email ?? email ?? null,
      specialization:
        doctorData.specialization ??
        doctorData.speciality ??
        doctorData.department ??
        "Specialist",
    };

    if (!payload.name || !payload.email) {
      alert("Doctor info incomplete. Please reselect the doctor.");
      return;
    }

    localStorage.setItem("selected_doctor", JSON.stringify(payload));
    navigate("/booking", { state: { doctor: payload } });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError(null);
    if (!doctorData?.email) {
      alert("Doctor email is not available.");
      return;
    }
    try {
      const res = await fetch(
        `${API_BASE}/api/doctor-info/${doctorData.email}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ rating, comment }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setReviews([
          ...reviews,
          {
            rating,
            comment,
            name: localStorage.getItem("user_name"),
            date: new Date().toLocaleDateString(),
          },
        ]);
        setRating(0);
        setComment("");
        alert(data.message);
      } else setReviewError(data.message || "Error submitting review.");
    } catch (err) {
      setReviewError("An error occurred while submitting your review.");
      console.error(err);
    }
  };

  if (error)
    return (
      <div className="container text-center py-5">
        <h2>{error}</h2>
      </div>
    );
  if (!doctorData)
    return (
      <div className="container text-center py-5">
        <h2>Doctor Not Found</h2>
        <p className="text-muted">
          The profile of this doctor is not available.
        </p>
      </div>
    );

  return (
 
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-10'>
          {/* Profile Details */}
          <div className='card shadow-sm border-0 p-4 mb-4 doctor-profile-card'>
            <div className='d-flex flex-column flex-md-row align-items-center'>
              <div className='doctor-img-placeholder me-md-4 mb-3 mb-md-0'>
                {doctorData.profile_picture_url ? (
                  <img src={doctorData.profile_picture_url} alt={doctorData.doctorName} className="doctor-profile-pic" />
                ) : (
                <svg width='100' height='100' viewBox='0 0 100 100' fill='#e9ecef'>
                  <path d='M50,10A40,40,0,1,1,10,50,40,40,0,0,1,50,10M50,0A50,50,0,1,0,100,50,50,50,0,0,0,50,0Z' />
                  <path d='M50,60A20,20,0,1,1,70,40,20,20,0,0,1,50,60Z' />
                  <path d='M50,70A30,30,0,0,1,20,100H80A30,30,0,0,1,50,70Z' />

    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0 p-4 mb-4 doctor-profile-card">
            <div className="d-flex flex-column flex-md-row align-items-center">
              <div className="doctor-img-placeholder me-md-4 mb-3 mb-md-0">
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
                )}
              </div>
              <div className="flex-grow-1 text-center text-md-start">
                <h2 className="fw-bold mb-1">
                  {doctorData.doctorName ||
                    doctorData.d_name ||
                    doctorData.name ||
                    "Doctor"}
                </h2>
                <p className="text-primary fw-semibold">
                  {doctorData.specialization}
                </p>
                <div className="d-flex flex-wrap justify-content-center justify-content-md-start align-items-center text-muted small gap-3 mb-3">
                  <span className="d-flex align-items-center text-warning fw-bold">
                    <FaStar className="me-1" /> {doctorData.rating || 4.9} (
                    {doctorData.reviewsCount || 0} reviews)
                  </span>
                  <span className="d-flex align-items-center">
                    <FaBriefcase className="me-1" />{" "}
                    {doctorData.yearsOfExperience || "Experience not specified"}
                  </span>
                  <span className="d-flex align-items-center">
                    <FaMapMarkerAlt className="me-1" />{" "}
                    {doctorData.hospitalName || "Hospital not specified"}
                  </span>
                </div>
                <p className="fw-bold fs-5 mb-0">
                  Consultation Fee: ${doctorData.consultationFee || 30}
                </p>
              </div>
            </div>
          </div>

          {/* Book */}
          <div className="card shadow-sm border-0 p-4 mb-4 profile-section-card">
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={handleBookAppointment}
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Reviews (rest of your UI)… */}
          {/* ... keep your existing reviews code ... */}
        </div>
      </div>
    </div>
  );
}
