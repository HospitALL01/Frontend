import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // form states
  const [role, setRole] = useState("Patient"); // keep role but single API
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ui states
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // validators
  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning("");
    setSuccess("");

    // basic client-side validation
    if (!fullname.trim()) {
      setWarning("Please enter your full name.");
      return;
    }
    if (!email.trim() || !isValidEmail(email.trim())) {
      setWarning("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setWarning("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // 1) check if email exists (same as before)
      const checkRes = await fetch("http://127.0.0.1:8000/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!checkRes.ok) {
        throw new Error("Failed to check email");
      }
      const checkJson = await checkRes.json();

      if (checkJson?.exists) {
        setWarning("This email is already registered!");
        setLoading(false);
        return;
      }

      // 2) single registration endpoint
      const registerUrl = "http://127.0.0.1:8000/api/register";

      // 3) perform registration (send role, fullname, email, password)
      const regRes = await fetch(registerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: fullname.trim(),
          email: email.trim(),
          password,
          role, // backend একটাই endpoint এ role ধরবে
        }),
      });

      if (!regRes.ok) {
        let msg = "Registration failed";
        try {
          const errJson = await regRes.json();
          if (errJson?.error) msg = errJson.error;
        } catch {
          // ignore parse error
        }
        throw new Error(msg);
      }

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      console.error("Signup error:", err);
      setWarning(err?.message || "An error occurred during signup. Please try again.");
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
        <h5 className='text-center fw-bold'>Create Account</h5>
        <p className='text-center text-muted mb-3'>Join our healthcare platform</p>

        {/* Alerts */}
        {warning ? (
          <div className='alert alert-danger py-2' role='alert'>
            {warning}
          </div>
        ) : null}
        {success ? (
          <div className='alert alert-success py-2' role='alert'>
            {success}
          </div>
        ) : null}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className='mb-3'>
            <label className='form-label'>Full Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter your full name'
              value={fullname}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
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
              disabled={loading}
              required
            />
          </div>

          {/* Role select kept, but single API will handle it */}
          <div className='mb-3'>
            <label className='form-label'>I am a</label>
            <select className='form-select' value={role} onChange={(e) => setRole(e.target.value)} disabled={loading}>
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
              placeholder='Create a password (min 6 chars)'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              minLength={6}
            />
          </div>

          <button type='submit' className='btn btn-primary w-100' disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className='text-center mt-3 mb-0'>
          Already have an account? <a href='/login'>Sign in here</a>
        </p>
      </div>
    </div>
  );
}
