import React, { useEffect } from 'react';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
// import { useInView } from 'react-intersection-observer';
import { FaBook, FaClipboardList, FaCheckCircle, FaChalkboardTeacher, FaPlay } from 'react-icons/fa';
import StudentToDoApp from './StudentToDoApp';


const StudentQuickStats = () => {

    const stats = [
        {title: 'Courses Enrolled', value: 5, icon: <FaBook size={50} color='#06053d' />, review: 'To add URL'},
        {title: "Pen. Assignments", value: 3, icon: <FaClipboardList size={50} color=' #06053d' />, review: "To add URL"},
        {title: "Com. Tasks", value: 12, icon: <FaCheckCircle size={50} color='#06053d' />, review: 'To add URL'},
        {title: "To-Do-App", value: 2, icon: <FaChalkboardTeacher size={50} color='#06053d' />, review: "/studenttodoapp" },
    ]

    // Animation On Scroll
    useEffect(() => {
        AOS.init({
            duration: 2000, // Animation duration in milliseconds
        })
    }, [])


    return (
        <section className="container-fluid">
            <div className="container mt-3 mb-5">
                <div data-aos="fade-up" className='mb-3'>
                    <p className="lead fs-2 mb-0"> <strong>Students Quick Stats.</strong> </p>
                    <code> Every line counts. keep coding. </code>
                </div>
                <div className='row'>
                    {stats.map((stat, idx) => (
                        <div key={idx} className='col-12 col-md-6 col-lg-3'>
                            <div className="card border-0 shadow-sm rounded h-100" data-aos="zoom-in">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='mt-2' data-aos="zoom-in">
                                            <p className='lead card-title fs-4 card-title' data-aos="slide-right"> {stat.title} </p>
                                            <a href={stat.review} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark rounded align-items-center justify-content-start d-flex gap-2">
                                                <FaPlay size={20} title='Review' color='#06053d' /> Review
                                            </a>
                                        </div>
                                        <div className=''>
                                            <p data-aos="slide-left"> {stat.icon} </p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StudentQuickStats