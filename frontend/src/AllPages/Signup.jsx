// src/AllPages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// local helpers to persist basic profile info for prefill
const loadProfileMap = () => {
  try {
    return JSON.parse(localStorage.getItem("profileByEmail") || "{}");
  } catch {
    return {};
  }
};
const saveProfileMap = (map) => {
  localStorage.setItem("profileByEmail", JSON.stringify(map));
};

export default function Signup() {
  const navigate = useNavigate();

  // form states
  const [role, setRole] = useState("Patient"); // Patient | Doctor | Admin
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // ui states
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefer env if present
  const API_BASE = import.meta?.env?.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api`
    : "http://127.0.0.1:8000/api";

  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());

  // Bangladesh phone: must start with 01 and total 11 digits
  const isValidBDPhone = (val) => /^01\d{9}$/.test(val);

  const getRegisterUrl = () => {
    if (role === "Patient") return `${API_BASE}/patient/register`;
    if (role === "Doctor") return `${API_BASE}/doctor/register`;
    return null; // Admin not supported from here
  };

  // Build a payload that satisfies both our and backend's key names
  const buildPayload = () => {
    const base = {
      // common
      email: email.trim(),
      password,
      phone: phone.trim(), // some APIs use 'phone'
      fullname: fullname.trim(), // some APIs use 'fullname'
      name: fullname.trim(), // some use 'name'
    };

    if (role === "Patient") {
      return {
        ...base,
        // patient-flavored keys (covers most Laravel examples)
        p_name: fullname.trim(),
        p_email: email.trim(),
        p_phone: phone.trim(),
        // sometimes controllers expect 'phone' only; we already have that
      };
    }

    if (role === "Doctor") {
      return {
        ...base,
        // doctor-flavored keys
        d_name: fullname.trim(),
        d_email: email.trim(),
        d_phone: phone.trim(),
        doctor_name: fullname.trim(),
        doctor_phone: phone.trim(),
      };
    }

    // Admin not supported
    return base;
  };

  // check duplicates across both tables
  const checkEmailExistsAcrossBoth = async (emailToCheck) => {
    try {
      const [patientRes, doctorRes] = await Promise.all([
        fetch(`${API_BASE}/patient/check-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailToCheck }),
        }),
        fetch(`${API_BASE}/doctor/check-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailToCheck }),
        }),
      ]);

      const patientJson = await patientRes.json().catch(() => ({}));
      const doctorJson = await doctorRes.json().catch(() => ({}));

      const existsPatient = !!patientJson?.exists;
      const existsDoctor = !!doctorJson?.exists;

      return existsPatient || existsDoctor;
    } catch {
      // if the endpoints are missing, don't hard-fail signup; just allow proceed
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning("");
    setSuccess("");

    // basic validations
    if (!fullname.trim()) return setWarning("Please enter your full name.");
    if (!email.trim() || !isValidEmail(email.trim()))
      return setWarning("Please enter a valid email address.");
    if (!password || password.length < 6)
      return setWarning("Password must be at least 6 characters.");

    if (role === "Patient" || role === "Doctor") {
      if (!phone.trim()) return setWarning("Please enter your phone number.");
      if (!isValidBDPhone(phone.trim()))
        return setWarning("Phone must start with 01 and be exactly 11 digits.");
    }

    const registerUrl = getRegisterUrl();
    if (!registerUrl) {
      setWarning("Admin signup is not supported from this page.");
      return;
    }

    setLoading(true);
    try {
      // optional duplicate check (will skip failing hard if endpoints absent)
      const alreadyExists = await checkEmailExistsAcrossBoth(email.trim());
      if (alreadyExists) {
        setWarning("This email is already registered.");
        setLoading(false);
        return;
      }

      const payload = buildPayload();

      const res = await fetch(registerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // many Laravel APIs return 201 or 200 with {message} or {user}
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // try to extract meaningful message from common Laravel structures
        let msg =
          data?.message ||
          data?.error ||
          (data?.errors
            ? Object.values(data.errors).flat().join(", ")
            : null) ||
          "Registration failed";
        throw new Error(msg);
      }

      // store basic prefill for login/profile forms
      const key = email.trim().toLowerCase();
      const map = loadProfileMap();
      map[key] = { role, name: fullname.trim(), phone: phone.trim() };
      saveProfileMap(map);

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      setWarning(err?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // only digits in phone input (strip non-digits)
  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setPhone(digitsOnly.slice(0, 11)); // limit to 11 digits
  };

  const showPhone = role === "Doctor" || role === "Patient";

  return (
    <div
      className="min-vh-100 bg-light d-flex justify-content-center align-items-start"
      style={{ paddingTop: "40px", paddingBottom: "40px" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <div
            className="border rounded-circle d-flex justify-content-center align-items-center mx-auto"
            style={{ width: "60px", height: "60px" }}
          >
            <span className="text-primary fs-3">❤</span>
          </div>
          <h4 className="mt-2">HospitALL</h4>
        </div>

        <h5 className="text-center fw-bold">Create Account</h5>
        <p className="text-center text-muted mb-3">
          Join our healthcare platform
        </p>

        {warning && (
          <div className="alert alert-danger py-2" role="alert">
            {warning}
          </div>
        )}
        {success && (
          <div className="alert alert-success py-2" role="alert">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">I am a</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option>Patient</option>
              <option>Doctor</option>
              <option>Admin</option>
            </select>
          </div>

          {showPhone && (
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={handlePhoneChange}
                disabled={loading}
                inputMode="numeric"
                pattern="01[0-9]{9}"
                minLength={11}
                maxLength={11}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <a href="/login">Sign in here</a>
        </p>
      </div>
    </div>
  );
}
