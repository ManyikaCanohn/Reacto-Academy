import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const WikiNotes = () => {
    const { language } = useParams();
    const [notes, setNotes] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setError("");
        setNotes(null);

        // Fetch from Wikipedia
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${language}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.extract) {
            setNotes(data);
            } else {
            setError("No content found for this topic.");
            }
        })
        .catch(() => setError("Failed to fetch data. Please check your internet connection."))
        .finally(() => setLoading(false));
    }, [language]);

  return (
    <div
        className="container p-3 mt-5"
        style={{ maxHeight: "100vh", backgroundColor: "#06053d", color: "#fff" }}>
        {/* Back Button */}
        <Link
            to="/#courses"
            className="btn mb-4"
            style={{
            border: "2px solid #39FF14",
            color: "#39FF14",
            background: "transparent",
            }}
            onMouseEnter={(e) => {
            e.target.style.background = "#39FF14";
            e.target.style.color = "#06053d";
            }}
            onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#39FF14";
            }}
        >
            ← Back to Courses
        </Link>

      {/* Content */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-success" role="status"></div>
          <p className="mt-3">Fetching {language} notes...</p>
        </div>
      ) : error ? (
        <div className="text-center text-danger mt-5">{error}</div>
      ) : (
        notes && (
          <div className="text-center">
            {notes.thumbnail && (
              <img
                    src={notes.thumbnail.source}
                    alt={notes.title}
                    className="mb-3 rounded shadow-sm"
                    style={{ maxWidth: "200px" }}
              />
            )}
            <p
              className="display-5 mb-3"
              style={{ color: "#39FF14", textTransform: "capitalize" }}>
              <strong> {notes.title} </strong>
            </p>
            <p className="lead text-light mx-auto" style={{ maxWidth: "800px" }}>
              {notes.extract}
            </p>
            {notes.content_urls?.desktop?.page && (
              <a
                href={notes.content_urls.desktop.page}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-4 fw-semibold lead"
                style={{
                  border: "2px solid #39FF14",
                  color: "#39FF14",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#39FF14";
                  e.target.style.color = "#06053d";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#39FF14";
                }}>

                Read Full Article ↗
              </a>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default WikiNotes;
