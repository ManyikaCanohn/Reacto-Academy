import React, { useEffect } from 'react'
import { FaUsers, FaBookOpen, FaRegEye, FaGraduationCap, FaPenAlt, } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';


const AdminQuickStats = () => {

    useEffect(() => {
        AOS.init({
            duration: 3000
        })
    })

    const stats = [
        { title: 'Total Students', value: 1200, btn: 'View Details', icon: <FaUsers size={50} color='#06053d' /> },
        { title: 'Total Lecturers', value: 45, btn: 'View Details',  icon: <FaGraduationCap size={50} color='#06053d' /> },
        { title: 'Active Courses', value: 300, btn: 'View Details', icon: <FaBookOpen size={50} color='#06053d' /> },
        { title: 'New Enrollment', value: 20, btn: 'View Details', icon: <FaPenAlt size={50} color='#06053d' /> }
    ];

    return (

            <section className="container-fluid">
                <div data-aos='zoom-in' className="container mt-3 mb-5">
                    <div>
                        <hr />
                        <p data-aos='fade-in' className="lead fs-1"> <strong>Quick Stats...</strong> </p>
                    </div>
                    <div className="row">
                        {stats.map((stat, idx) => (
                            <div className="col-12 col-md-6 col-lg-3" key={idx}>
                                <div data-aos='zoom-in' className="card shadow border-0 rounded h-100">
                                    <div className="card-body">
                                        <div>
                                            <div className="d-flex align-items-center justify-content-center gap-4">
                                                <p data-aos='zoom-out'> {stat.icon} </p>
                                                <p data-aos='fade-up' className="card-title lead"> {stat.title} </p>
                                            </div>
                                            <p data-aos='fade-in'  className="card-text fs-1 text-end">{stat.value}</p>
                                            <button data-aos='fade-down' className="btn"> <FaRegEye title='View Details' /> {stat.btn}</button>
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

export default AdminQuickStats