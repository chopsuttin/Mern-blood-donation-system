import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with:', formData); // ✅ Debug log

    try {
      const res = await axios.post('http://localhost:8080/api/donors/login', formData);

      // ✅ Save token and user
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

        // ✅ Dynamic role-based redirect
        const role = res.data.user.role;
        if (role === 'hospital') {
          navigate('/hospital/dashboard');
        } else {
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Login failed:', err.response?.data || err.message);
        alert('❌ Login failed: ' + (err.response?.data?.message || 'Unknown error'));
      }
    };

  return (
    <form onSubmit={handleSubmit} autoComplete="on">
      <h2>Login</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        autoComplete="email"
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        autoComplete="current-password"
        required
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
