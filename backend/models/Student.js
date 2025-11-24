import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // store hashed password
  registeredAt: { type: Date, default: Date.now }
});

export default mongoose.model('Student', studentSchema);
