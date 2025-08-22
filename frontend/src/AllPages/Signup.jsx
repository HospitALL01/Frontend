import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Patient");
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", { fullname, email, role, password });

    fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, password, role }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        navigate("/login");
      });
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
      <div className='card shadow p-4' style={{ width: "400px", borderRadius: "15px" }}>
        {/* Logo */}
        <div className='text-center mb-4'>
          <div
            className='border rounded-circle d-flex justify-content-center align-items-center mx-auto'
            style={{ width: "60px", height: "60px" }}>
            <span className='text-primary fs-3'>❤</span>
          </div>
          <h4 className='mt-2'>HospitALL</h4>
        </div>

        {/* Title */}
        <h5 className='text-center fw-bold'>Create Account</h5>
        <p className='text-center text-muted mb-4'>Join our healthcare platform</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Full Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter your full name'
              value={fullname}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>I am a</label>
            <select className='form-select' value={role} onChange={(e) => setRole(e.target.value)}>
              <option>Patient</option>
              <option>Doctor</option>
              <option>Admin</option>
            </select>
          </div>

          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              placeholder='Create a password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type='submit' className='btn btn-primary w-100'>
            Create Account
          </button>
        </form>

        <p className='text-center mt-3'>
          Already have an account? <a href='/login'>Sign in here</a>
        </p>
      </div>
    </div>
  );
}
