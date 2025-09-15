// src/AllPages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function Login({ setUser }) {
  const [role, setRole] = useState("Doctor"); // Doctor | Patient | Admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Read admin credentials from Vite env
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "";
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "";

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
  const getLoginUrl = () => {
    if (role === "Doctor") return `${API_BASE}/api/doctor/login`;
    if (role === "Patient") return `${API_BASE}/api/patient/login`;
    if (role === "Admin") return null; // handled locally
    return null;
  };

  const setDoctorPrefillKeys = (name, phone, emailVal) => {
    if (emailVal) localStorage.setItem("doctorEmail", emailVal);
    if (phone) localStorage.setItem("doctorPhone", phone);
    if (name) localStorage.setItem("doctorName", name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) return setError("Please enter your email.");
    if (!password) return setError("Please enter your password.");

    // ✅ Admin login (no API call)
    if (role === "Admin") {
      if (!adminEmail || !adminPassword) {
        setError("Admin credentials are not set in .env");
        return;
      }
      const inEmail = email.trim().toLowerCase();
      const envEmail = String(adminEmail).trim().toLowerCase();
      if (inEmail === envEmail && password === String(adminPassword)) {
        const adminUser = { email: adminEmail, name: "Admin" };
        localStorage.setItem("token", "admin-local-token");
        localStorage.setItem("user", JSON.stringify(adminUser));
        localStorage.setItem("role", "Admin");
        if (typeof setUser === "function") setUser(adminUser);
        // Admin panel
        navigate("/admin-dashboard", { replace: true });
        return;
      }
      setError("Invalid admin email or password.");
      return;
    }

    // ✅ Doctor/Patient (API)
    const url = getLoginUrl();
    if (!url) {
      setError("Login not supported for this role.");
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

      const userPayload = data.user || data.doctor || data.patient || null;
      const token = data.token;
      if (!token || !userPayload)
        throw new Error("Invalid response from server");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userPayload));
      localStorage.setItem("role", role);
      if (typeof setUser === "function") setUser(userPayload);

      const emailLower = email.trim().toLowerCase();
      const map = loadProfileMap();

      const fromMap = map[emailLower];

      const derivedName =
        fromMap?.name ||
        userPayload?.fullname ||
        userPayload?.name ||
        userPayload?.doctor_name ||
        "";
      const derivedPhone =
        fromMap?.phone || userPayload?.phone || userPayload?.doctor_phone || "";

      if (role === "Doctor") {
        setDoctorPrefillKeys(derivedName, derivedPhone, emailLower);

        const next = {
          role: "Doctor",
          name: derivedName,
          phone: derivedPhone,
        };
        map[emailLower] = next;
        saveProfileMap(map);
      }

      setMessage("✅ Login Successful!");

      if (role === "Patient") navigate("/home", { replace: true });
      else if (role === "Doctor")
        navigate("/profile-doctor", { replace: true }); // 🔁 Profile page-এ যাই
      else navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "⚠️ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <div
            className="border rounded-circle d-flex justify-content-center align-items-center mx-auto"
            style={{ width: "60px", height: "60px" }}
          >
            <span className="text-primary fs-3">❤</span>
          </div>
          <h4 className="mt-2">HospitALL</h4>
        </div>

        <h5 className="text-center fw-bold">Welcome Back</h5>
        <p className="text-center text-muted mb-4">Sign in to your account</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Login as</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option>Doctor</option>
              <option>Patient</option>
              <option>Admin</option>
            </select>
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
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {message && <p className="text-center text-success mt-3">{message}</p>}
        {error && <p className="text-center text-danger mt-3">{error}</p>}

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <a href="/signup" className="text-primary">
            Sign up here
          </a>
        </p>
        <p className="text-center text-muted small">
          By signing in, you agree to our <a href="#">Terms</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
