import React, { useEffect, useState } from 'react';

const DonorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/appointments/donor', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt._id} className="bg-white shadow p-4 rounded-2xl">
              <p><strong>Hospital ID:</strong> {appt.hospitalId}</p>
              <p><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</p>
              <p><strong>Status:</strong> {appt.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DonorAppointments;
