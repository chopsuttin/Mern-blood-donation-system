import React, { useEffect, useState } from 'react';

const DonorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/blood-requests');
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to fetch requests');

        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Blood Requests</h2>

      {loading && <p>Loading requests...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map((req) => (
          <div key={req._id} className="border rounded-xl p-4 shadow-sm bg-white">
            <h3 className="text-lg font-semibold mb-2">Blood Type: {req.bloodType}</h3>
            <p><strong>Urgency:</strong> {req.urgency}</p>
            <p><strong>Amount:</strong> {req.amount} units</p>
            {req.notes && <p><strong>Notes:</strong> {req.notes}</p>}
            <p className="text-sm text-gray-500 mt-2">Hospital: {req.hospital?.name} ({req.hospital?.location})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorRequests;
