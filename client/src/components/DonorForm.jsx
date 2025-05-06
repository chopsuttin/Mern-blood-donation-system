import { useState } from "react";
import axios from "axios";

export default function DonorForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bloodType: "",
    location: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/donors/register", formData);
      alert("✅ Donor registered successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error registering donor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Donor Registration</h2>
      <input name="name" onChange={handleChange} placeholder="Full Name" required />
      <input name="email" onChange={handleChange} placeholder="Email" type="email" required />
      <input name="password" onChange={handleChange} placeholder="Password" type="password" required />
      <input name="bloodType" onChange={handleChange} placeholder="Blood Type (e.g. O+)" required />
      <input name="location" onChange={handleChange} placeholder="Location" required />
      <button type="submit">Register</button>
    </form>
  );
}