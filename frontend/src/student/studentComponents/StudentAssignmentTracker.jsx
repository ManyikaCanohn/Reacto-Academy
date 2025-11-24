import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaClock, FaPaperPlane } from 'react-icons/fa'
// import { Spinner } from 'react-bootsrap'


// Helper: check of due date is past.
const isOverdue = (dueDate) => {
    const now = new Date();
    return new Date(dueDate) < now;
};

const StudentAssignmentTracker = () => {

    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submittingId, setSubmittingId] = useState(null);

    // Simulate fetching data from the backend.
    useEffect(() => {
        setTimeout(() => {
            setAssignments([
                {id: 1, title: "React Project", description: "Build a React app with bootstrap 5.", dueDate: "2025-08-18", status: "pending"},
                {id: 1, title: "Python Project", description: "Develop a to-do-app using python.", dueDate: "2025-08-25", status: "pending"},
                {id: 1, title: "Database Assignment", description: "Add a backend to the to-do-app.", dueDate: "2025-09-01", status: "pending"},
                {id: 2, title: "Database Assignment", description: "Design a PostreSQL schema.", dueDate: "2025-08-10", status: "submitted", submittedAt: "2025-08-09T14:00:00"},
            ]);
            setLoading(false);
        }, 800)
    }, []);

    const handleSubmit = (id) => {
        if (!window.confirm("Submit this assignment?")) return;
        setSubmittingId(id);
        setTimeout(() => {
            setAssignments((prev) => 
            prev.map((a) => 
                a.id === id ? 
                    { ...a, status: "submitted", submittedAt: new Date().toISOString() } : a
            )
        );
        setSubmittingId(null);
        }, 600);
    }

    const pendingAssignments = assignments.filter((a) => a.status === "pending");
    const submittedAssignments = assignments.filter((a) => a.status === "submitted");

    if (loading) {
        return (
            <div className="text-center my-4">
                {/* <Spinner animation="border" /> */}
            </div>
        );
    }

    return (
        <section className="container-fuild">
            <div className="container">
                <div className='d-flex row mb-3'>
                    <p className="lead fs-2 mb-0"> <strong>Assignments Tracker...</strong> </p>
                    <code> Errors, such is a journey of coding (Rose Kamudole). </code>
                </div>

                <div className="row">
                    {pendingAssignments.length === 0 ? (
                        <div className="card col-12">
                            <div className="card-body">
                                <p className="text-muted"> No pending assignments. </p>
                            </div>
                        </div>
                    ) : (
                        pendingAssignments.map((a) => (
                            <div key={a.id} className="card col-12 col-lg-4 border-0 mb-4">
                                <div className='shadow-sm h-100'>
                                    <div className="card-body">
                                        <div className="row">
                                            <p className="lead fs-4"> {a.title} {" "} 
                                                {isOverdue(a.dueDate) && (
                                                    <FaClock />
                                                )}
                                            </p>
                                            <p className='text-muted mb-2'> {a.description} </p>
                                            <p className='text-muted mb-2'>Due: {a.dueDate}</p>
                                            <div xs='auto' className='d-flex align-items-center'>
                                                <button
                                                    style={{ backgroundColor: '#06053d', color: 'white' }}
                                                    className='btn btn-sm' size="sm"
                                                    onClick={() => handleSubmit(a.id)}
                                                    disabled={submittedAssignments === a.id}>
                                                        {submittingId === a.id ? (
                                                            <>
                                                                <p className="spinner" animation="border"></p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaPaperPlane /> Submit
                                                            </>
                                                        )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}

export default StudentAssignmentTracker