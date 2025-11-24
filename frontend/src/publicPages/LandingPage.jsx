import React from 'react'
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SmoothScroll from 'smooth-scroll';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import HomeToon from '../assets/e.jpg'
import B from '../assets/b.jpg'
import C from '../assets/c.jpg'
import { FaFacebook, FaLinkedinIn, FaGithub, FaWhatsapp, FaQuoteLeft, FaQuoteRight,
            FaCompass, FaPlayCircle, FaCode, FaLaptopCode, FaTerminal, FaBug, FaDatabase, FaServer,
            FaGraduationCap, FaProjectDiagram, FaClock,
            FaDeskpro, FaUserPlus, FaPen,
            FaLocationArrow,
            FaMap,
            FaFlag,
            FaGlobe,
            FaGlobeAfrica,
            FaPhoneVolume,
            FaMapMarked,
            FaBook,
            FaFileSignature,
            FaQuestionCircle,
            FaUserCog,
            FaCalendarAlt} from 'react-icons/fa';
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiNodedotjs, SiExpress, SiMongodb, SiPython, SiPhp } from 'react-icons/si'
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';         // Skills
import SchoolIcon from '@mui/icons-material/School';       // Academy
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'; // Bootcamp
import MenuBookIcon from '@mui/icons-material/MenuBook';   // Courses
import ContactMailIcon from '@mui/icons-material/ContactMail'; // Contacts


