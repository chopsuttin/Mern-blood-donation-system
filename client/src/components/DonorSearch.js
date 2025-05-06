import React, { useState } from 'react';
import axios from 'axios';

const DonorSearch = () => {
  const [filters, setFilters] = useState({ bloodType: '', location: '' });
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setError('');
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get('http://localhost:8080/api/donors/search', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: filters
      });

      setDonors(res.data);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch donors');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Search Donors</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Blood Type:</label>
          <select
            name="bloodType"
            value={filters.bloodType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Location:</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="City, postcode..."
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {donors.map((donor) => (
          <div key={donor._id} className="bg-white p-5 rounded-xl shadow border">
            <h3 className="text-xl font-semibold">{donor.name}</h3>
            <p><strong>Blood Type:</strong> {donor.bloodType}</p>
            <p><strong>Email:</strong> {donor.email}</p>
            <p><strong>Location:</strong> {donor.location}</p>
            <p className="text-sm text-gray-600 mt-2">Available for donation ✅</p>
          </div>
        ))}
      </div>

      {donors.length === 0 && (
        <p className="text-gray-600 mt-6 text-center">No donors found.</p>
      )}
    </div>
  );
};

export default DonorSearch;
