import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaGithub, FaGoogle, FaFacebook, FaHome, FaEye, FaEyeSlash, FaLockOpen, FaSortNumericDownAlt, FaUserTie, FaUserGraduate } from "react-icons/fa";
import { useAuth } from "../context/AppContext";
import Toon from "../assets/g.jpg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { registerStudent, registerLecture, loading } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!name.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long for security");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      let result;
      if (role === "student") {
        result = await registerStudent(name.trim(), email.trim(), password);
      } else {
        result = await registerLecture(name.trim(), email.trim(), password);
      }

      if (result.success) {
        setSuccess(result.message || "Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        // Handle specific backend error messages
        if (result.error?.includes("already exists")) {
          setError("An account with this email already exists. Please use a different email or try logging in.");
        } else if (result.error?.includes("network") || result.error?.includes("fetch")) {
          setError("Network connection failed. Please check your internet connection and try again.");
        } else if (result.error?.includes("server")) {
          setError("Server is temporarily unavailable. Please try again in a few minutes.");
        } else {
          setError(result.error || "Registration failed. Please try again.");
        }
      }
    } catch (networkError) {
      console.error("Registration network error:", networkError);
      setError("Unable to connect to the server. Please check your internet connection and try again.");
    }
  };

  return (
    <section className="container-fluid vh-100">
      <div className="container  d-flex p-5 align-items-center d-flex justify-content-between gap-5">

        <div className="col-md-6 col-12 d-flex flex-column justify-content-center align-items-center gap-3 h-100">
          <div className="d-flex justify-content-center align-items-center w-100">
            <div>
              <img src="/reacto-logo.svg" alt="Reacto Academy" style={{ height: "35px", marginBottom: "10px" }} />
            </div>
            <div>
              <p className="lead fs-2">
                <b> REACTO ACADEMY </b>
              </p>
            </div>
          </div>
          
          <div className="container bg-white d-flex flex-column justify-content-center align-items-center">
            <div className="w-100 text-center">
              <p style={{ color: "#39FF14" }} className="text-center">
                Already have an account? <Link to="/login" style={{ color: "#06053d" }}>Login</Link>
              </p>
            </div>

            {error && (
              <div
                className="alert alert-danger w-100 text-center border-0 shadow-sm"
                role="alert"
                style={{
                  background: 'linear-gradient(45deg, #dc3545, #c82333)',
                  color: 'white',
                  borderRadius: '10px'
                }}
              >
                <strong>⚠️ Registration Error:</strong> {error}
              </div>
            )}

            {success && (
              <div
                className="alert alert-success w-100 text-center border-0 shadow-sm"
                role="alert"
                style={{
                  background: 'linear-gradient(45deg, #28a745, #20c997)',
                  color: 'white',
                  borderRadius: '10px'
                }}
              >
                <strong>✅ Success:</strong> {success}
              </div>
            )}

            <form onSubmit={handleRegister} className="w-100 flex-column d-flex justify-content-center align-items-center gap-3 mb-3">
              <div className="w-100">
                <label style={{ color: "#06053d" }} htmlFor="name" className="lead align-items-center d-flex">
                  <FaUser className="me-2" /> Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="w-100">
                <label style={{ color: "#06053d" }} htmlFor="email" className="lead align-items-center d-flex">
                  <FaEnvelope className="me-2" /> Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="w-100">
                <label style={{ color: "#06053d" }} htmlFor="password" className="lead align-items-center d-flex">
                  <FaLockOpen className="me-2" /> Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ color: "#06053d" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="w-100">
                <label style={{ color: "#06053d" }} htmlFor="confirmPassword" className="lead align-items-center d-flex">
                  <FaLock className="me-2" /> Confirm Password
                </label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ color: "#06053d" }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="w-100">
                <label style={{ color: "#06053d" }} className="align-items-center text-decoration-underline d-flex mb-3">
                    Select Role
                </label>
                <div className="d-flex gap-4 justify-content-start">
                  <div className="form-check d-flex align-items-center gap-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="studentRole"
                      value="student"
                      checked={role === "student"}
                      onChange={(e) => setRole(e.target.value)}
                      style={{ transform: 'scale(1.1)' }}
                    />
                    <label className="form-check-label align-items-center d-flex gap-1" htmlFor="studentRole" style={{ color: "#06053d", fontSize: '1.1rem' }}>
                        <FaUserTie />  Student
                    </label>
                  </div>
                  <div className="form-check d-flex align-items-center gap-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="lectureRole"
                      value="lecture"
                      checked={role === "lecture"}
                      onChange={(e) => setRole(e.target.value)}
                      style={{ transform: 'scale(1.1)' }}
                    />
                    <label className="form-check-label d-flex align-items-center gap-1" htmlFor="lectureRole" style={{ color: "#06053d", fontSize: '1.1rem' }}>
                      <FaUserGraduate /> Lecture
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-100">
                <button
                  style={{ backgroundColor: "#06053d", color: "#39FF14" }}
                  type="submit"
                  className="btn fs-5 w-100 mb-0"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Registering you to Reacto Academy...
                    </>
                  ) : (
                      "⇉ Create Account"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="gap-2 justify-content-center align-items-center d-flex mt-0">
            <p style={{ color: "#39FF14" }} className="m-0">
              or create account with:
            </p>
            <div className="d-flex gap-3">
              <FaGithub style={{ color: "#06053d", fontSize: "20px", cursor: "pointer" }} />
              <FaGoogle style={{ color: "#06053d", fontSize: "20px", cursor: "pointer" }} />
              <FaFacebook style={{ color: "#06053d", fontSize: "20px", cursor: "pointer" }} />
              {/* <Link to="/" className="text-decoration-none">
                <FaHome style={{ color: "#06053d", fontSize: "25px" }} />
              </Link> */}
            </div>
          </div>
        </div>

        <div className="w-100 h-100 d-none d-md-block">
          <img src={Toon} alt="Toon Coding" className="w-100 rounded" />
        </div>
      </div>
    </section>
  );
};

export default Register;
