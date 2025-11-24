import React from 'react'
import { FaTachometerAlt } from 'react-icons/fa'

const StudentCourses = () => {
    return (
        <div className='container'>
            <div className="d-flex row flex-column text-center justify-content-center align-items-center vh-100">
                <p className='lead fs-1 mb-0'> Student Courses </p>
                <p className="text-muted text-center mb-0"> You have no active courses yet! </p>
                <button onClick={() => window.location.href = '/studentdashboard'} className="btn mt-3">
                    <FaTachometerAlt title='Dashboard' size={20} className='me-2' />    Back to Dashboard
                </button>
                <footer className='d-flex justify-content-center align-items-center'>
                    <p className="text-muted mt-3">© 2025 | Reacto College. All rights reserved.</p>
                    </footer>
            </div>
        </div>
    )
}

export default StudentCourses