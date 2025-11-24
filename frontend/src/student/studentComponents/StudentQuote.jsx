import React from 'react'
import { useState, useEffect } from 'react';

    const quotes = {
            Monday: "Every great developer you know got there by solving problems they were unqualified to solve until they actual did it. (Patrick McKenzile).",
            Tuesday: "First solve the problem. Then, write the code. (John Johnson)",
            Wednesday: "Don's worry if everything doesn't work write, if everything did, you'd be out of the job (Mosher's Law).",
            Thursday: "The best error message is the one that doesn't show up. (Thomas Fuchs)",
            Friday: "Experience is a name someone give to their mistakes. (Oscar Wilder)"
        }

const StudentQuote = () => {

     // Current Time and Date
        const [currentDate, setCurrentDate] = useState(new Date());
        const user = JSON.parse(localStorage.getItem("user"));
    
        useEffect(() => {
            const timer = setInterval(() => {
                setCurrentDate(new Date());
            }, 1000);
            return () => clearInterval(timer);
        }, []);

    const day = new Date().toLocaleDateString('en-US', {weekday: 'long'});
    const todayQuote = quotes[day];

    return (
        <section className='container-fluid'>
            <div className='container d-flex justify-content-between align-items-center p-5 flex-column flex-lg-row gap-3'>
                    <div className='w-75'>
                        <p className="lead fs-1 mb-0"> Welcome back, <strong> {user?.fullName} </strong> </p>
                        <p className='text-muted lead'> {currentDate.toLocaleDateString()} | {currentDate.toLocaleTimeString()} </p>
                        <code> {todayQuote} </code>
                    </div>

                    <div className='w-50'>
                        <img src="https://via.placeholder.com/60" alt="Profile"
                            className='rounded border border-2'
                            style={{ width: '600px', height: '60px', objectFit: 'cover' }}/>
                    </div>
                </div>
            
        </section>
    )
}

export default StudentQuote