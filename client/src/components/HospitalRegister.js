import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalRegister = () => {
  const navigate = useNavigate();
  const [hospitalData, setHospitalData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
  });

  const handleChange = (e) => {
    setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/hospitals/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hospitalData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // ✅ Store token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ name: hospitalData.name, role: 'hospital', email: hospitalData.email }));

      // ✅ Redirect to dashboard
      navigate('/hospital/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration error: ${error.message}`);
    }

    try {
      await fetch('http://localhost:8080/api/hospitals/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hospitalData),
      });

      alert('Hospital registered successfully!');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={hospitalData.name}
        onChange={handleChange}
        placeholder="Hospital Name"
      />
      <input
        type="email"
        name="email"
        value={hospitalData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={hospitalData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        type="text"
        name="location"
        value={hospitalData.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <button type="submit">Register Hospital</button>
    </form>
  );
};

export default HospitalRegister;
