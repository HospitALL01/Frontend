import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./AllPages/Home.jsx";
import Login from "./AllPages/Login.jsx";
import Signup from "./AllPages/Signup.jsx";
import AI from "./AllPages/AI.jsx";
import AppointmentBooking from "./AllPages/AppointmentBooking.jsx";
import DoctorProfile from "./AllPages/DoctorProfile.jsx";
import BookingPage from "./AllPages/BookingPage.jsx";
// ✅ 1. Import the new EmergencyPage component
import EmergencyPage from "./AllPages/EmergencyPage.jsx";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ai" element={<AI user={user} />} />
        <Route path="/find-doctors" element={<AppointmentBooking />} />
        <Route path="/doctor/:id" element={<DoctorProfile user={user} />} />
        <Route path="/book-now" element={<BookingPage />} />

        {/* ✅ 2. Add the new route for the emergency page */}
        <Route path="/emergency" element={<EmergencyPage />} />
      </Routes>
    </div>
  );
}

export default App;
