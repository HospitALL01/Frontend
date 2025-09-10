import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaMapMarkerAlt, FaBriefcase, FaRegClock, FaCheckCircle } from "react-icons/fa";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";

const ACCEPT_KEY = "adm_accept";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  // ডিফল্ট/ফলব্যাক ভ্যালুগুলো সেট করে দিচ্ছি
  const rating = doctor?.rating ?? 4.9;
  const reviewsCount = doctor?.reviewsCount ?? 0;
  const location = doctor?.location ?? "Not specified";
  const experience =
    doctor?.experience ??
    (doctor?._raw?.yearsOfExperience
      ? `${doctor._raw.yearsOfExperience}+ years experience`
      : "Experience not specified");
  const availability = doctor?.availability ?? "Available Today";
  const name = doctor?.name ?? doctor?._raw?.doctorName ?? "Unknown";
  const specialty = doctor?.specialty ?? doctor?._raw?.specialization ?? "Specialist";
  const verified = doctor?.verified ?? true;

  // আইডি/ইমেল ফfallback (profile route এর জন্য)
  const profileId = doctor?.id ?? doctor?._raw?.email ?? String(Date.now());

  return (
    <div className='col-lg-4 col-md-6 mb-4'>
      <div className='card h-100 shadow-sm border-0 doctor-card'>
        <div className='card-body p-4'>
          <div className='d-flex align-items-center mb-4'>
            {/* Image Placeholder */}
            <div className='doctor-img-placeholder me-3'>
              <svg width='80' height='80' viewBox='0 0 100 100' fill='#e9ecef'>
                <path d='M50,10A40,40,0,1,1,10,50,40,40,0,0,1,50,10M50,0A50,50,0,1,0,100,50,50,50,0,0,0,50,0Z' />
                <path d='M50,60A20,20,0,1,1,70,40,20,20,0,0,1,50,60Z' />
                <path d='M50,70A30,30,0,0,1,20,100H80A30,30,0,0,1,50,70Z' />
              </svg>
            </div>

            <div className='flex-grow-1'>
              <h5 className='card-title fw-bold mb-1'>{name}</h5>
              <p className='text-primary fw-semibold mb-2'>{specialty}</p>
              <div className='d-flex align-items-center text-warning'>
                <FaStar className='me-1' />
                <span className='fw-bold'>{rating}</span>
                <span className='text-muted ms-1'>({reviewsCount} reviews)</span>
              </div>
            </div>

            {verified && (
              <span className='badge bg-success-soft text-success verified-badge'>
                <FaCheckCircle className='me-1' /> Verified
              </span>
            )}
          </div>

          <div className='info-section'>
            <p className='text-muted d-flex align-items-center mb-2'>
              <FaMapMarkerAlt className='me-2 text-secondary' /> {location}
            </p>
            <p className='text-muted d-flex align-items-center mb-3'>
              <FaBriefcase className='me-2 text-secondary' /> {experience}
            </p>
          </div>

          <div className='availability-section mb-4'>
            <p className='fw-semibold d-flex align-items-center'>
              <FaRegClock className='me-2 text-success' /> {availability}
            </p>
          </div>

          <div className='d-grid gap-2 d-sm-flex'>
            {/* Book Now -> booking page এ পুরো doctor object পাঠানো */}
            <button
              className='btn btn-primary flex-grow-1'
              onClick={() => navigate("/book-now", { state: { doctor } })}>
              Book Now
            </button>

            {/* View Profile -> শুধুই Accepted doctor-ই ওপেন করবে */}
            <Link to={`/doctor/${profileId}`} state={{ doctor }} className='btn btn-outline-secondary flex-grow-1'>
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AppointmentBooking() {
  const [accepted, setAccepted] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ACCEPT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // স্যানিটি চেক: array হলে তবেই সেট করবো
        if (Array.isArray(parsed)) setAccepted(parsed);
        else setAccepted([]);
      } else {
        setAccepted([]);
      }
    } catch {
      setAccepted([]);
    }
  }, []);

  return (
    <>
      <div className='container py-5'>
        {/* Header */}
        <div className='text-center mb-5'>
          <h1 className='fw-bold display-5'>Featured Doctors</h1>
          <p className='lead text-muted'>Admin নির্বাচিত (Accepted) ডাক্তারদের মধ্য থেকে বুক করুন।</p>
        </div>

        {/* Doctor Cards */}
        <div className='row'>
          {accepted.length === 0 ? (
            <div className='col-12'>
              <div className='alert alert-info'>
                এখনো কোনো ডাক্তার Admin দ্বারা <strong>Accepted</strong> হয়নি। অনুগ্রহ করে পরে চেষ্টা করুন।
              </div>
            </div>
          ) : (
            accepted.map((doctor) => <DoctorCard key={doctor._raw?.email || doctor.id} doctor={doctor} />)
          )}
        </div>

        {/* View All Doctors Button (disabled for now) */}
        <div className='text-center mt-4'>
          <button className='btn btn-outline-primary btn-lg px-5' disabled>
            View All Doctors
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
