import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  bloodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ["pending", "fulfilled"], default: "pending" },
  location: { type: String },
  requestedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("BloodRequest", requestSchema);