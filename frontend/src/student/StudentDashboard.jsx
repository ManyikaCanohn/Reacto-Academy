// import React, { useEffect, useState } from 'react'
import { FaTachometerAlt, FaBookOpen, FaClipboardList, FaBell, FaUser, FaBars,
            FaCss3, FaHtml5, FaJsSquare, FaReact, FaPlay, FaLinkedinIn, FaWhatsapp,
            FaGithub, FaFacebook, FaRegSadTear
        } from 'react-icons/fa'
import ReactoLogo from '../assets/Reacto.jpg'
import StudentQuote from './studentComponents/StudentQuote';
import StudentQuickStats from './studentComponents/StudentQuickStats';
import StudentAssignmentTracker from './studentComponents/StudentAssignmentTracker';

const StudentDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // This is the Student Dashboard component....
    const courses = [
        {name: 'HTML Fundamentals', icon: <FaHtml5 size={50} title='HTML5' color='#06053d' />, progress: 80, resume: 'https://example.com/resume-html'},
        {name: 'CSS Fundamentals', icon: <FaCss3 size={50} title='CSS3' color='#06053d' />, progress: 50, resume: 'https://example.com/resume-html'},
        {name: 'Javascript Fundamentals', icon: <FaJsSquare size={60} title='JavaScript' color='#06053d' />, progress: 30, resume: 'https://example.com/resume-js'},
        {name: 'React Fundamentals', icon: <FaReact size={60} title='React.js' color='#06053d' />, progress: 40, resume: 'https://example.com/resume-react'},
    ]

    // Completed Certificates...
    const certificates = [
        {name: '', icon: '', progress: ''},
        // {name: '', icon: '', progress: ''},
        // {name: '', icon: '', progress: ''},
    ]

    return (
        <>

            {/* Navigation Bar */}

            <nav style={{ backgroundColor: ' #06053d' }} className="container-fluid navbar navbar-expand-lg fixed-top">
                <div className="container">
                    <a href="#" className="navbar-brand fs-3 text-white d-flex align-items-center">
                        <img src={ReactoLogo} alt="Reacto Academy" style={{ height: '40px', marginRight: '10px' }} />
                        Reacto Academy...
                    </a>
                    <button className="navbar-toggler" type='button' data-bs-toggle='collapse' 
                            data-bs-target='#navbarItems' aria-controls='#navbarItems' aria-expanded='false'
                            aria-label='Toggle'>
                        <span className="navbar-toggler-icon">
                            <FaBars title='Toggle Navigation' size={25} color='white' />
                        </span>
                    </button>

                    <div className="collapse navbar-collapse" id='navbarItems'>
                        <div className="d-flex justify-content-end align-items-center w-100">
                            <ul className="navbar-nav d-flex gap-4">
                                <li className="nav-item">
                                    <a href="/studentdashboard" className="nav-link text-white">
                                        <FaTachometerAlt title='Dashboard' size={25}  />
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="/studentcourses" className="nav-link text-white">
                                        <FaBookOpen title='Courses' size={25} />
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="/studentassignments" className="nav-link text-white">
                                        <FaClipboardList title='Assignments' size={25} />
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="/studentnotifications" className="nav-link text-white">
                                        <FaBell title='Notifications' size={25} />
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="/studentprofile" className="nav-link text-white">
                                        <FaUser title='Profile' size={25} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Welcome Manyika Munyinda */}

            <section className="container-fluid mt-5 pt-5">
                <StudentQuote />
            </section>

            {/* Student Details */}

            <section className="container mt-5">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Student Details</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </div>
                            <div className="col-md-6">
                                <p><strong>Student Number:</strong> {user.studentNumber}</p>
                                <p><strong>Role:</strong> {user.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Students Quick Stats */}

            <section>
                <StudentQuickStats />
            </section>

            {/* Assignment Tracker */}

            <section>
                <StudentAssignmentTracker />
            </section>

            {/* Courses Enrolled */}

            <section className="container">
                <div className='mb-3'>
                    <p className="fs-2 lead mb-0"> <strong>Courses Enrolled</strong> </p>
                    <code className=""> A line a day keeps a bug away (Manyika Munyinda). </code>
                </div>
                <div className="row">
                    {courses.map((course, idx) => (
                        <div className="col-12 col-md-6 col-lg-3 mb-4" key={idx}>
                            <div className="card border-0 shadow-sm h-100 rounded">
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        {course.icon}
                                        <p className="card-title lead fs-4">{course.name}</p>
                                    </div>
                                    <p className="card-text text-muted">Progress: {course.progress}%</p>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: `${course.progress}%`, backgroundColor: ' #06053d' }} aria-valuenow={course.progress} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className='mt-3'>
                                        <a style={{ color: ' #06053d' }} href={course.resume} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark align-items-center justify-content-end d-flex gap-2">
                                            <FaPlay size={20} title='Resume course' color='#06053d' /> View Resume
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certificates */}

            <section className='container mt-5 mb-5 bg-light'>
                <div className='text-center'>
                    <p className="display-6 mb-0"> All your Achievements come here. </p>
                    <p className="text-muted"> Code. Compile. Conquer. </p>
                </div>

                <div className="row">
                    {certificates.map((certificate, idx) => (
                        <div className="col-md-6 col-lg-4" key={idx}>
                            <div className="card border-0">
                                <div className="card-body text-center">
                                    <div>
                                        <FaRegSadTear size={60} className='mb-2' />
                                        <p className="card-title fs-4 mb-1"> No certificates yet! </p>
                                        <p className="card-text text-muted"> Keep learning to earn certificates. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            
            <footer style={{ backgroundColor: ' #06053d' }} className="container-fluid align-items-center d-flex justify-content-center row text-light" id='contactus'>
                            <div className="justify-content-center p-5 d-flex flex-column flex-lg-row">
                                <div className="col-12 col-md-3">
                                    <code style={{ color: '  #39FF14' }}  className='lead'> Reacto College</code>
                                    <p className="mb-2 text-white">  Chelstone Kamanga, </p>
                                    <p className='mb-2 text-white'> Lusaka, Zambia. </p>
                                    <p className="mb-2 text-white">  info@reactocollege.co.edu </p>
                                    <p className='text-white'>  +260 774 835 79 </p>
                                </div>
            
                                <div className="col-12 col-md-3">
                                    <code style={{ color: '  #39FF14' }}  className='lead'> Quick links </code>
                                    <ul className="list-unstyled">
                                        <li className='mb-2'> <a href="#" className='text-decoration-none text-white'> Privacy policy </a> </li>
                                        <li className='mb-2'> <a href="#" className='text-decoration-none text-white'> Terms and Conditions </a> </li>
                                        <li> <a href="#" className='text-decoration-none text-white'> Support </a> </li>
                                    </ul>
                                </div>
            
                                <div className="col-12 col-md-3">
                                    <code style={{ color: '  #39FF14' }}  className="lead"> System Info </code>
                                    <p className="mb-2 text-white"> Version: v1 . 0 . 0 </p>
                                    <p className="mb-2 text-white"> Last updated: July 7th, 2025 </p>
                                    <p className='text-white'> Developed By: Manyika Munyinda </p>
                                </div>
            
                                <div className="col-12 col-md-3 ">
                                    <code style={{ color: '  #39FF14' }}  className="lead"> Social Links </code>
                                    <div className="d-flex row gap-1"> 
                                        <a href="#" className='text-white text-decoration-none mb-2'> <FaLinkedinIn size={20} /> LinkedIn </a>
                                        <a href="#" className='text-white text-decoration-none mb-2'> <FaWhatsapp size={20} /> WhatsApp </a>
                                        <a href="#" className='text-white text-decoration-none mb-2'> <FaGithub size={20} /> GitHub </a>
                                        <a href="#" className='text-white text-decoration-none mb-2'> <FaFacebook size={20} /> Facebook </a>
                                    </div>
                                    <div className="form-check form-switch">
                                        <span> Dark mode </span>
                                        <input type="checkbox" id='darkModeToggle' className="form-check-input" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-center text-muted"> &copy;2025 Reacto College. All rights reserved. </p>
            </footer>

        </>
    )
}

export default StudentDashboard