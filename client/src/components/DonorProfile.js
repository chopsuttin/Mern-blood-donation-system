import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonorProfile = () => {
  const [donor, setDonor] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch donor data on mount
  useEffect(() => {
    const fetchDonor = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setError('No token found.');

      try {
        const res = await axios.get('http://localhost:8080/api/donors/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDonor(res.data);
        setFormData(res.data); // store separately for editing
      } catch (err) {
        console.error(err);
        setError('Failed to load profile');
      }
    };

    fetchDonor();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Save changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://localhost:8080/api/donors/${donor._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonor(formData); // update state to reflect changes
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError('Update failed.');
    }
  };

  const formatDate = (iso) => (iso ? new Date(iso).toISOString().split('T')[0] : '');

  if (error) return <p className="text-red-600 text-center mt-4">{error}</p>;
  if (!donor) return <p className="text-center text-gray-600 mt-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Donor Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Name', name: 'name', type: 'text', autoComplete: 'name' },
            { label: 'Age', name: 'age', type: 'number' },
            { label: 'Gender', name: 'gender', type: 'text' },
            { label: 'Blood Type', name: 'bloodType', type: 'text' },
            { label: 'Contact Number', name: 'contactNumber', type: 'tel', autoComplete: 'tel' },
            { label: 'Email', name: 'email', type: 'email', autoComplete: 'email' },
            { label: 'Address', name: 'address', type: 'text', autoComplete: 'street-address' },
            { label: 'Last Donation Date', name: 'lastDonationDate', type: 'date' },
          ].map(({ label, name, type, autoComplete }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                autoComplete={autoComplete}
                value={type === 'date' ? formatDate(formData[name]) : formData[name] || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg border ${
                  isEditing ? 'bg-white' : 'bg-gray-100'
                } border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
            </div>
          ))}

          <div className="flex items-center gap-3">
            <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">
              Available for Donation
            </label>
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={formData.isAvailable || false}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-5 h-5"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-semibold"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(donor); // discard changes
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorProfile;