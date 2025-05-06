import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  location: String,
  role: { type: String, default: 'hospital' }
});

export default mongoose.model("Hospital", hospitalSchema);