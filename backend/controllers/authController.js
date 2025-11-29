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
        message: "Registration successful!",
        user,
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
