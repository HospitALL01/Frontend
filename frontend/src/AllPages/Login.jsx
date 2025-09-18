import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * প্রোফাইল ম্যাপ লোড/সেভ (Signup-এর সাথে একই স্ট্রাকচার)
 */
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
  const [role, setRole] = useState("Doctor"); // আগের মতোই রেখেছি
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "";
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "";
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const getLoginUrl = () => {
    if (role === "Doctor") return `${API_BASE}/api/doctor/login`;
    if (role === "Patient") return `${API_BASE}/api/patient/login`;
    if (role === "Admin") return null;
    return null;
  };

  const setDoctorPrefillKeys = (name, phone, emailVal) => {
    if (emailVal) localStorage.setItem("doctorEmail", emailVal);
    if (phone) localStorage.setItem("doctorPhone", phone);
    if (name) localStorage.setItem("doctorName", name);
  };

  // 🔹 NEW: রেসপন্স থেকে id/name নরমালাইজার
  const extractUserBasics = (role, payload, fallbackEmail) => {
    // payload হতে পারে: user / patient / doctor – যেটাই আসুক, সব কীগুলো কভার করলাম
    const id =
      payload?.id ??
      payload?.user?.id ??
      payload?.patient?.id ??
      payload?.doctor?.id ??
      payload?.p_id ?? // যদি কোথাও p_id থেকে থাকে
      null;

    const name =
      payload?.p_name ??
      payload?.name ??
      payload?.fullname ??
      payload?.doctor_name ??
      payload?.d_name ??
      payload?.user?.name ??
      payload?.patient?.p_name ??
      payload?.doctor?.d_name ??
      "User";

    const email =
      payload?.email ??
      payload?.user?.email ??
      payload?.patient?.p_email ??
      payload?.doctor?.d_email ??
      fallbackEmail ??
      "";

    const phone =
      payload?.phone ??
      payload?.doctor_phone ??
      payload?.p_phone ??
      payload?.user?.phone ??
      "";

    return { id, name, email, phone };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) return setError("Please enter your email.");
    if (!password) return setError("Please enter your password.");

    // --- Admin (local) ---
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
        // (Admin এর জন্য user_id দরকার নেই)
        if (typeof setUser === "function") setUser(adminUser);
        navigate("/admin-dashboard", { replace: true });
        return;
      }
      setError("Invalid admin email or password.");
      return;
    }

    // --- Doctor/Patient (API) ---
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

      // server payload: token + (user/doctor/patient)
      const payload = data.user || data.doctor || data.patient || data;
      const token = data.token || data.access_token;

      if (!token || !payload) throw new Error("Invalid response from server");

      // 🔹 NEW: এখানে আমরা id/name/email বের করে নিলাম
      const basics = extractUserBasics(
        role,
        payload,
        email.trim().toLowerCase()
      );

      // localStorage — সব role এর জন্যই একইভাবে সেট
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(payload));
      localStorage.setItem("role", role);

      // 🔹 NEW: Booking ইত্যাদির জন্য আবশ্যক
      if (basics.id) localStorage.setItem("user_id", String(basics.id));
      if (basics.name) localStorage.setItem("user_name", basics.name);

      if (typeof setUser === "function") setUser(payload);

      // Doctor হলে DoctorJoinForm-এর জন্য কিছু প্রিফিল, আগের মতই
      if (role === "Doctor") {
        setDoctorPrefillKeys(basics.name, basics.phone, basics.email);
        const mapKey = basics.email || email.trim().toLowerCase();
        const map = loadProfileMap();
        map[mapKey] = {
          role: "Doctor",
          name: basics.name || "",
          phone: basics.phone || "",
        };
        saveProfileMap(map);
      }

      setMessage("✅ Login Successful!");

      // Navigate (unchanged)
      if (role === "Patient") navigate("/home", { replace: true });
      else if (role === "Doctor")
        navigate("/profile-doctor", { replace: true });
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
