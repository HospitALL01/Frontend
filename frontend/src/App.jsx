import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./AllPages/Home.jsx";
import Login from "./AllPages/Login.jsx";
import Signup from "./AllPages/Signup.jsx";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // redirect after logout
  };

  return (
    <div>
      {/* Pass user and logout to Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/home' element={<Home user={user} />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
