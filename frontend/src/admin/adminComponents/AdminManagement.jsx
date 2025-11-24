import React, { useEffect } from 'react'
import { FaBookOpen, FaBullhorn, FaChalkboardTeacher, FaPenAlt, FaUserGraduate, FaUserPlus } from 'react-icons/fa'
import AOS from 'aos';
import 'aos/dist/aos.css';


const AdminManagement = () => {

    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    })

    return (
        <section className="container-fluid">
            <div data-aos='fade-in' className="container">
                <div className="row">
                    <div className='justify-content-center d-flex gap-4 flex-column flex-lg-row align-items-center'>
                        <button data-aos='slide-right' className='btn'>
                            <FaChalkboardTeacher size={25} color=' #06053d' title='Add lecture' />
                        </button>
                        <button data-aos='fade-up' className='btn'>
                            <FaUserGraduate size={25} color=' #06053d' title='Add student' />
                        </button>
                        <button data-aos='fade-up' className='btn'>
                            <FaBullhorn size={25} color=' #06053d' title='New Announcement' />
                        </button>
                        <button data-aos='slide-left' className='btn'>
                            <FaBookOpen title='Add new course' color=' #06053d' size={25} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminManagement