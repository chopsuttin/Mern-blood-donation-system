import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* Hero Banner */}
      <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#dc3545', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>LifeLine</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Bridging the gap between blood donors and hospitals — every drop counts.
        </p>
      </div>

      {/* Role Choice Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        padding: '40px 20px',
        flexWrap: 'wrap',
      }}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          width: '300px',
          boxShadow: '0 0 20px rgba(0,0,0,0.05)',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>I am a Donor</h3>
          <p style={{ fontSize: '0.95rem', marginBottom: '20px' }}>
            Join our network and help hospitals with critical blood supplies.
          </p>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            Donor Login
          </button>
          <br />
          <button
            onClick={() => navigate('/donor/register')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Donor Register
          </button>
        </div>

        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          width: '300px',
          boxShadow: '0 0 20px rgba(0,0,0,0.05)',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>I am a Hospital</h3>
          <p style={{ fontSize: '0.95rem', marginBottom: '20px' }}>
            Request blood, manage appointments, and match with nearby donors.
          </p>
          <button
            onClick={() => navigate('/hospital/login')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            Hospital Login
          </button>
          <br />
          <button
            onClick={() => navigate('/hospital/register')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Hospital Register
          </button>
        </div>
      </div>

      {/* Feature Highlights */}
      <div style={{
        padding: '40px 20px',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        flexWrap: 'wrap',
        textAlign: 'center',
      }}>
        {[
          { title: "Fast & Easy", desc: "Book and manage blood appointments in just a few clicks." },
          { title: "Safe & Secure", desc: "All data is protected and interactions are authenticated." },
          { title: "Life Saving", desc: "Every request and donation helps save real lives." }
        ].map((feature, idx) => (
          <div key={idx} style={{
            width: '250px',
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: '#f1f3f5',
            boxShadow: '0 0 10px rgba(0,0,0,0.03)'
          }}>
            <h4 style={{ marginBottom: '10px', color: '#343a40' }}>{feature.title}</h4>
            <p style={{ fontSize: '0.95rem', color: '#6c757d' }}>{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap',
        textAlign: 'center',
      }}>
        {[
          { label: "Donors Helped", value: 1200 },
          { label: "Hospitals Supported", value: 45 },
          { label: "Blood Units Donated", value: 3600 }
        ].map((stat, idx) => (
          <div key={idx}>
            <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>{stat.value.toLocaleString()}</h3>
            <p style={{ fontSize: '1rem' }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
