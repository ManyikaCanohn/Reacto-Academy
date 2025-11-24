import React from 'react'
import { FaTachometerAlt } from 'react-icons/fa'
// import Manyika from '../student/studentComponets/Plan.jpg'

const StudentProfile = () => {

    const profileDetails = [
        {name: 'Manyika Munyinda', email: 'manyikamunyinda4@gmail.com', studentID: 1234569, major: 'Information Technology', year: 'Third Year'},
    ]

    return (


        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="row">
                    {profileDetails.map((detail, idx) => (
                        <div className="col-md-6 w-100" key={idx}>
                            <div className='text-center'>
                                <p className='lead fs-1 mb-0'> Student Profile </p>
                                <p className="text-muted"> Here are your profile details </p>
                            </div>
                            <div className="d-flex row flex-column justify-content-center align-items-center ">
                                <p className="lead"> <b>Name:</b> {detail.name} </p>
                                <p className="lead"> <b>Email:</b> {detail.email} </p>
                                <p className="lead"> <b>Program:</b> {detail.major} </p>
                                <p className="lead"> <b>StudentID:</b> {detail.studentID} </p>
                            </div>

                            <div className='d-flex flex-column align-items-center'>
                                <button className="btn mt-3" onClick={() => window.location.href = '/studentdashboard'}>
                                    <FaTachometerAlt className='me-2' title='Dashboard' size={20} />    Back to Dashboard
                                </button>

                                <footer className='d-flex align-items-center mt-5'>
                                    <p className="text-muted mt-3">© 2025 | Reacto College. All rights reserved.</p>
                                </footer>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StudentProfile