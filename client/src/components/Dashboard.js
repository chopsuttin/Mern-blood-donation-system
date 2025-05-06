import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/donors/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));

        const apptRes = await axios.get("http://localhost:8080/api/appointments/donor", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(apptRes.data);
      } catch (error) {
        console.error(error);
        localStorage.clear();
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#343a40",
        color: "white",
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <div>
          <h2 style={{ marginBottom: "2rem" }}>Donor Menu</h2>
          <button style={navButton} onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button style={navButton} onClick={() => navigate("/donor/profile")}>My Profile</button>
          <button style={navButton} onClick={() => navigate("/donor/book")}>Book Appointment</button>
          <button style={navButton} onClick={() => navigate("/donor/appointments")}>My Appointments</button>
        </div>
        <button style={{ ...navButton, background: "#dc3545" }} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Dashboard */}
      <div style={{ flex: 1, padding: "2rem", background: "#f8f9fa" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Welcome, {user.name}</h1>

        {/* Stats Section */}
        <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <StatCard title="Total Appointments" value={appointments.length} />
          <StatCard
            title="Upcoming"
            value={appointments.filter(a => new Date(a.date) > new Date()).length}
          />
        </div>

        {/* Quick Actions */}
        <h2 style={{ marginBottom: "1rem" }}>Quick Actions</h2>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <button style={actionButton} onClick={() => navigate("/donor/book")}>
            Book Appointment
          </button>
          <button style={actionButton} onClick={() => navigate("/donor/appointments")}>
            My Appointments
          </button>
          <button style={actionButton} onClick={() => navigate("/donor/profile")}>
            View / Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({ title, value }) => (
  <div style={{
    flex: "1 1 200px",
    background: "white",
    padding: "1.5rem",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)"
  }}>
    <h3>{title}</h3>
    <p style={{ fontSize: "2rem", color: "#007bff" }}>{value}</p>
  </div>
);

// Sidebar button style
const navButton = {
  display: "block",
  background: "#495057",
  color: "white",
  padding: "10px 15px",
  margin: "10px 0",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  width: "100%",
  textAlign: "left"
};

// Action button style
const actionButton = {
  padding: "1rem 2rem",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "1rem",
  cursor: "pointer",
  flex: "1 1 200px"
};

export default Dashboard;