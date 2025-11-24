import React, { useEffect, useState } from "react";
import Reacto from "../assets/f.jpg";
import ReactoLogo from "../assets/Reacto.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelopeOpenText, FaLock, FaSignInAlt, FaUser, FaHome, FaGoogle } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    const delay = new Promise(resolve => setTimeout(resolve, 5000)); // Minimum 5 seconds

    try {
      const fetchPromise = fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const [res] = await Promise.all([fetchPromise, delay]);
      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    // Simulate Google registration - in production, integrate with Google OAuth
    alert("Google registration simulation: Redirecting to Google...");
    // For demo, redirect to login
    navigate("/login");
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
    {isLoading && (
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white" style={{ zIndex: 9999 }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="d-flex justify-content-center mb-2">
            <div className="dot bg-danger mx-1" style={{ width: '10px', height: '10px', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }}></div>
            <div className="dot bg-success mx-1" style={{ width: '10px', height: '10px', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both 0.2s' }}></div>
            <div className="dot bg-warning mx-1" style={{ width: '10px', height: '10px', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both 0.4s' }}></div>
            <div className="dot bg-info mx-1" style={{ width: '10px', height: '10px', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both 0.6s' }}></div>
          </div>
          <p className="fs-4 text-dark">Registering...</p>
          <style>{`
            @keyframes bounce {
              0%, 80%, 100% { transform: scale(0); }
              40% { transform: scale(1); }
            }
          `}</style>
        </div>
      </div>
    )}
    <section className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">
      <div className="container d-flex align-items-center gap-5 justify-content-center">
        <div className="col-md-6 col-12 d-flex flex-column justify-content-center align-items-center vh-100">
          <div
            data-aos="zoom-in"
            className="container bg-light d-flex flex-column justify-content-center align-items-center"
          >
            <div className="d-flex flex-column align-items-center w-100 mb-3">
              <img src={ReactoLogo} alt="Reacto Academy" style={{ height: '60px', marginBottom: '10px' }} />
              <p className="mb-0 lead fs-1">
                <b>REACTO ACADEMY</b>
              </p>
            </div>
            <p style={{ color: "#39FF14" }} className="text-center lead fs-3 mb-2">
              Registration Form...
            </p>
            <form
              onSubmit={handleRegister}
              className="w-100 flex-column d-flex justify-content-center align-items-center gap-3"
            >
              <div className="w-100">
                <label style={{ color: "#06053d" }} className="lead align-items-center d-flex gap-2" htmlFor="name">
                  <FaUser />  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                  className="form-control"
                  placeholder="Manyika Munyinda"
                  id="name"
                />
              </div>

              <div className="w-100">
                <label style={{ color: "#06053d" }} htmlFor="email" className="lead align-items-center gap-2 d-flex">
                  <FaEnvelopeOpenText />  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  className="form-control"
                  placeholder="example24@gmail.com"
                  id="email"
                />
              </div>

              <div className="w-100">
                <label style={{ color: "#06053d" }} htmlFor="password" className="lead align-items-center  gap-2 d-flex">
                  <FaLock />  Set Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  className="form-control"
                  placeholder="*********"
                  id="password"
                />
              </div>

              <div className="w-100">
                <button
                  style={{ backgroundColor: "#06053d", color: "#39FF14" }}
                  type="submit"
                  className="btn fs-5 w-100 d-flex align-items-center justify-content-center gap-2 mb-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <FaSignInAlt />
                  )}
                  {isLoading ? 'Registering...' : 'REGISTER'}
                </button>
                <button onClick={handleGoogleRegister} className="btn btn-outline-danger w-100" disabled={isLoading}>
                  <FaGoogle className='me-2' /> Register with Google
                </button>
              </div>

              <div className="w-100">
                <p style={{ color: "#06053d" }} className="text-center">
                  Already have an account{" "}
                  <Link to="/login" style={{ color: "#39FF14" }}>
                    Login
                  </Link>
                </p>
              </div>
            </form>
            <div className="d-flex justify-content-center mt-3">
              <Link to="/" className="text-decoration-none">
                <FaHome size={30} color="#06053d" />
              </Link>
            </div>
          </div>
        </div>

        <div className="d-flex h-50 w-50 justify-content-center align-items-center d-none d-md-block">
          <img src={Reacto} alt="Reacto Academy" className="img-fluid rounded" />
        </div>
      </div>
    </section>
    </>
  );
};

export default Register;
