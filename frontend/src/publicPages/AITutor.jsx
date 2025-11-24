import React, { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaRobot,
  FaTimes,
  FaMicrophone,
  FaBook,
  FaMinus,
  FaTrash,
} from "react-icons/fa";

const AITutor = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lessonMode, setLessonMode] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // 🎙️ Setup Speech Recognition
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
  }, []);

  // 🧠 Load chat history
  useEffect(() => {
    const saved = localStorage.getItem("reacto_chat_history");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // 💾 Save last 10 messages
  useEffect(() => {
    localStorage.setItem(
      "reacto_chat_history",
      JSON.stringify(messages.slice(-10))
    );
  }, [messages]);

  // 🔊 Speak response
  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    utter.lang = "en-US";
    synth.speak(utter);
  };

  // ✉️ Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content, lessonMode }),
      });

      const data = await res.json();
      const aiMsg = {
        role: "assistant",
        content: data.reply,
        subject: data.subject,
      };

      setMessages((prev) => [...prev, aiMsg]);
      speak(data.reply);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Server error, Manyika is working on it..." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 🎙️ Toggle listening
  const toggleListening = () => {
    if (!recognitionRef.current)
      return alert("Speech recognition not supported.");
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  // 🗑️ Clear chat
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("reacto_chat_history");
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="btn btn-lg d-flex align-items-center justify-content-center"
          style={{
            position: "fixed",
            bottom: "16px",
            right: "70px",
            width: "65px",
            height: "65px",
            zIndex: 9999,
            borderRadius: "50%",
            color: "#0d0a31ff",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <FaRobot size={50} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="card border-0 shadow-lg"
          style={{
              position: "fixed",
              bottom: "90px",
              right: "20px",
              width: "380px",
              height: minimized ? "60px" : "500px",
              display: "flex",
              flexDirection: "column",
              zIndex: 9999,
              borderRadius: "15px",
              overflow: "hidden",
              animation: "bounceIn 0.6s ease",
              background:
                "linear-gradient(145deg, #ffffff 0%, #eef1f9 50%, #d9ddf0 100%)",
              transition: "height 0.3s ease",
          }}
        >
          {/* Header */}
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{
                background:
                  "linear-gradient(90deg, #0c133bff 0%, #3f2b96ff 60%, #a8c0ffff 100%)",
                color: "white",
                fontWeight: "bold",
            }}
          >
            <p className="mb-0 d-flex align-items-center text-white lead gap-2">
                <FaRobot size={30} /> Reacto AI Tutor
            </p>

            <div className="d-flex gap-2">
              {/* Minimize toggle */}
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setMinimized(!minimized)}
                title={minimized ? "Maximize Chat" : "Minimize Chat"}
              >
                <FaMinus title="Minimize chat" color="#8fff78ff" />
              </button>

              {/* Clear chat */}
              <button
                type="button"
                className="btn btn-sm"
                onClick={clearChat}
                title="Delete Chat"
              >
                <FaTrash title="Clear chat" color="red" />
              </button>

              {/* Close chat */}
              <button
                type="button"
                className="btn btn-sm btn-light"
                onClick={() => setOpen(false)}
              >
                <FaTimes title="Close chat." />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          {!minimized && (
            <>
              <div
                className="card-body overflow-auto"
                style={{
                  flex: 1,
                  backgroundColor: "#f8f9fa",
                  fontSize: "0.95rem",
                }}
              >
                {messages.length === 0 && !loading ? (
                  <div className="text-muted fst-italic text-center mt-3">
                    💬 No messages yet. Ask me anything!
                  </div>
                ) : (
                  messages.map((m, i) => (
                    <div
                      key={i}
                      className={`mb-2 ${
                        m.role === "user"
                          ? "text-end text-dark fst-italic"
                          : "text-start text-primary"
                      }`}
                    >
                      <strong className="fst-italic">{m.role === "user" ? <hr /> : ""}</strong>
                      {m.content}
                      
                      {m.subject && (
                        <div className="small text-secondary">
                          📘 Subject: {m.subject}
                        </div>
                      )}
                    </div>
                  ))
                )}
                {loading && (
                  <div className="text-muted fst-italic">AI is typing...</div>
                )}
              </div>

              {/* Input Footer */}
              <div
                  className="card-footer bg-white border-top d-flex align-items-center"
                  style={{ padding: "10px" }}
              >
                <button
                    onClick={toggleListening}
                    className={`btn me-2 ${
                      listening ? "" : ""
                    } rounded-circle`}
                    title="Speak"
                >
                  <FaMicrophone size={20} color="blue" />
                </button>
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder={listening ? "Listening..." : "Ask something..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="btn text-white border-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #16104cff 0%, #3f2b96ff 60%, #a8c0ffff 100%)",
                    }}
                    disabled={loading}
                >
                    <FaPaperPlane />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Bounce Animation Keyframes */}
      <style>
        {`
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.5) translateY(100px);
            }
            60% {
              opacity: 1;
              transform: scale(1.05) translateY(-10px);
            }
            80% {
              transform: scale(0.98) translateY(5px);
            }
            100% {
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default AITutor;
