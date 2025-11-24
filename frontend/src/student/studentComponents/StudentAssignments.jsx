import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTachometerAlt } from 'react-icons/fa'

const StudentAssignments = () => {

    const navigate = useNavigate();

    return (
        <section className='container'>
            <div className="d-flex row flex-column text-center justify-content-center align-items-center vh-100">
                <p className='lead fs-1 mb-0'> Student Assignments </p>
                <p className="text-muted text-center mb-0"> You have no assignments yet! </p>
                <button onClick={() => navigate('/studentdashboard')} className="btn mt-3 mb-5">
                    <FaTachometerAlt size={20} className='me-2' />    Back to Dashboard
                </button>
                <footer className='d-flex justify-content-center align-items-center'>
                    <p className="text-muted">© 2025 | Reacto College. All rights reserved.</p>
                </footer>
            </div>
        </section>
    )
}

export default StudentAssignments