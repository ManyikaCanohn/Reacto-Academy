import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const AdminLearningNotes = () => {
  const [lessons, setLessons] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "", content: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch lessons
  useEffect(() => {
    const fetchLessons = async () => {
      const res = await axios.get("/api/lessons");
      setLessons(res.data);
    };
    fetchLessons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`/api/lessons/${editingId}`, form);
    } else {
      await axios.post("/api/lessons", form);
    }
    setForm({ title: "", slug: "", content: "" });
    setEditingId(null);
    const updated = await axios.get("/api/lessons");
    setLessons(updated.data);
  };

  const handleEdit = (lesson) => {
    setForm(lesson);
    setEditingId(lesson._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this lesson note?")) {
      await axios.delete(`/api/lessons/${id}`);
      setLessons(lessons.filter((l) => l._id !== id));
    }
  };

  return (
    <div className="p-4 bg-white rounded-3 shadow-sm mt-4">
      <h2 className="mb-3" style={{ color: "#06053d" }}>
        Manage Learning Notes
      </h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Slug (e.g., html-intro)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="5"
            placeholder="Lesson content..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          <FaPlus /> {editingId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <table className="table table-striped">
        <thead style={{ backgroundColor: "#06053d", color: "#39FF14" }}>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson._id}>
              <td>{lesson.title}</td>
              <td>{lesson.slug}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(lesson)}>
                  <FaEdit />
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(lesson._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLearningNotes;
