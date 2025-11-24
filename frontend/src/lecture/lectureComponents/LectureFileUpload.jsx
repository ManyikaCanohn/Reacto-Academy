import React, { useState, useContext } from "react";
import axios from "axios";
import { LectureContext } from "../context/LectureContext";

const LectureFileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState([]);
  const [message, setMessage] = useState("");
  const { notify } = useContext(LectureContext);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      setUploaded((prev) => [res.data.file, ...prev]);
      notify(`New file uploaded: ${res.data.file.originalName}`);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", textAlign: "center", padding: 20 }}>
      <p className="lead display-6">📁 Upload a File</p>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <br /><br />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
      <h3>Uploaded Files</h3>
      <ul style={{ textAlign: "left" }}>
        {uploaded.map((file, i) => (
          <li key={i}>
            <a href={`http://localhost:5000/${file.filePath}`} target="_blank" rel="noreferrer">
              {file.originalName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LectureFileUpload;
