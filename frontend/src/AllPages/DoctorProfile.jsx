import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import { FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaStar } from "react-icons/fa";
import "../index.css";

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function DoctorProfile() {
  const { email } = useParams(); // Fetching the doctor email from the URL
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate for redirecting
  const doctorFromState = location.state?.doctor;

  const [doctorData, setDoctorData] = useState(doctorFromState || null); // Use state data if available
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctorFromState) {
      const fetchDoctorData = async () => {
        try {
          const response = await fetch(`${API_BASE}/api/doctor-info/${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
            },
          });

          if (response.ok) {
            const data = await response.json();
            setDoctorData(data.data);
          } else {
            const errorData = await response.json();
            setError(errorData?.message || "Failed to fetch doctor data.");
          }
        } catch (error) {
          setError("An error occurred while fetching doctor data.");
        }
      };

      fetchDoctorData();
    }
  }, [doctorFromState, email]);

  const handleBookAppointment = () => {
    // Redirect to the booking page and pass the doctor data to it
    navigate("/book-now", { state: { doctor: doctorData } });
  };

  if (error) {
    return (
      <div className='container text-center py-5'>
        <h2>{error}</h2>
      </div>
    );
  }

  if (!doctorData) {
    return (
      <div className='container text-center py-5'>
        <h2>Doctor Not Found</h2>
        <p className='text-muted'>The profile of this doctor is not available.</p>
      </div>
    );
  }

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-10'>
          {/* Profile Details */}
          <div className='card shadow-sm border-0 p-4 mb-4 doctor-profile-card'>
            <div className='d-flex flex-column flex-md-row align-items-center'>
              <div className='doctor-img-placeholder me-md-4 mb-3 mb-md-0'>
                {/* Image Placeholder */}
                <svg width='100' height='100' viewBox='0 0 100 100' fill='#e9ecef'>
                  <path d='M50,10A40,40,0,1,1,10,50,40,40,0,0,1,50,10M50,0A50,50,0,1,0,100,50,50,50,0,0,0,50,0Z' />
                  <path d='M50,60A20,20,0,1,1,70,40,20,20,0,0,1,50,60Z' />
                  <path d='M50,70A30,30,0,0,1,20,100H80A30,30,0,0,1,50,70Z' />
                </svg>
              </div>

              <div className='flex-grow-1 text-center text-md-start'>
                <h2 className='fw-bold mb-1'>{doctorData.doctorName}</h2>
                <p className='text-primary fw-semibold'>{doctorData.specialization}</p>

                <div className='d-flex flex-wrap justify-content-center justify-content-md-start align-items-center text-muted small gap-3 mb-3'>
                  <span className='d-flex align-items-center text-warning fw-bold'>
                    <FaStar className='me-1' /> {doctorData.rating || 4.9} ({doctorData.reviewsCount || 0} reviews)
                  </span>
                  <span className='d-flex align-items-center'>
                    <FaBriefcase className='me-1' /> {doctorData.yearsOfExperience || "Experience not specified"}
                  </span>
                  <span className='d-flex align-items-center'>
                    <FaMapMarkerAlt className='me-1' /> {doctorData.hospitalName || "Hospital not specified"}
                  </span>
                </div>

                <p className='fw-bold fs-5 mb-0'>Consultation Fee: ${doctorData.consultationFee || 30}</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          {doctorData.about && (
            <div className='card shadow-sm border-0 p-4 mb-4 profile-section-card'>
              <h4 className='fw-bold mb-3'>About</h4>
              <p className='text-muted'>{doctorData.about}</p>
            </div>
          )}

          {/* Qualifications, Specialization, Current Position, Previous Position */}
          <div className='card shadow-sm border-0 p-4 mb-4 profile-section-card'>
            <h4 className='fw-bold mb-3 d-flex align-items-center'>
              <FaGraduationCap className='me-2 text-primary' />
              Qualifications
            </h4>
            <ul className='list-unstyled'>
              {/* Displaying Qualifications */}
              {doctorData.qualifications?.map((q, index) => (
                <li key={index} className='mb-2'>
                  <p className='fw-semibold mb-0'>{q.degree}</p>
                  <p className='text-muted small'>{q.institution}</p>
                </li>
              ))}

              {/* Displaying Specialization, Current and Previous Positions */}
              <li>
                <p className='fw-semibold mb-0'>Specialization: {doctorData.specialization || "Not Available"}</p>
                <p className='fw-semibold mb-0'>Current Position: {doctorData.currentPosition || "Not Available"}</p>
                <p className='fw-semibold mb-0'>
                  Previous Positions: {doctorData.previousPositions || "Not Available"}
                </p>
              </li>
            </ul>
          </div>

          {/* Book Appointment Button */}
          <div className='card shadow-sm border-0 p-4 mb-4 profile-section-card'>
            <div className='text-center'>
              <button className='btn btn-success' onClick={handleBookAppointment}>
                Book Appointment
              </button>
            </div>
          </div>

          {/* Patient Reviews */}
          <div className='card shadow-sm border-0 p-4 profile-section-card'>
            <h4 className='fw-bold mb-3'>Patient Reviews</h4>
            <div className='mb-4 p-3 bg-light border rounded'>
              <h5 className='mb-3'>Leave a Review</h5>
              <form>
                {/* Rating and comment form */}
                <div className='mb-3'>
                  <label className='form-label fw-semibold'>Your Rating</label>
                  <div className='star-rating'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className={`star ${star <= (doctorData.rating || 0) ? "active" : ""}`} />
                    ))}
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='comment' className='form-label fw-semibold'>
                    Your Comment
                  </label>
                  <textarea
                    id='comment'
                    className='form-control'
                    rows='3'
                    placeholder='Share your experience...'></textarea>
                </div>
                <button type='submit' className='btn btn-primary'>
                  Submit Review
                </button>
              </form>
            </div>

            {/* Reviews Display */}
            {doctorData.reviews?.map((review, index) => (
              <div key={index} className='review-item mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='fw-semibold mb-0'>{review.name}</p>
                  <span className='text-muted small'>{review.date}</span>
                </div>
                <div className='text-warning my-1'>
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className='text-muted small'>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
