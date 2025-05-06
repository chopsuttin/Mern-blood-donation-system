import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HospitalAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:8080/api/appointments/hospital', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to fetch appointments. Please try again.');
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Upcoming Appointments</h2>

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {appointments.length === 0 ? (
          <p className="text-gray-600">No appointments booked yet.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appt) => (
              <li key={appt._id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                <div className="flex flex-col gap-2">
                  <p><span className="font-semibold">Donor:</span> {appt.donor?.name} ({appt.donor?.bloodType})</p>
                  <p><span className="font-semibold">Email:</span> {appt.donor?.email}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(appt.date).toLocaleDateString()}</p>
                  <p><span className="font-semibold">Time:</span> {appt.time}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HospitalAppointments;