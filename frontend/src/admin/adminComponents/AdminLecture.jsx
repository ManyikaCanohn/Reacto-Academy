import React, { useState } from 'react'
import { FaPenAlt, FaSearch, FaTrashAlt } from 'react-icons/fa';

const AdminLecture = () => {

    const [lectures, setLectures] = useState([
        {id: 1, title: "Intro to Database", course: "PostgreSQL", lecturer: "Mr Munyinda", date: "2025-07-22", status: "Upcoming" },
        {id: 2, title: "React Basics", course: "A Javascript framework", lecturer: "Mr Canohn", date: "2025-08-29", status: "Completed" },
        {id: 3, title: "Node.js", course: "The basic of backend knowledge", lecturer: "Mr Manyika", date: "2025-09-22", status: "Canceld" },
        {id: 4, title: "Intro oto Programming", course: "Find your interest in the world of coding", lecturer: "Ms Kamudole", date: "2025-10-22", status: "Upcoming" },
    ]);

    return (
        
        <section className="container-fluid mt-5">
            <div className="container">
                <div>
                    <p className="lead fs-1 mb-0"> <strong> Lecturer Oversight... </strong> </p>
                    <code> A line a day keeps a bug away. </code>
                </div>

                <div className='d-flex justify-content-center align-items-center'>
                    <form action="" className="d-flex mb-3 flex-column flex-lg-row align-items-center justify-content-around">
                        <input type="text" className="form-control me-2 w-100" placeholder="Search by lecture or course..." />
                        <button className="btn btn-outline-secondary mt-2 mt-lg-0">
                            <FaSearch />
                        </button>
                    </form>
                </div>

                <div className="table-responsive shadow rounded">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table dark">
                            <tr>
                                <th> Lecture Title </th>
                                <th> Course </th>
                                <th> Lecturer </th>
                                <th> Date </th>
                                <th> Status </th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {lectures.map((lec) => (
                                <tr key={lec.id}>
                                    <td> {lec.title} </td>
                                    <td> {lec.course} </td>
                                    <td> {lec.lecturer} </td>
                                    <td> {lec.date} </td>
                                    <td>
                                        <span className={`badge${lec.status === "Upcoming" ? "bg-success" : lec.status === "Completed" ? "bg-secondary" : "bg-danger"}`}>
                                            {lec.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-warming bnt-sm me-2">
                                            <FaPenAlt title='Edit' color='green' />    
                                        </button>
                                        <button className="btn btn bnt-sm">
                                            <FaTrashAlt title='Delete' color='red' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default AdminLecture