import React from 'react'
import { FaAccusoft, FaHome, FaUser } from 'react-icons/fa'

const AccountLogs = () => {
    return (
        
        <section className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div>
                    <p className="lead"><b> Your have to log into your account to start learning. </b> </p>
                    <div className='d-flex justify-content-center gap-4'>
                        <a href="/"> <FaHome size={25} title='Home' /> </a>
                        <a href="signup"> <FaUser size={25} title='Signin' /> </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccountLogs