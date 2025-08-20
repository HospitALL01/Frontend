import { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("Doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <div className="border rounded-circle d-flex justify-content-center align-items-center mx-auto" style={{ width: "60px", height: "60px" }}>
            <span className="text-primary fs-3">❤</span>
          </div>
          <h4 className="mt-2">HospitALL</h4>
        </div>

        {/* Title */}
        <h5 className="text-center fw-bold">Welcome Back</h5>
        <p className="text-center text-muted mb-4">Sign in to your account</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Login as</label>
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option>Doctor</option>
              <option>Patient</option>
              <option>Admin</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account? <a href="/register">Sign up here</a>
        </p>
        <p className="text-center text-muted small">
          By signing in, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
