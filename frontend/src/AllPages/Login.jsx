import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [role, setRole] = useState("Doctor"); // Doctor | Patient | Admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_BASE = "http://127.0.0.1:8000/api";

  // pick the correct endpoint based on role selection
  const getLoginUrl = () => {
    if (role === "Doctor") return `${API_BASE}/doctor/login`;
    if (role === "Patient") return `${API_BASE}/patient/login`;
    return null; // Admin not supported here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // simple client-side validation
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    const url = getLoginUrl();
    if (!url) {
      setError("Admin login is not supported from this page.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data?.error || data?.message || "❌ Login failed";
        throw new Error(msg);
      }

      // server may return user shape as {user} or {doctor}/{patient}
      const userPayload = data.user || data.doctor || data.patient || null;
      const token = data.token;

      if (!token || !userPayload) {
        throw new Error("Invalid response from server");
      }

      // store token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userPayload));
      localStorage.setItem("role", role); // helpful later

      // lift state up
      if (typeof setUser === "function") {
        setUser(userPayload);
      }

      setMessage("✅ Login Successful!");
      setError("");

      // redirect after a short pause
      setTimeout(() => navigate("/home"), 1200);
    } catch (err) {
      setError(err?.message || "⚠️ Something went wrong. Try again.");
      setMessage("");
    } finally {
      setLoading(false);
    }
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
        <h5 className='text-center fw-bold'>Welcome Back</h5>
        <p className='text-center text-muted mb-4'>Sign in to your account</p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className='mb-3'>
            <label className='form-label'>Login as</label>
            <select className='form-select' value={role} onChange={(e) => setRole(e.target.value)} disabled={loading}>
              <option>Doctor</option>
              <option>Patient</option>
              <option>Admin</option>
            </select>
          </div>

          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button type='submit' className='btn btn-primary w-100' disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Success / Error */}
        {message && <p className='text-center text-success mt-3'>{message}</p>}
        {error && <p className='text-center text-danger mt-3'>{error}</p>}

        <p className='text-center mt-3'>
          Don’t have an account?{" "}
          <a href='/signup' className='text-primary'>
            Sign up here
          </a>
        </p>
        <p className='text-center text-muted small'>
          By signing in, you agree to our <a href='#'>Terms</a> and <a href='#'>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
