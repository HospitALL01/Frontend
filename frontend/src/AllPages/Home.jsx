import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import brainImage from "../assets/brain.avif";
import { FaCommentDots, FaUserMd, FaClock, FaShieldAlt, FaHospitalAlt, FaStar } from "react-icons/fa";

function Home() {
  return (
    <div className='container py-5'>
      {/* Hero Section */}
      <div className='row align-items-center'>
        {/* Left side */}
        <div className='col-md-6'>
          <h1 className='fw-bold display-5'>
            Welcome to <span className='text-primary'>HospitALL</span> <br />
            Your Complete Healthcare Solution
          </h1>
          <p className='mt-3 text-muted'>
            Connect with top doctors, chat with our AI assistant for health guidance, and access emergency services all
            in one comprehensive platform.
          </p>
          <div className='d-flex flex-wrap gap-2 mt-4'>
            <button className='btn btn-primary'>🔍 Find a Doctor</button>
            <button className='btn btn-outline-primary'>📅 Book Appointment</button>
            <button className='btn btn-success'>💬 AI Chatbot</button>
            <button className='btn btn-danger'>📞 Emergency</button>
          </div>
          <div className='d-flex gap-4 mt-4 text-muted flex-wrap'>
            <span>✅ 500+ Doctors</span>
            <span>🏥 50+ Hospitals</span>
            <span>🤖 AI-Powered Chatbott</span>
          </div>
        </div>

        {/* Right side image */}
        <div className='col-md-6 text-center mt-4 mt-md-0'>
          <div className='card shadow-lg border-0 position-relative'>
            <img src={brainImage} className='card-img-top' alt='Brain Model' />
            <div className='position-absolute bottom-0 end-0 bg-primary text-white px-3 py-1 rounded'>
              24/7 Available
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <section className='py-5'>
        <div className='text-center mb-5'>
          <h2 className='fw-bold'>Why Choose HospitALL?</h2>
          <p className='text-muted'>
            We combine AI-powered technology with trusted healthcare professionals to deliver reliable services for
            patients, doctors, and hospitals.
          </p>
        </div>

        <div className='row g-4'>
          <div className='col-md-4'>
            <div className='card h-100 shadow-sm border-0 p-4 text-center'>
              <FaCommentDots className='text-primary fs-1 mb-3' />
              <h5>AI Health Chatbot</h5>
              <p className='text-muted'>Instant AI guidance for symptoms and preliminary health advice.</p>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card h-100 shadow-sm border-0 p-4 text-center'>
              <FaUserMd className='text-success fs-1 mb-3' />
              <h5>Expert Doctors</h5>
              <p className='text-muted'>Connect with verified healthcare specialists in all fields.</p>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card h-100 shadow-sm border-0 p-4 text-center'>
              <FaClock className='text-danger fs-1 mb-3' />
              <h5>24/7 Emergency</h5>
              <p className='text-muted'>Request emergency services and ambulance anytime, anywhere.</p>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card h-100 shadow-sm border-0 p-4 text-center'>
              <FaShieldAlt className='text-warning fs-1 mb-3' />
              <h5>Secure & Private</h5>
              <p className='text-muted'>Your health data is protected with enterprise-grade security.</p>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card h-100 shadow-sm border-0 p-4 text-center'>
              <FaHospitalAlt className='text-info fs-1 mb-3' />
              <h5>Nearby Hospitals</h5>
              <p className='text-muted'>Search hospitals and clinics near you within seconds.</p>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card h-100 shadow-sm border-0 p-4 text-center'>
              <FaStar className='text-secondary fs-1 mb-3' />
              <h5>Verified Reviews</h5>
              <p className='text-muted'>Real patient reviews to help you choose the right doctor.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
