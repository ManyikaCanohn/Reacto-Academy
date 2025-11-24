// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import auth from "./middleware/authMiddleware.js";
import User from "./models/User.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"], // Allow your React dev URLs
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/auth", authRoutes);

// Get all students (for dashboard) - protected
app.get("/api/students", auth, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Base route
app.get("/", (req, res) => {
  res.send("✅ MongoDB Atlas connection successful and server is running!");
});

// 🧠 AI Tutor Chat Route
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  console.log("🗣️ User prompt:", userMessage);

  const prompt = `
        You are Reacto, an AI Tutor for Reacto Academy.
        Your role is to assist learners strictly in Information and Communication Technology (ICT) topics, including:

          - Programming
          - Networking
          - Databases
          - Web development
          - Operating systems
          - Cybersecurity
          - Software engineering
          - Computer hardware
          - Mathematics
        
        ⚠️ If a user asks a question outside ICT or technology, respond with:
        "I’m sorry, I can only assist with ICT and technology-related topics."

        ✅ Always keep your answers:
        - Short and clear
        - Keep the answers relevant to the question and short
        - Accurate and up-to-date
        - Educational and student-friendly
        - Focused on ICT concepts only
        -Accept greeting and farewell messages warmly
        - Use simple language suitable for learners
        - Don't provide user name upon answering,just answer the question
        - Responde to greetings and farewells warmly


    
    ${userMessage}
  `;

    try {
      const geminiResponse = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            "x-goog-api-key": process.env.GEMINI_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const aiText =
        geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I could not generate a response.";

      console.log("🤖 AI response:", aiText);
      res.json({ reply: aiText });
    } catch (error) {
      console.error("❌ Error communicating with Gemini API:", error.message);
      res.status(500).json({
        error: "Error communicating with AI API. Please try again later.",
      });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
);
