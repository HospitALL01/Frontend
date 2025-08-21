// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [role, setRole] = useState("Doctor");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     fetch("http://127.0.0.1:8000/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password, role }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.token) {
//           // Store token and user info
//           localStorage.setItem("token", data.token);
//           localStorage.setItem("user", JSON.stringify(data.user));

//           // Show success message
//           setMessage("Login Successful!");
//           setError("");

//           // Redirect to Home after 2 second
//           setTimeout(() => {
//             navigate("/home");
//           }, 2000);
//         } else {
//           // Show error message
//           setError(data.error || "Login failed");
//           setMessage("");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Something went wrong. Try again.");
//         setMessage("");
//       });
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div
//         className="card shadow p-4"
//         style={{ width: "400px", borderRadius: "15px" }}
//       >
//         {/* Logo */}
//         <div className="text-center mb-4">
//           <div
//             className="border rounded-circle d-flex justify-content-center align-items-center mx-auto"
//             style={{ width: "60px", height: "60px" }}
//           >
//             <span className="text-primary fs-3">❤</span>
//           </div>
//           <h4 className="mt-2">HospitALL</h4>
//         </div>

//         <h5 className="text-center fw-bold">Welcome Back</h5>
//         <p className="text-center text-muted mb-4">Sign in to your account</p>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Login as</label>
//             <select
//               className="form-select"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option>Doctor</option>
//               <option>Patient</option>
//               <option>Admin</option>
//             </select>
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100">
//             Sign In
//           </button>
//         </form>

//         {/* Success / Error Messages */}
//         {message && <p className="text-center text-success mt-3">{message}</p>}
//         {error && <p className="text-center text-danger mt-3">{error}</p>}

//         <p className="text-center mt-3">
//           Don’t have an account? <a href="/register">Sign up here</a>
//         </p>
//         <p className="text-center text-muted small">
//           By signing in, you agree to our <a href="#">Terms</a> and{" "}
//           <a href="#">Privacy Policy</a>.
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [role, setRole] = useState("Doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          // Store token and user info
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          // Set user in App state
          setUser(data.user);

          // Show success message
          setMessage("Login Successful!");
          setError("");

          // Redirect to Home after 1.3seconds
          setTimeout(() => {
            navigate("/home");
          }, 1300);
        } else {
          // Show error message
          setError(data.error || "Login failed");
          setMessage("");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong. Try again.");
        setMessage("");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
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

        {/* Title */}
        <h5 className="text-center fw-bold">Welcome Back</h5>
        <p className="text-center text-muted mb-4">Sign in to your account</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Login as</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>

        {/* Success / Error Messages */}
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