const LandingPage = () => {

    // All courses

    const languages = [
        {name: 'HTML', icon: <SiHtml5 size={80} color=' #170d3bff' />, description: 'The foundation of every website, used to structure content on the web.', play: <FaPlayCircle size={20} title='Learn HTML' />, playText: 'Learn HTML'},
        {name: 'CSS', icon: <SiCss3 size={80} color=' #170d3bff' />, description: 'Sytle and design your webpages, making them visually appealing', play: <FaPlayCircle size={20} title='Learn HTML' />, playText: 'Learn CSS'},
        {name: 'JavaScript', icon: <SiJavascript size={80} color=' #170d3bff' />, description: 'Bring your website to life with interactivity and dynamic features', play: <FaPlayCircle size={20} title='Learn HTML' />, playText: 'Learn Javascript'},
        {name: 'React', icon: <SiReact size={80} color=' #170d3bff' />, description: 'A powerful Javascript library for building modern, interactive user interfaces.', play: <FaPlayCircle size={20} title='Learn HTML' />, playText: 'Learn React'},
        {name: 'Node.js', icon: <SiNodedotjs size={80} color=' #170d3bff' />, description: 'A Javascript runtime for building fast, scalebale serve-side applications.', play: <FaPlayCircle size={20} title='Learn HTML' />, playText: 'Learn Node.js'},
        {name: 'Python', icon: <SiPython size={80} color=' #170d3bff' />, description: 'A versatile programming language great for web, data, and automation.', play: <FaPlayCircle size={20} title='Learn HTML' />, playText: 'Learn Python'},
    ]
    const reasons = [
        {icon: <FaLaptopCode size={50} color=' #39ff14' />, title: 'Hands-On Learning', description: 'Build real-world projects to master your skills faster.'},
        {icon: <FaGraduationCap size={50} color=' #39ff14'  />, title: 'Beginner Friendly', description: 'Easy-to-follow lessons for all skill levels, even complete beginners.'},
        {icon: <FaProjectDiagram size={50} color=' #39ff14'  />, title: 'Project Based Learning', description: 'Learn by creating projects you can showcase in your portfolio.'},
        {icon: <FaClock size={50} color=' #39ff14' />, title: 'Learn Anytime', description: 'Access your courses 24/7 from anywhere in the world.'}
    ]


    const navigate = useNavigate();

    const [popup, setPopup] = useState(null);

    const handleLanguageRedirect = (languageName) => {
        // Redirect to that language’s notes or course page
        navigate(`/courses/${languageName.toLowerCase()}`);
    };

    const handleClick = (platform) => {
        setPopup(platform);

    // Hide popup after 2.5 seconds
        setTimeout(() => {
        setPopup(null);
        }, 2500);// auto hide after 2s
    };
    
    
    useEffect(() => {
        AOS.init({
            duration: 2000 // Animation duration in milliseconds
        });
    })

    useEffect(() => {
        new SmoothScroll('a[href*="#"]', {
            speed: 100,       // duration in ms
            speedAsDuration: true
        });
    }, []);

    return (
        
        // Navigation Bar

        <>

        <nav style={{ backgroundColor: '#06053d', color: '#39FF14' }} className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container">
                <a className="navbar-brand" href="/" style={{ color: '#39FF14' }}>
                    <FaDeskpro size={30} /> Reacto
                <div>Academy...</div>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav gap-4 mb-2 mb-lg-0 justify-content-center align-items-center col d-flex text-center">

                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="#home"
                            style={{ color: '#39FF14' }}
                            onClick={(e) => handleScroll(e, "home")}>
                            <HomeIcon fontSize="large" />
                            <div>Home</div>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a 
                        className="nav-link" 
                        href="#skills" 
                        style={{ color: '#39FF14' }}
                        onClick={(e) => handleScroll(e, "skills")}>
                        <BuildIcon fontSize="large" />
                        <div>Skills</div>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a 
                        className="nav-link" 
                        href="#academy" 
                        style={{ color: '#39FF14' }}
                        onClick={(e) => handleScroll(e, "academy")}>
                        <SchoolIcon fontSize="large" />
                        <div>Academy</div>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a 
                            className="nav-link" 
                            href="#bootcamp" 
                            style={{ color: '#39FF14' }}
                            onClick={(e) => handleScroll(e, "bootcamp")}>
                            <EmojiObjectsIcon fontSize="large" />
                            <div>Bootcamp</div>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a 
                            className="nav-link" 
                            href="#courses" 
                            style={{ color: '#39FF14' }}
                            onClick={(e) => handleScroll(e, "courses")}>
                            <MenuBookIcon fontSize="large" />
                            <div>Courses</div>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#contact" style={{ color: '#39FF14' }}>
                            <ContactMailIcon fontSize="large" />
                            <div>Contact</div>
                        </a>
                    </li>
                </ul>


                <div className="d-flex gap-3">
                    <button onClick={() => navigate('/login')} style={{ color: "lime", border: "2px solid lime" }} className="btn btn">
                        <FaUserPlus color='lime' size={20} /> Login
                    </button>
                    <button onClick={() => navigate('/register')} style={{ color: "lime", border: "2px solid lime" }} className="btn btn">
                        <FaPen color='lime' size={20}  /> Register
                    </button>
                </div>
                    
            </div>
        </div>
        </nav>
                                {/* Home Page... */}

                                <hr className='container' />

            <section className="container p-5 mt-5" id='home'>

                <div className="container mt-5 d-flex justify-content-center flex-column flex-lg-row gap-5 col">
                    
                    <div data-aos='fade-up' className='w-100'>
                        <code className="mb-0"> Start your favorite course today.</code>
                        <p style={{ color: ' #06053d' }} className="mb-4 display-5 lead"> <strong>Turn Your Curiosity into Code, and Your Code into a Career.</strong> </p>
                        <p className="text-muted mb-0" id='justify'> 
                            The world is built on technology — and you have the power to shape it.
                            Whether you're just starting out or dreaming of your next big innovation,
                            our coding platform gives you the tools, guidance, and community to grow.
                        </p>
                        <p className='text-muted' id='justify'>
                            Learn at your pace with hands-on projects, real-world challenges, and expert support.
                            <b> NO exprience?</b> No problem! We start from basics and take you all the way to building real applications.
                            Join a global network of students just like you, all learning, creating, and transforming their futures through code.
                        </p>
                        
                    <p className="mt-1 mb-0 text-danger lead">
                    <TypeAnimation
                        sequence={[
                            "Start with HTML & CSS Expert", 2000,
                            "Move to JavaScript Pro", 2000,
                            "Dive deep into React Developer", 2000,
                            "Learn the basics of backend with Node.js & Express.", 2000,
                            "Lean the backend with MongoDB.", 2000,
                            "REST & API Integrator", 2000,
                            "and build Full-Stack Project.", 2000,
                            "Production-Ready Full-Stack Developer 🚀", 2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                    </p>
                        <button style={{ backgroundColor:"#39FF14", color: "#06053d" }}  className="btn mt-2" onClick={() => navigate('/register')}>
                            <FaPlayCircle /> Get Started Now
                        </button>
                    </div>

                    <div data-aos='slide-right' className='mb-5 align-items-center'>

                        <img src={HomeToon} alt="Home Toon" className='w-100' />

                    </div>
                </div>
            </section>

            <section className="container mt-5 mb-5" id='skills'>

                <div className="d-flex justify-content-center align-items-center flex-column flex-lg-row gap-4">

                    <div data-aos='fade-up'  className="w-100"id='imgB' >
                        <img src={B} alt="Group Study" className='w-100' />
                    </div>

                    <div data-aos='fade-up'  className='w-100'>
                        <p className="lead fs-1">
                           Learn the skills, and land your dream job today. 
                        </p>
                        <p className='mb-0 text-muted'> Free online courses. In-person training. Certificate aligned pathways and roadmap in all courses. </p>
                        <p className='text-muted'> Kick start your or advance your carrer with us. </p>

                        <div className="d-flex justify-content-start mt-4 mb-4 gap-3">
                            <button onClick={() => navigate("/register")} style={{ backgroundColor: "#39FF14" }} className='btn btn'>
                                <FaCompass title='Explore' size={20} /> Explore our courses
                            </button>

                            <button onClick={() => navigate("/register")} style={{ backgroundColor: "#39FF14" }} className='btn btn'>
                                <FaPlayCircle title='Explore' size={20} /> Start a course
                            </button>
                        </div>

                        <div className=" mt-3 d-none d-lg-block">
                            <div className='d-flex justify-content-center align-items-center flex-column flex-lg-row gap-5'>
                                <FaCode title='Coding' />
                                <FaLaptopCode title='Coding Machine' />
                                <FaTerminal title='Coding Terminal' />
                                <FaBug title='Fix the bug' />
                                <FaDatabase title='Coding Database' />
                                <FaServer title='Debugging Server' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Find an Academy */}

            <section className="container mt-5 border bg-light mb-5" id='academy'>
                <div className="d-flex justify-content-center align-items-center flex-column flex-lg-row col p-5">
                    
                    <div data-aos='fade-up' className='w-100'>
                        <p className="lead fs-1">  Find an <b style={{ color: " #39FF14" }}>Academy</b>. </p>
                        <p className='text-muted mb-1' id='justify'> Academies are learning communities and teams of experts that help your develop your carrer. </p>
                        <p className="text-muted mb-1" id='justify'> Wrtie code like you're writing the future: with passion, curiosity, and innovation, because errors are proof that you're learning.</p>
                        <p className='text-muted'> Connet with us now! </p>

                        <div className="position-relative">
                            <div className="d-flex gap-3">
                                <FaGithub size={30} color='#39FF14' title="GitHub" onClick={() => handleClick('GitHub')} style={{ cursor: 'pointer' }} />
                                <FaLinkedinIn size={30} color='#39FF14' title="LinkedIn" onClick={() => handleClick('LinkedIn')} style={{ cursor: 'pointer' }} />
                                <FaWhatsapp size={30} color='#39FF14' title="WhatsApp" onClick={() => handleClick('WhatsApp')} style={{ cursor: 'pointer' }} />
                                <FaFacebook size={30} color='#39FF14' title="Facebook" onClick={() => handleClick('Facebook')} style={{ cursor: 'pointer' }} />
                            </div>

                        {popup && (
                            <div style={{
                                    position: 'absolute',
                                    top: '40px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: '#06053d',
                                    color: '#39FF14',
                                    padding: '12px 18px',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    animation: 'fadeIn 1s ease-in-out'}}>
                                <div className="spinner"></div>
                                <span>{popup} connection is being worked on. Please try again later.</span>
                                    
                            </div>
                        )}
                            <style>
                                {`
                                    @keyframes spin {
                                        0% { transform: rotate(0deg); }
                                        100% { transform: rotate(360deg); }
                                    }

                                    .spinner {
                                        border: 3px solid white;
                                        border-top: 3px solid #ffffffff;
                                        border-radius: 50%;
                                        width: 18px;
                                        height: 18px;
                                        animation: spin 1s linear infinite;
                                    }

                                    @keyframes fadeIn {
                                        from { opacity: 0; transform: translate(-50%, -10px); }
                                        to { opacity: 1; transform: translate(-50%, 0); }
                                    }
                                `}
                            </style>
                        </div>
                    </div>

                    <div data-aos='zoom-out' className='w-100' id='imgC'>
                        <img src={C} alt="" className='w-100' />
                    </div>

                </div>
            </section>

            {/* Boot Camps */}

            <section className="container mt-5 mb-5 border bg-light" id='bootcamp'>
                <div className="d-flex justify-content-center align-items-center flex-column flex-lg-row col gap-5 p-5">
                    <div data-aos='zoom-in' className='w-100' id='imgB'>
                        <img src={C} alt="" className='w-100' />
                    </div>

                    <div data-aos='fade-up' className='w-100'>
                        <p className="lead fs-1">  Join a <b style={{ color: " #39FF14" }}>Boot Camp</b>. </p>
                        <p className='mb-0 text-muted' id='justify'> Bootcamp are not about writting code, but rewritting the future. Every bug you fix, every line of code you write and every project you complete brings you closer to becoming a developed you must be. </p>
                        <p className="text-muted">
                            <ul>
                                <li> You don't need to be perfect, just persistent. </li>
                                <li> Growth happens when you challenge yourself. Get started. </li>
                            </ul>
                        </p>

                        <div className="mt-4 d-none d-lg-block">
                            <div className='d-flex justify-content-center align-items-center flex-column flex-lg-row gap-5'>
                                <FaCode color='#39FF14' size={20} title='Coding' />
                                <FaLaptopCode color='#39FF14' size={20} title='Coding Machine' />
                                <FaTerminal color='#39FF14' size={20} title='Coding Terminal' />
                                <FaBug color='#39FF14' size={20} title='Fix the bug' />
                                <FaDatabase color='#39FF14' size={20} title='Coding Database' />
                                <FaServer color='#39FF14' size={20} title='Debugging Server' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* All Courses */}

            <section className="container mb-5" id="courses">
                {/* Section Title */}
                <div className="d-flex text-center row">
                    <p className="lead text-center fs-1 mt-5 mb-0" style={{ color: "#06053d" }}>
                    Our Academy Popular Courses
                    </p>
                    <p className="text-muted">A line a day keeps the bug away</p>
                </div>

                {/* Cards Grid */}
                <div className="row g-4">
                    {languages.map((language, idx) => (
                    <div
                        className="col-12 col-md-6 col-lg-4 mb-3"
                        data-aos="zoom-in"
                        key={idx}>
                        <div className="card h-100 text-center p-3 shadow-sm border-0 bg-light">
                        {/* Language Header */}
                        <div className="d-flex align-items-center justify-content-start gap-3">
                            <p className="fs-2 mb-0" style={{ color: "#170d3bff" }}>
                                {language.icon}
                            </p>
                            <p data-aos="fade-in" className="display-6 text-dark">
                                {language.name}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-muted text-end" data-aos="zoom-out">
                            {language.description}
                        </p>

                        {/* Button */}
                        <button
                            data-aos="zoom-in"
                            onClick={() => handleLanguageRedirect(language.name)}
                            className="btn rounded fs-5 text-start fw-semibold"
                            style={{
                            color: "#170d3bff",
                            transition: "all 0.5s ease",
                            }}
                            onMouseEnter={(e) => {
                            //   e.target.style.background = "#170d3bff";
                            e.target.style.color = "#06053d";
                            }}
                            onMouseLeave={(e) => {
                            e.target.style.background = "transparent";
                            e.target.style.color = "#170d3bff";
                            }}>
                            {language.play} {language.playText}
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
            </section>

                    <hr className='container mt-0' />

                    {/* Reasons */}

            <section className="container bg-light">
                <div data-aos='zoom-in' className="text-center">
                    <p className="lead fs-1 mb-0"> Why Choose Reacto Academy. </p>
                    <p className='text-muted'> Consistency is the key to mastery. Keep Coding. </p>
                    <div className="row g-1">
                        {reasons.map((reason, idx) => (
                            <div className="col-12 col-md-6 col-lg-3" key={idx} data-aos='fade-down'>
                                <div className="p-3">
                                    <div className="mb-3">
                                        {reason.icon}
                                        <p className='lead mb-0'> <b> {reason.title} </b> </p>
                                        <p data-aos='fade-up' className="text-muted"> {reason.description} </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <hr className='container mt-0' />

            {/* Call-to-action */}

            <section className="container">
                <div data-aos='zoom-up' className='rounded' style={{ backgroundColor: ' #102b57', color: '#fff', padding: '80px 20px', textAlign: 'center' }}>
                    <h2 className="mb-4" style={{ color: ' #39ff14' }}> Start Your Tech Career Today. </h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.4rem', color: ' #b0c4de' }}>
                        Learn HTML, CSS, Javascript, React.js, Node.js, Python, and many more with real-world projects and 24/7 access.
                    </p>
                    <button onClick={() => navigate('/register')}
                            data-aos='fade-up'
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.3)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            className='border-0 mt-4 btn-lg' style={{ backgroundColor: '#39ff14', color: ' #fff', fontWeight: 'bold',
                            padding: '12px 30px', borderRadius: '50px', boxShadow: '0 0 15px #39ff14'
                    }}> Join Now </button>
                </div>
            </section>

            {/* Testimonials */}

            <hr className='container mt-0' />

            <section data-aos='fade-up' className="container mt-5 mb-5">

                <div  data-aos='zoom-in' className='container mb-5 d-flex row'>
                    <p className='text-start'> <FaQuoteLeft color= "#39FF14" size={50} /> </p>
                    <p className="lead fs-1 text-center">
                        Over Five thousand students say Reacto Academy <br /> helped them secure a brighter future.
                    </p>
                    <code className="text-muted text-center">
                        At REACTO ACADEMY, we don't just build app, we build confidence, skills and careers.
                    </code>

                    <div className="mt-5 d-none d-lg-block">
                        <div className='d-flex justify-content-center align-items-center flex-column flex-lg-row gap-5'>
                            <FaCode color= "#39FF14" size={20} title='Coding' />
                            <FaLaptopCode color= "#39FF14" size={20} title='Coding Machine' />
                            <FaTerminal color= "#39FF14" size={20} title='Coding Terminal' />
                            <FaBug color= "#39FF14" size={20} title='Fix the bug' />
                            <FaDatabase color= "#39FF14" size={20} title='Coding Database' />
                            <FaServer color= "#39FF14" size={20} title='Debugging Server' />
                        </div>
                    </div>
                    <p className='text-end'> <FaQuoteRight color= "#39FF14" size={50} /> </p>
                </div>

            </section>

            <hr className='container' />

            <footer style={{ backgroundColor: ' #06053d' }} className="container-fluid align-items-center d-flex justify-content-center row text-light" id='contact'>
                            <div className="justify-content-center p-5 d-flex flex-column flex-lg-row">
                                <div className="col-12 col-md-3">
                                    <p style={{ color: '  #39FF14' }}  className='lead'> <strong> Reacto Acadeny </strong> </p>
                                    <p className="mb-2 text-white d-flex align-items-center" style={{ cursor: 'pointer' }} > <FaMapMarked className='me-2' />  Chelstone Kamanga, </p>
                                    <p className='mb-2 text-white d-flex align-items-center' style={{ cursor: 'pointer' }} > <FaFlag className='me-2' /> Lusaka, Zambia. </p>
                                    <p className="mb-2 text-white d-flex align-items-center" style={{ cursor: 'pointer' }} > <FaGlobe className='me-2' /> info@reactoacademy.co.edu </p>
                                    <p className='text-white d-flex align-items-center' style={{ cursor: 'pointer' }} > <FaPhoneVolume className='me-2' /> +260 774 835 79 </p>
                                </div>
            
                                <div className="col-12 col-md-3">
                                    <p style={{ color: '  #39FF14' }}  className='lead'> <strong> Quick links </strong> </p>
                                    <ul className="list-unstyled">
                                        <li className='mb-2 '> <a href="#" className='text-decoration-none text-white d-flex align-items-center'> <FaBook className='me-2' /> Privacy policy </a> </li>
                                        <li className='mb-2'> <a href="#" className='text-decoration-none text-white d-flex align-items-center'> <FaFileSignature className='me-2' /> Terms and Conditions </a> </li>
                                        <li> <a href="#" className='text-decoration-none text-white d-flex align-items-center'> <FaQuestionCircle className='me-2' /> Support </a> </li>
                                    </ul>
                                </div>
            
                                <div className="col-12 col-md-3" style={{ cursor: 'pointer' }} >
                                    <p style={{ color: '  #39FF14' }}  className="lead"> <strong> System Info </strong> </p>
                                    <p className="mb-2 text-white d-flex align-items-center"> <FaCode className='me-2' /> Version: v1 . 0 . 0 </p>
                                    <p className="mb-2 text-white d-flex align-items-center"> <FaCalendarAlt className='me-2' /> Last updated: July 7th, 2025 </p>
                                    <p className='text-white d-flex align-items-center'> <FaUserCog className='me-2' /> Developed By: Manyika Munyinda </p>
                                </div>
            
                                <div className="col-12 col-md-3 ">
                                    <p style={{ color: '  #39FF14' }}  className="lead"> <strong> Social Links </strong> </p>
                                    <div className="d-flex row gap-1" style={{ cursor: 'pointer' }} > 
                                        <a href="#" className='text-white text-decoration-none mb-2'> <FaLinkedinIn size={20} /> LinkedIn </a>
                                        <a href="#" className='text-white text-decoration-none mb-2'> <FaWhatsapp size={20} /> WhatsApp </a>
                                        <a href="#" className='text-white text-decoration-none mb-2'> <FaGithub size={20} /> GitHub </a>
                                        <a href="#" className='text-white text-decoration-none mb-2'> <FaFacebook onClick={() => handleClick('GitHub')} size={20} /> Facebook </a>
                                        
                                    </div>
                                    <div className="form-check form-switch">
                                        <span> Dark mode </span>
                                        <input type="checkbox" id='darkModeToggle' className="form-check-input" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-center"> &copy;2025 Reacto Academy. All rights reserved. </p>
                            
            </footer>
                
            {/* <button onClick={() => navigate('/lecturedashboard') } className="btn btn-dark"> Leacture Dashboard </button> */}
        </>
    )
}

export default LandingPage