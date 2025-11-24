import React, { useState, useEffect } from 'react';
import { FaUserFriends, FaFileArchive, FaUserGraduate, FaHome, FaSignOutAlt, FaDeskpro, FaBars, FaRegTimesCircle, FaCloudDownloadAlt, FaPlayCircle, FaPaperPlane, FaTrashAlt, FaBook, FaPlusSquare, FaPencilRuler, FaEye } from 'react-icons/fa';
import ReactoLogo from '../assets/Reacto.jpg';
import LectureCalendar from './lectureComponents/LectureCalendar';
import LectureQuote from './lectureComponents/LectureQuote';
import LectureToday from './lectureComponents/LectureToday';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LectureDashboard = () => {
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [message, setMessage] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [newAssignments, setNewAssignments] = useState({ title: "", dueDate: "", file: null });
    const [schedule, setSchedule] = useState([]);
    const [report, setReport] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/");
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setNewAssignments({...newAssignments, file});
    };

    const addAssignment = () => {
        const dateStr = new Date().toISOString().split("T")[0];
        if (!newAssignments.title || !newAssignments.dueDate || !newAssignments.file) {
            return alert("Title, date and file are required!");
        }
        if ( newAssignments.dueDate < dateStr) return alert("Cannot schedule an assignment in the past.");
        const assignment = {...newAssignments, id: Date.now()};
        setAssignments([...assignments, assignment]);
        setNewAssignments({title: "", dueDate: "", file: null });
        document.getElementById('fileInput').value = null;
    };

    const handleNotesUpload = (event) => {
        const file = event.target.files[0];
        if (file) { 
            setNotes([...notes, file.name]);
            event.target.value = '';
        }
    };

    const handleSend = (type) => {
        setMessage(alert(`Your ${type} has been sent to students successfully!`));
        setTimeout(() => setMessage(''), 3000);
    }

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.includes("video")) {
            setVideoFile(URL.createObjectURL(file));
        };
        event.target.value = '';
    }

    const removeAssignment = (id) => {
        setAssignments(assignments.filter(a => a.id !== id));
    }

    const removeNotes = (idx) => {
        setNotes(notes.filter((_, i) => i !== idx));
    }

    const removeVideo = () => setVideoFile(null);

    const handleEditStudent = async (student) => {
        const newName = prompt("Enter new name:", student.name);
        const newEmail = prompt("Enter new email:", student.email);
        if (newName && newEmail) {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:5000/api/auth/users/${student._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ name: newName, email: newEmail })
                });
                if (res.ok) {
                    alert("Student updated");
                    // Refresh students
                    const fetchRes = await fetch('http://localhost:5000/api/students', {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    const data = await fetchRes.json();
                    setStudents(data);
                } else {
                    alert("Failed to update");
                }
            } catch (err) {
                console.error(err);
                alert("Error updating student");
            }
        }
    };

    const handleDeleteStudent = async (id) => {
        if (confirm("Are you sure you want to delete this student?")) {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    alert("Student deleted");
                    // Refresh students
                    const fetchRes = await fetch('http://localhost:5000/api/students', {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    const data = await fetchRes.json();
                    setStudents(data);
                } else {
                    alert("Failed to delete");
                }
            } catch (err) {
                console.error(err);
                alert("Error deleting student");
            }
        }
    };

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const [students, setStudents] = useState([]);

    useEffect(() => {
    const fetchStudents = async () => {
        try {
        const token = localStorage.getItem("token");
        const res = await fetch('http://localhost:5000/api/students', {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        setStudents(data);
        } catch (err) {
        console.error('Error fetching students:', err);
        }
    };
    fetchStudents();
    }, []);


    return (
        <>
            {/* --- DESKTOP SIDEBAR --- */}
            <div className={`position-fixed top-0 start-0 h-100 d-none d-lg-flex flex-column`}
                 style={{ width: "250px", backgroundColor: '#06053d', color: 'white', paddingTop: '1rem', zIndex: 1050 }}>
                <div className="d-flex justify-content-between align-items-center px-3 mb-4">
                    <p className="lead fs-4 text-light">Reacto Academy</p>
                    <button className="btn btn-sm text-light d-lg-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <FaBars size={24} />
                    </button>
                </div>
                <ul className="list-unstyled px-3 flex-grow-1">

                    <li className="mb-3">
                        <Link to="/lecturestudents" className="text-decoration-none text-light d-flex gap-2 align-items-center">
                            <FaUserFriends /> Manage Students
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link to="/lecturereports" className="text-decoration-none text-light d-flex gap-2 align-items-center">
                            <FaFileArchive /> Reports
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link to="/lectureprofile" className="text-decoration-none text-light d-flex gap-2 align-items-center">
                            <FaUserGraduate /> Profile
                        </Link>
                    </li>
                </ul>
                <div className="px-3 mb-3">
                    <button onClick={logout} className="btn btn-danger w-100 d-flex gap-2 align-items-center">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            {/* --- MOBILE TOPBAR --- */}
            <nav style={{ backgroundColor: "#06053d" }}
                 className="navbar fixed-top d-flex justify-content-between align-items-center px-3 d-lg-none">
                <Link to="/" className="navbar-brand d-flex leading-tight align-items-center" style={{ color: "#39FF14", lineHeight: '1' }}>
                    <img src={ReactoLogo} alt="Reacto Academy" style={{ height: '30px', marginRight: '8px' }} />
                    Reacto Academy
                </Link>
                <button className="btn" onClick={() => setSidebarOpen(true)}>
                    <FaBars size={28} color="white" />
                </button>
            </nav>

            {/* --- MOBILE BOTTOM NAVBAR --- */}
            <nav style={{ backgroundColor: "#06053d" }} className="navbar fixed-bottom d-flex justify-content-around py-2 d-lg-none">
                <Link to="/dashboard" className="text-decoration-none text-center">
                    <FaHome size={24} color="#39FF14" />
                    <div className="small" style={{ color: "#39FF14" }}>Home</div>
                </Link>
                <Link to="/students" className="text-decoration-none text-center">
                    <FaUserFriends size={24} color="#39FF14" />
                    <div className="small" style={{ color: "#39FF14" }}>Students</div>
                </Link>
                <Link to="/lecturreport" className="text-decoration-none text-center">
                    <FaFileArchive size={24} color="#39FF14" />
                    <div className="small" style={{ color: "#39FF14" }}>Courses</div>
                </Link>
                <Link to="/lectureprofile" className="text-decoration-none text-center">
                    <FaUserGraduate size={24} color="#39FF14" />
                    <div className="small" style={{ color: "#39FF14" }}>Profile</div>
                </Link>
                <Link to="/lecturelogout" className="text-decoration-none text-center">
                    <FaSignOutAlt size={24} color="red" />
                    <div className="small" style={{ color: "red" }}>Logout</div>
                </Link>
            </nav>

            {/* --- MAIN CONTENT --- */}
            <div className="main-content" style={{ marginLeft: '250px', padding: '1rem' }}>
                {/* Welcome Section */}
                <section className="container mt-5 p-5">
                    <div className="container mt-5 mb-5">
                        <div className="d-flex row">
                            <p className="lead fs-1"> Welcome back, <b>{user?.fullName}</b> </p>
                            <div className='d-flex gap-2'>
                                <p className="text-muted"> Current Date and Time: </p> 
                                <p className='fs-bold'>{date.toLocaleString()}</p>
                            </div>
                            <LectureQuote />
                        </div>
                    </div>
                </section>

                {/* Today Section */}
                <section className="container mb-5">
                    <LectureToday schedule={schedule} assignments={assignments} />
                </section>

                <section className="container mt-5">
                    <h2 className="fs-3 mb-3">Registered Students</h2>
                    <ul className="list-group">
                        {students.length === 0 ? (
                        <li className="list-group-item">No students registered yet.</li>
                        ) : (
                        students.map((student) => (
                            <li key={student._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{student.name}</strong> - {student.email} - Student #: {student.studentNumber}
                            </div>
                            <div>
                                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditStudent(student)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                            </div>
                            </li>
                        ))
                        )}
                    </ul>
                </section>


                {/* Lecture Resources */}
                <section className="container-fluid p-5 border-1 card">
                    <div className="card border-0 container">
                        <p data-aos="zoom-in" className="mb-3 lead fs-1 text-center"> Lecture Resources </p>
                        {message && <div className="alert alert-success" role='alert'>{message}</div>}

                        {/* Notes & Video */}
                        <div className="gap-3 d-flex justify-content-between align-items-center flex-column flex-lg-row">
                            {/* Upload notes */}
                            <div data-aos="fade-up" className=' w-100'>
                                <p className='lead'>
                                    <FaCloudDownloadAlt className='me-2' /> <b>Upload Notes</b>
                                </p>
                                <input type="file" className="form-control mb-3 w-100" accept='.pdf, .doc, .docx' style={{ backgroundColor: '#06053d', color: 'white' }}
                                    onChange={handleNotesUpload}/>
                                <ul className="list-group">
                                    {notes.map((note, idx) => (
                                        <li key={idx} className='list-group-item d-flex justify-content-between align-items-center'>
                                            <small>{note}</small>
                                            <div className="d-flex gap-3 rounded px-2" style={{ backgroundColor: '#06053d' }}>
                                                <button onClick={() => handleSend("notes")} className='btn btn-sm'>
                                                    <FaPaperPlane title='Send notes to students' color='lime' />
                                                </button>
                                                <button onClick={() => removeNotes(idx)} className="btn btn-sm">
                                                    <FaTrashAlt color='red' title='Delete notes' />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Video Upload */}
                            <div data-aos="fade-down" className="mb-3 w-100">
                                <p className="lead">
                                    <FaPlayCircle className='me-2' /> <b>Upload Videos</b>
                                </p>
                                <input type="file" className="form-control w-100" accept='video/*' style={{ backgroundColor: '#06053d', color: 'white' }} 
                                    onChange={handleVideoUpload}/>
                                {videoFile && (
                                    <div className='mt-2'>
                                        <video width='100%' height='185' controls>
                                            <source src={videoFile} type='video/mp4' />
                                            Your browser does not support the video.
                                        </video>
                                        <div className="d-flex justify-content-center">
                                            <button onClick={() => handleSend("video")} className="btn btn-sm">
                                                <FaPaperPlane title='Send video' color='lime' />
                                            </button>
                                            <button onClick={removeVideo} className="btn btn-sm">
                                                <FaTrashAlt title='Delete video' color='red' />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Assignments & Reports */}
                        <div className='container-fluid d-flex justify-content-center align-items-center gap-5 flex-column flex-lg-row mt-3'>
                            <div data-aos="slide-right" className='d-flex justify-content-center card border-0 align-items-center mt-2 w-100'>
                                <p className='lead'><FaBook className='me-2'/> <b>Upload Assignments</b></p>
                                <input type="text" className='form-control mb-2 w-100'
                                    name='title'
                                    placeholder='Assignment Title'
                                    onChange={(e) => setNewAssignments({...newAssignments, title: e.target.value})}
                                    value={newAssignments.title}/>
                                <input type="date" className='form-control mb-2 w-100'
                                    name='dueDate'
                                    value={newAssignments.dueDate}
                                    onChange={(e) => setNewAssignments({...newAssignments, dueDate: e.target.value})}/>
                                <input type="file" className='form-control mb-2 w-100'
                                    id='fileInput'
                                    accept='.pdf, .doc, .docx'
                                    onChange={handleFileChange}/>
                                <button onClick={addAssignment} style={{ backgroundColor: '#06053d', color: 'white' }} className="btn w-100 mt-2">
                                    <FaPlusSquare color='white' className='me-1' /> Add Assignments
                                </button>
                                <ul className="list-group mb-2 mt-2">
                                    {assignments.map((assignment) => (
                                        <li key={assignment.id} className="list-group-item d-flex justify-content-between align-items-center gap-5">
                                            <div className='d-flex gap-3 align-items-center justify-content-between flex-column flex-lg-row'>
                                                <small className="text-muted"> {assignment.file.name} </small> 
                                                <small className="text-muted"> Due: {assignment.dueDate} </small>
                                            </div>
                                            <div className='d-flex gap-2 border rounded' style={{ backgroundColor: '#06053d'}}>
                                                <a href={URL.createObjectURL(assignment.file)} target='_blank' rel='noopener noreferrer' className='btn btn-sm'> 
                                                    <FaEye title='View' color='white' /> 
                                                </a>
                                                <button onClick={() => removeAssignment(assignment.id)} className="btn btn-sm">
                                                    <FaTrashAlt color='red' />
                                                </button>
                                                <button onClick={() => handleSend('assignment')} className="btn btn-sm">
                                                    <FaPaperPlane color='lime' />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div data-aos="zoom-out" className='w-100 d-flex card border-0 justify-content-center align-items-center mb-3 p-5 mt-2'> 
                                <div>
                                    <p className="lead"> <FaPencilRuler />  <b> Create a report </b>  </p>
                                </div>
                                <form action="" className='flex-column d-flex w-100'>
                                    <textarea name="" className='mb-3' id="report" placeholder='Write your report here' onChange={(e) => setReport(e.target.value)} />
                                    <button className='border-0 btn btn-sm align-items-center ' style={{ color: "white", backgroundColor: "#0e1144ff" }}>
                                        <FaPaperPlane  size={20} color='white'/> Send Report
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Calendar */}
                <section>
                    <LectureCalendar />
                </section>

                {/* Footer */}
                <footer style={{ backgroundColor: '#06053d' }} className="container-fluid align-items-center d-flex justify-content-center row text-light mt-5">
                    <div className="justify-content-center p-5 d-flex flex-column flex-lg-row">
                        {/* Your existing footer content */}
                    </div>
                </footer>
            </div>
        </>
    );
};

export default LectureDashboard;
