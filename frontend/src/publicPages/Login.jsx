import React, { useEffect, useState } from 'react'
import Toon from '../assets/g.jpg'
import ReactoLogo from '../assets/Reacto.jpg'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useNavigate, Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaWhatsapp, FaGoogle, FaSignInAlt, FaLock, FaVoicemail, FaBookOpen, FaHome} from 'react-icons/fa';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const delay = new Promise(resolve => setTimeout(resolve, 5000)); // Minimum 5 seconds

        try {
            const fetchPromise = fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const [res] = await Promise.all([fetchPromise, delay]);
            const data = await res.json();

            if (res.ok) {
                // Store token and user
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirect based on role
                if (data.user.role === "admin") {
                    navigate("/admindashboard");
                } else if (data.user.role === "student") {
                    navigate("/studentdashboard");
                } else if (data.user.role === "lecture") {
                    navigate("/lecturedashboard");
                } else {
                    navigate("/studentdashboard"); // default
                }
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            alert("Server error. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        // Simulate Google login - in production, integrate with Google OAuth
        alert("Google login simulation: Redirecting to Google...");
        // For demo, create a mock user
        const mockUser = {
            id: "google123",
            name: "Google User",
            email: "google@example.com",
            role: "student",
            studentNumber: "1234567890"
        };
        localStorage.setItem("token", "mock-google-token");
        localStorage.setItem("user", JSON.stringify(mockUser));
        navigate("/studentdashboard");
    };

    useEffect(() => {

        AOS.init({
            duration: 2000
        })
    })

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
                    <p className="fs-4 text-dark">Logging in...</p>
                    <style>{`
                        @keyframes bounce {
                            0%, 80%, 100% { transform: scale(0); }
                            40% { transform: scale(1); }
                        }
                    `}</style>
                </div>
            </div>
        )}

        <section className="container-fluid vh-100 d-flex justify-content-center align-items-center">
            <div className='container d-flex justify-content-between col gap-5'>
                <div data-aos='zoom-in' className='col-md-6 p-3 col-12 d-flex flex-column justify-content-center align-items-center gap-3 h-100'>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                        <img src={ReactoLogo} alt="Reacto Academy" style={{ height: '60px', marginBottom: '10px' }} />
                        <p className="mb-0 lead fs-1"> <b> REACTO ACADEMY </b> </p>
                    </div>
                    <div className='container bg-white d-flex flex-column justify-content-center align-items-center h-100'>
                        {/* <p style={{ color: ' #06053d'}} className="text-center m-0"> Sign In </p> */}
                        <div className='w-100 text-center mb-3'>
                                <p style={{  color: ' #39FF14' }} className="text-center"> Don't have an account? <a style={{ color: ' #06053d' }} href="/register"> Register </a> </p>
                            </div>
                        <form action="" onSubmit={handleLogin} className='w-100 flex-column d-flex justify-content-center align-items-center gap-3 mb-3'>
                            <div className='w-100'>
                                <label style={{ color: ' #06053d'}} htmlFor="email" className="lead align-items-center d-flex"> <FaBookOpen size={24} className='me-2' /> Email Address </label>
                                <input type="email" className="form-control" placeholder='Enter email' id='email' 
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div  className='w-100'>
                                <label style={{ color: ' #06053d'}} htmlFor="password" className="lead align-items-center d-flex"> <FaLock size={24}  className='me-2' />  Password </label>
                                <input type="password" className="form-control" placeholder='Enter Password' id='password' 
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                           <div className='w-100'>
                               <button style={{ backgroundColor: ' #06053d', color: ' #39FF14' }}
                                   type='submit' className="btn fs-5 w-100 mb-2" disabled={isLoading}>
                                   {isLoading ? (
                                       <div className="spinner-border spinner-border-sm me-2" role="status">
                                           <span className="visually-hidden">Loading...</span>
                                       </div>
                                   ) : (
                                       <FaSignInAlt className='me-2' />
                                   )}
                                   {isLoading ? 'Logging in...' : 'Login'}
                               </button>
                               <button onClick={handleGoogleLogin} className="btn btn-outline-danger w-100" disabled={isLoading}>
                                   <FaGoogle className='me-2' /> Login with Google
                               </button>
                           </div>

                        </form>

                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <Link to="/" className="text-decoration-none">
                            <FaHome size={30} color="#06053d" />
                        </Link>
                    </div>
                    <div className=" gap-3 justify-content-center align-items-center d-flex mt-3">
                        <p style={{ color: ' #39FF14'}} className=" m-0"> or Login with: </p>
                        {/* <button className="btn btn-outline-success"> Facebook </button> */}
                        <div className="d-flex gap-3">
                            <FaGithub color='#06053d' size={22} />
                            <FaGoogle color='#06053d' size={22} />
                            <FaFacebook color='#06053d' size={22} />
                            {/* <FaLinkedin color='#06053d' size={22} /> */}
                        </div>
                    </div>
                    
                </div>
                
                {/* <code className='align-items-center justify-content-center d-flex fw-bold d-none d-md-block'> CODE </code> */}

                <div data-aos='slide-right' className='w-100 h-100 d-none d-md-block'>
                    <img src={ Toon } alt="Toon Coding"  className='w-100 rounded'/>
                </div>
            </div>
        </section>
            </>
    
    )
}

export default Login