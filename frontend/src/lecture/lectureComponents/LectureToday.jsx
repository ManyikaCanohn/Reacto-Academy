import React, { useContext } from "react";
import { LectureContext } from "../context/LectureContext";
import LectureRecentActivity from "./LectureRecentActivity";

const LectureToday = () => {
  const { lectures, notifications } = useContext(LectureContext);
  const today = new Date().toISOString().split("T")[0];
  const todaysLectures = lectures.filter(
    (item) => item.date === today && !item.completed
  );

  return (
    <section className="container-fluid rounded">
      <p className="lead fs-2">
        <b>Today's Overview - {new Date().toDateString()}</b>
      </p>

      {notifications.length > 0 && (
        <div className="alert alert-info">
          🔔 {notifications[0].message} ({notifications[0].time})
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center gap-3 flex-column flex-lg-row">
        <div className="w-100">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
              <p>Lectures Scheduled:</p>
              <span>{todaysLectures.length}</span>
            </li>
            {todaysLectures.length > 0 && (
              <li className="list-group-item">
                <p>Topics:</p>
                <ul>
                  {todaysLectures.map((lec, idx) => (
                    <li key={idx}>{lec.title}</li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>

        {/* <div className="w-100">
          <LectureRecentActivity />
        </div> */}
      </div>
    </section>
  );
};

export default LectureToday;
