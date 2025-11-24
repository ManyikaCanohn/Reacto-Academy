import React, { useState, useEffect } from 'react'

const quotes = {
            Monday: "Every great developer you know got there by solving problems they were unqualified to solve until they actual did it. (Patrick McKenzile).",
            Tuesday: "First solve the problem. Then, write the code. (John Johnson)",
            Wednesday: "Don's worry if everything doesn't work write, if everything did, you'd be out of the job (Mosher's Law).",
            Thursday: "The best error message is the one that doesn't show up. (Thomas Fuchs)",
            Friday: "Experience is a name someone give to their mistakes. (Oscar Wilder)"
        }

const AdminWelcome = () => {

        // Current Time and Date
        const [currentDate, setCurrentDate] = useState(new Date());

        useEffect(() => {
            const timer = setInterval(() => {
                setCurrentDate(new Date());
            }, 1000);
            return () => clearInterval(timer);  
        }, []);

        const day = new Date().toLocaleDateString("us-en", {weekday: "long"});
        const todayQuote = quotes[day];

    return (
        <section className="container-fluid mt-5">
            <div>
                <div className="container d-flex justify-content-between align-items-center p-5 flex-column flex-lg-row gap-3">
                    <div className="w-75">
                        <p className="lead fs-1 mb-0"> Welcome back, <strong>Rose Kamudole.</strong> </p>
                        <p className="text-muted mb-2 lead"> {currentDate.toLocaleDateString()} | {currentDate.toLocaleTimeString()} </p>
                        <code> {todayQuote} </code>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminWelcome