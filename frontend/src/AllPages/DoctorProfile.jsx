import React, { useState } from "react"; // ✅ THIS LINE IS NOW FIXED
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaStar,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";
import "../index.css";
import { doctors } from "../data/doctors";

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the correct doctor from the data array
  const doctorData = doctors.find((doc) => doc.id === parseInt(id));

  const [reviews, setReviews] = useState(doctorData?.reviews || []);
  const [newComment, setNewComment] = useState("");
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Handle submitting a new review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newComment.trim() === "" || currentRating === 0) {
      alert("Please provide a rating and a comment.");
      return;
    }
    const newReviewObject = {
      name: "Your Name", // This would be the logged-in user's name
      rating: currentRating,
      comment: newComment,
      date: "Just now",
    };
    setReviews([newReviewObject, ...reviews]);
    setNewComment("");
    setCurrentRating(0);
  };

  // If doctor not found
  if (!doctorData) {
    return (
      <div className="container text-center py-5">
        <h2>Doctor Not Found</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Main Info Card */}
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
              </div>
              <div className="flex-grow-1 text-center text-md-start">
                <h2 className="fw-bold mb-1">{doctorData.name}</h2>
                <p className="text-primary fw-semibold">
                  {doctorData.specialty}
                </p>
                <div className="d-flex flex-wrap justify-content-center justify-content-md-start align-items-center text-muted small gap-3 mb-3">
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
              <div className="mt-3 mt-md-0 ms-md-auto">
                <button
                  className="btn btn-primary btn-lg px-5"
                  onClick={() =>
                    navigate("/book-now", { state: { doctor: doctorData } })
                  }
                >
                  Book an Appointment
                </button>
              </div>
            </div>
          </div>

          {/* About Card */}
          <div className="card shadow-sm border-0 p-4 mb-4 profile-section-card">
            <h4 className="fw-bold mb-3">About</h4>
            <p className="text-muted">{doctorData.about}</p>
          </div>

          {/* Qualifications Card */}
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

          {/* Patient Reviews Card with Form */}
          <div className="card shadow-sm border-0 p-4 profile-section-card">
            <h4 className="fw-bold mb-3">Patient Reviews</h4>
            {/* New Review Form */}
            <div className="mb-4 p-3 bg-light border rounded">
              <h5 className="mb-3">Leave a Review</h5>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Rating</label>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`star ${
                          hoverRating >= star || currentRating >= star
                            ? "active"
                            : ""
                        }`}
                        onClick={() => setCurrentRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="comment" className="form-label fw-semibold">
                    Your Comment
                  </label>
                  <textarea
                    id="comment"
                    className="form-control"
                    rows="3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Review
                </button>
              </form>
            </div>
            {/* Display Existing and New Reviews */}
            {reviews.map((review, index) => (
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
      </div>
    </div>
  );
}
