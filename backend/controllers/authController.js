// controllers/authController.js
import User from "../models/User.js";

// @desc Register new user
// @route POST /api/register
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ fullName, email, password });
    res.status(201).json({
        message: "Registration successful! Await admin approval.",
        user,
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get all pending users (Admin use)
// @route GET /api/users/pending
export const getPendingUsers = async (req, res) => {
    try {
        const pending = await User.find({ status: "pending" });
        res.json(pending);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Approve user (Admin use)
// @route PUT /api/users/approve/:id
export const approveUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
            id,
            { status: "approved" },
            { new: true }
        );
        res.json({ message: "User approved successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
