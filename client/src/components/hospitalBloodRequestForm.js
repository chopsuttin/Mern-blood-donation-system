import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BloodRequestForm = () => {
  const [formData, setFormData] = useState({
    bloodType: '',
    quantity: '',
    urgency: 'normal',
    notes: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8080/api/blood-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit request');

      alert('✅ Blood request submitted successfully!');
      navigate('/hospital/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Submit Blood Request</h2>
        
        {error && (
          <p className="bg-red-100 text-red-800 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Blood Type</label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Quantity (units)</label>
            <input
              type="number"
              name="quantity"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Urgency</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="e.g. needed urgently for surgery..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default BloodRequestForm;
