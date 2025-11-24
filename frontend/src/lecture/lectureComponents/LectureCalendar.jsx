import React, { useState, useContext } from "react";
import Calendar from "react-calendar";
import { FaCheck, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import { LectureContext } from "../context/LectureContext";
import "react-calendar/dist/Calendar.css";

const LectureCalendar = () => {
  const { lectures, addLecture, completeLecture, removeLecture } = useContext(LectureContext);
  const [newEvent, setNewEvent] = useState({ title: "", date: "" });

  const handleAdd = () => {
    const today = new Date().toISOString().split("T")[0];
    if (!newEvent.title || !newEvent.date)
      return alert("Enter both title and date for lecture.");
    if (newEvent.date < today)
      return alert("You can't schedule a lecture in the past.");

    addLecture({ ...newEvent, completed: false, status: "active" });
    setNewEvent({ title: "", date: "" });
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      const hasLecture = lectures.some((event) => event.date === formattedDate);
      return hasLecture ? <div className="dot-marker"></div> : null;
    }
  };

  return (
    <section className="container mt-5 mb-5">
      <div className="card bg-light text-white d-flex justify-content-center align-items-center p-5">
        <p className="lead fs-1 mb-5">Lectures Calendar...</p>
        <div className="d-flex gap-5 flex-column flex-lg-row w-100">
          <div className="w-100">
            <p className="lead text-center">Add Lecture...</p>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Lecture Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <input
              type="date"
              className="form-control mb-2"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <button
              onClick={handleAdd}
              className="btn btn-lg mb-2 w-100"
              style={{ backgroundColor: "#06053d", color: "#39FF14" }}
            >
              <FaPlusSquare className="me-2" /> Add Lecture
            </button>

            <p className="lead fs-3">Scheduled Lectures</p>
            <ul className="list-group">
              {lectures.length === 0 ? (
                <li className="list-group-item text-muted border">
                  No lectures scheduled
                </li>
              ) : (
                lectures.map((event, idx) => (
                  <li
                    key={idx}
                    className="list-group-item border d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <span>
                        {event.title} - {event.date}
                      </span>
                      {event.completed && (
                        <span className="badge bg-success"> Completed </span>
                      )}
                    </div>
                    <div
                      className="d-flex gap-2 rounded"
                      style={{ backgroundColor: "#06053d" }}
                    >
                      {!event.completed && (
                        <button onClick={() => completeLecture(idx)} className="btn btn-sm">
                          <FaCheck color="white" />
                        </button>
                      )}
                      <button onClick={() => removeLecture(idx)} className="btn">
                        <FaTrashAlt title="Delete Lecture" color="red" />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="w-100">
            <p className="lead">Manage and plan your lecture schedule</p>
            <Calendar tileContent={tileContent} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LectureCalendar;
