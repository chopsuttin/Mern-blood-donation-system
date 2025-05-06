import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonorAppointmentForm = () => {
  const [hospitals, setHospitals] = useState([]);
  const [formData, setFormData] = useState({
    hospitalId: '',
    date: '',
    time: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/hospitals');
        setHospitals(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch hospitals:', err);
        setMessage('Could not load hospitals.');
        setMessageType('error');
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!formData.hospitalId || !formData.date || !formData.time) {
      setMessage('Please complete all fields.');
      setMessageType('error');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/appointments', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(res.data.message || 'Appointment booked successfully!');
      setMessageType('success');
      setFormData({ hospitalId: '', date: '', time: '' });
    } catch (err) {
      console.error('Booking failed:', err);
      setMessage('Booking failed. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-2">Book a Blood Donation Appointment</h1>
        <p className="text-center text-gray-600 mb-6">Help save lives by reserving your donation slot today.</p>

        {message && (
          <div
            className={`mb-4 p-3 text-center rounded-lg text-sm font-medium ${
              messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500">Loading hospitals...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Hospital</label>
              <select
                name="hospitalId"
                value={formData.hospitalId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">— Choose a hospital —</option>
                {hospitals.map((h) => (
                  <option key={h._id} value={h._id}>
                    {h.name} ({h.location})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DonorAppointmentForm;

