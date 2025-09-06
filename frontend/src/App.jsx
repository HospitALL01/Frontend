import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar.jsx";
import Home from "./AllPages/Home.jsx";
import Login from "./AllPages/Login.jsx";
import Signup from "./AllPages/Signup.jsx";
import AI from "./AllPages/AI.jsx";
import AppointmentBooking from "./AllPages/AppointmentBooking.jsx";
import HospitalPage from "./AllPages/Hospitals.jsx";
import DoctorProfile from "./AllPages/DoctorProfile.jsx";
import BookingPage from "./AllPages/BookingPage.jsx";
import EmergencyPage from "./AllPages/EmergencyPage.jsx";
import AdminDashboard from "./AllPages/AdminDashboard.jsx";
import Profile_Doctor from "./AllPages/Profile_Doctor.jsx";

// Public pages (guest-access)
import About from "./AllPages/About.jsx";
import Blogs from "./AllPages/Blogs.jsx";
import Support from "./AllPages/Support.jsx";
import BlogDetailPage from "./AllPages/BlogDetailPage.jsx";
// ✅ 1. IMPORT the new 'AllBlogsPage' component
import AllBlogsPage from "./AllPages/AllBlogsPage.jsx";

// --- helpers ---
const getRole = () => localStorage.getItem("role");
const isLoggedIn = () => !!localStorage.getItem("token");

// --- Route guards ---
const PatientRoute = ({ element }) =>
  isLoggedIn() && getRole() === "Patient" ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
const DoctorRoute = ({ element }) =>
  isLoggedIn() && getRole() === "Doctor" ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
const AdminRoute = ({ element }) =>
  isLoggedIn() && getRole() === "Admin" ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* ✅ Public routes (guest can access without login) */}
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />

        {/* ✅ 2. ADD the new route for the "See More" page */}
        <Route path="/blogs/all" element={<AllBlogsPage />} />

        <Route path="/support" element={<Support />} />

        {/* ✅ Auth routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Patient-only routes */}
        <Route
          path="/home"
          element={<PatientRoute element={<Home user={user} />} />}
        />
        <Route
          path="/find-doctors"
          element={<PatientRoute element={<AppointmentBooking />} />}
        />
        <Route
          path="/hospitals"
          element={<PatientRoute element={<HospitalPage />} />}
        />
        <Route
          path="/emergency"
          element={<PatientRoute element={<EmergencyPage />} />}
        />
        <Route
          path="/doctor/:id"
          element={<PatientRoute element={<DoctorProfile user={user} />} />}
        />
        <Route
          path="/book-now"
          element={<PatientRoute element={<BookingPage />} />}
        />

        {/* ✅ Doctor-only routes */}
        <Route
          path="/appointments"
          element={
            <DoctorRoute
              element={
                <div className="container py-5">Doctor Appointments Page</div>
              }
            />
          }
        />
        <Route
          path="/profile"
          element={
            <DoctorRoute
              element={
                <div className="container py-5">Doctor Profile Page</div>
              }
            />
          }
        />
        <Route
          path="/profile_doctor"
          element={<DoctorRoute element={<Profile_Doctor />} />}
        />

        {/* ✅ Shared (logged-in) routes */}
        <Route
          path="/ai"
          element={
            isLoggedIn() ? <AI user={user} /> : <Navigate to="/login" replace />
          }
        />

        {/* ✅ Admin-only */}
        <Route
          path="/admin-dashboard"
          element={<AdminRoute element={<AdminDashboard />} />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
    </div>
  );
}
