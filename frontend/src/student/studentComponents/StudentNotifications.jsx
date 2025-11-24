import React from 'react'

const StudentNotifications = () => {
    return (
        <div className='container'>
            <div className="d-flex row flex-column text-center justify-content-center align-items-center vh-100">
                <p className='lead fs-1 mb-0'> Student Notifications </p>
                <p className="text-muted text-center mb-0"> You have no notifications yet! </p>
                <button onClick={() => window.location.href = '/studentdashboard'} className="btn mt-3">
                    Back to Dashboard
                </button>
                
                <footer className='d-flex justify-content-center align-items-center'>
                    <p className="text-muted">© 2025 | Reacto College. All rights reserved.</p>
                </footer>
            </div>
        </div>
    )
}

export default StudentNotifications