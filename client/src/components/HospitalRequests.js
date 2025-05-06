import React, { useEffect, useState } from 'react';

const HospitalRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/blood-requests/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch requests');
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, [token]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8080/api/blood-requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setRequests((prev) => prev.map(r => r._id === id ? { ...r, status: newStatus } : r));
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  const filteredRequests =
    filter === 'all' ? requests : requests.filter(r => r.status === filter);

  const exportData = () => {
    const csv = [
      ['Blood Type', 'Urgency', 'Amount', 'Notes', 'Created At', 'Status'],
      ...requests.map(r => [
        r.bloodType,
        r.urgency,
        r.quantity,
        r.notes || '-',
        new Date(r.createdAt).toLocaleString(),
        r.status,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blood_requests.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Submitted Blood Requests</h2>
        <button
          onClick={exportData}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        {['all', 'open', 'fulfilled', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded border ${
              filter === status ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((req) => (
          <div key={req._id} className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Blood Type: {req.bloodType}</h3>
            <p className="text-gray-700"><strong>Urgency:</strong> {req.urgency}</p>
            <p className="text-gray-700"><strong>Quantity:</strong> {req.quantity} units</p>
            {req.notes && <p className="text-gray-700"><strong>Notes:</strong> {req.notes}</p>}
            <p className="text-sm mt-2 text-gray-500">Requested on: {new Date(req.createdAt).toLocaleString()}</p>
            <span
              className={`inline-block mt-3 px-3 py-1 text-sm rounded-full ${
                req.status === 'fulfilled'
                  ? 'bg-green-100 text-green-700'
                  : req.status === 'cancelled'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              Status: {req.status}
            </span>

            {req.status === 'open' && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => updateStatus(req._id, 'fulfilled')}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Fulfill
                </button>
                <button
                  onClick={() => updateStatus(req._id, 'cancelled')}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalRequests;