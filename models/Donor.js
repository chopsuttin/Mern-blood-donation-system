import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    bloodType: String,
    contactNumber: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    address: String,
    lastDonationDate: Date,
    isAvailable: Boolean
  }, { timestamps: true });

export default mongoose.model("Donor", donorSchema);
