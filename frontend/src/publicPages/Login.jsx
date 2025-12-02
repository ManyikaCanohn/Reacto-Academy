import React, { useEffect, useState } from 'react'
import Toon from '../assets/g.jpg'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useNavigate, Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaWhatsapp, FaGoogle, FaSignInAlt, FaLock, FaVoicemail, FaBookOpen, FaHome, FaEnvelopeOpenText, FaLockOpen, FaEye, FaEyeSlash} from 'react-icons/fa';
import { useAuth } from '../context/AppContext';


const Login = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            alert("Please fill in all required fields.");
            return;
        }

        const result = await login(email, password);

        if (result.success) {
            // Redirect based on role
            if (result.user.role === "student") {
                navigate("/studentdashboard");
            } else if (result.user.role === "lecture") {
                navigate("/lecturedashboard");
            } else {
                navigate("/studentdashboard"); // default
            }
        } else {
            alert(result.error || "Login failed");
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
        {loading && (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white" style={{ zIndex: 9999 }}>
                <div className="text-center">
                    {/* <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div> */}
                    <div className="d-flex justify-content-center mb-2">
                        <div className="dot bg-danger mx-1" style={{ width: '10px', height: '10px', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }}></div>
                        <div className="dot bg-success mx-1" style={{ width: '10px', height: '10px', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both 0.2s' }}></div>
                        <div className="dot bg-warning mx-1" style={{ width: '10px', height: '10px', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both 0.4s' }}></div>
                        <div className="dot bg-info mx-1" style={{ width: '10px', height: '10px', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both 0.6s' }}></div>
                        <div className="dot bg-success mx-1" style={{ width: '10px', height: '10px', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both 0.8s' }}></div>
                        <div className="dot bg-primary mx-1" style={{ width: '10px', height: '10px', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both 1s' }}></div>
                    </div>
                    <p className="fs-4 text-dark"></p>
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
                    <div className="d-flex justify-content-center align-items-center w-100 mb-0">
                        <div>
                                <img src="/reacto-logo.svg" alt="Reacto Academy" style={{ height: '45px', marginBottom: '10px' }} />
                        </div>
                        <div>
                            <p className="lead fs-1"> <b> REACTO ACADEMY </b> </p>
                        </div>
                    </div>
                    <div className='container bg-white d-flex flex-column justify-content-center align-items-center h-100'>
                        {/* <p style={{ color: ' #06053d'}} className="text-center m-0"> Sign In </p> */}
                        <div className='w-100 text-center mb-2'>
                                <p style={{  color: '#39FF14' }} className="text-center"> Don't have an account? <a style={{ color: ' #06053d' }} href="/register"> Register </a> </p>
                            </div>
                        <form action="" onSubmit={handleLogin} className='w-100 flex-column d-flex justify-content-center align-items-center gap-3 mb-1'>
                            <div className='w-100'>
                                <label style={{ color: ' #06053d'}} htmlFor="email" className="lead mb-1 align-items-center d-flex"> <FaEnvelopeOpenText size={24} className='me-2' /> Email Address </label>
                                <input type="email" className="form-control" placeholder='Enter email' id='email' 
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div  className='w-100'>
                                <label style={{ color: ' #06053d'}} htmlFor="password" className="lead mb-1 align-items-center d-flex"> <FaLock size={24}  className='me-2' />  Password </label>
                                <div className="d-flex">
                                    <input type={showPassword ? "text" : "password"} className="form-control flex-grow-1" placeholder='Enter Password' id='password'
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button type="button" className="btn btn-outline-secondary ms-2" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <div className='w-100'>
                                <button style={{ backgroundColor: ' #06053d', color: ' #39FF14' }}
                                    type='submit' className="btn fs-5 w-100 mb-0" disabled={loading}>
                                    {loading ? (
                                        <div className="spinner-border spinner-border-sm me-2" role="status">
                                            <span className="visually-hidden"></span>
                                        </div>
                                    ) : (
                                        <FaSignInAlt className='me-2' />
                                    )}
                                    {loading ? '' : 'Login'}
                                </button>
                            </div>
                        </form>

                        </div>
                    <div className=" gap-3 justify-content-center align-items-center d-flex mt-3">
                        <p style={{ color: ' #39FF14'}} className=" m-0"> or Login with: </p>
                        {/* <button className="btn btn-outline-success"> Facebook </button> */}
                        <div className="d-flex gap-3">
                            <FaGithub title="Github" color='#06053d' size={23} />
                            <FaGoogle title="Google" onClick={handleGoogleLogin} color='#06053d' size={23} />
                            <FaFacebook title="Facebook" color='#06053d' size={23} />
                            {/* <div className="d-flex justify-content-center mt-3"> */}
                                <Link to="/" className="text-decoration-none">
                                    <FaHome size={30} title='Back to landing page' color="#06053d" />
                                </Link>
                            {/* </div> */}
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