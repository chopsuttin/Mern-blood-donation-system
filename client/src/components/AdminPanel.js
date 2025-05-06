import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load stats');
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Admin Panel</h2>
        {error && <p className="text-red-600">{error}</p>}
        {!stats ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-100 p-4 rounded text-center">
              <h3 className="text-xl font-semibold text-blue-800">Donors</h3>
              <p className="text-2xl font-bold">{stats.donorCount}</p>
            </div>
            <div className="bg-green-100 p-4 rounded text-center">
              <h3 className="text-xl font-semibold text-green-800">Hospitals</h3>
              <p className="text-2xl font-bold">{stats.hospitalCount}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded text-center">
              <h3 className="text-xl font-semibold text-yellow-800">Open Requests</h3>
              <p className="text-2xl font-bold">{stats.openRequests}</p>
            </div>
            <div className="bg-red-100 p-4 rounded text-center">
              <h3 className="text-xl font-semibold text-red-800">Fulfilled</h3>
              <p className="text-2xl font-bold">{stats.fulfilledRequests}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
