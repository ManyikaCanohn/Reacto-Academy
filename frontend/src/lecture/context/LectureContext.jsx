import React, { createContext, useState, useEffect } from "react";

export const LectureContext = createContext();

export const LectureProvider = ({ children }) => {
  const [lectures, setLectures] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("lectures");
    if (stored) setLectures(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("lectures", JSON.stringify(lectures));
  }, [lectures]);

  const addLecture = (lecture) => {
    const updated = [lecture, ...lectures];
    setLectures(updated);
    notify(`New lecture scheduled: ${lecture.title}`);
  };

  const completeLecture = (index) => {
    const updated = [...lectures];
    updated[index].completed = true;
    setLectures(updated);
    notify(`Lecture completed: ${updated[index].title}`);
  };

  const removeLecture = (index) => {
    const deleted = lectures[index];
    const updated = lectures.filter((_, i) => i !== index);
    setLectures(updated);
    notify(`Lecture deleted: ${deleted.title}`);
  };

  const notify = (message) => {
    const newNote = { message, time: new Date().toLocaleTimeString() };
    setNotifications((prev) => [newNote, ...prev]);
    // Optional: sound or toast popup can be added here
  };

  return (
    <LectureContext.Provider
      value={{
        lectures,
        addLecture,
        completeLecture,
        removeLecture,
        notifications,
      }}
    >
      {children}
    </LectureContext.Provider>
  );
};
