import React from "react";
import Navbar from "./Components/Navbar.jsx";
import Home from "./AllPages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Login from "./AllPages/Login.jsx";
import Signup from "./AllPages/Signup.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
