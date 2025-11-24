import React, {  useState, useEffect } from 'react'
import axios from 'axios'
import { FaPlusSquare, FaTrashAlt } from 'react-icons/fa';

const StudentToDoApp = ({ userId }) => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [time, setTime] = useState(new Date())

        // Current time and date hook
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(timer);
    }, [])

    const day = new Date().toLocaleDateString("en-US", { weekday: "long"})

    // Fetching tasks.
    useEffect(() => {
        axios.get(`http://localhost:5000/taks/${userId}`)
        .then(res => setTasks(res.data))
        .catch(err => console.error("Error fetching tasks:", err));
    }, [userId]);

    // Function for adding tasks to list.
    const addTask = () => {
        if (!newTask.trim()) return;
        axios.post("http://localhost:500/tasks", { user_id: userId, text: newTask})
        .then(res => setTasks([res.data, ...tasks]));
        setNewTask("");
    }

    // Toggle task completion.
    const toggleTask = (id, completed) => {
        axios.put(`http://localhost:5000/task/${id}`, { completed: !completed})
        .then(res => {
            setTasks(tasks.map(task => task.id === id ? res.data : task));
        });
    }

    // Function for deleting task from the list
    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/task/${id}`)
        .then(() => setTasks(tasks.filter(task => task.id !== id)));
    };


    return (

        <>
            <section className="container-fluid">
                <div className="container mt-5 p-5">
                    <div>
                        <p className="lead mb-0"> <strong> Manyika's_To-Dos </strong> </p>
                        <code> Repetation daily lead to mastery. </code>
                        <p className="text-muted"> {time.toLocaleDateString()} | {time.toLocaleTimeString()} </p>
                    </div>

                    <div className='d-flex'>
                        <input type="text" className="form-control me-2 w-50"
                            value={newTask}
                            onChange={(event) => setNewTask(event.target.value)}
                            placeholder='Enter a task...'/>
                        <button style={{ backgroundColor: " #09091eff" }} className="btn" onClick={addTask}>
                            <FaPlusSquare color='white' />
                        </button>
                    </div>

                    <ul className="list-group">
                        {tasks.map((task) => (
                            <li key={task.id} className={`list-group-item text-dark d-flex justify-content-between align-items-center ${task.completed ? "list-group-item-success" : ""}`}>
                                <span style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer"}} onClick={() => toggleTask(task.id, task.completed)}>
                                    {task.text}        
                                </span>
                                <button className="btn btn" onClick={() => deleteTask(task.id)}>
                                    <FaTrashAlt />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}

export default StudentToDoApp