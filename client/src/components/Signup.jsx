// client/src/components/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', { email, password });
      navigate('/signin');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Could not sign up');
    }
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="logo">
          <img src="/assets/Logo.png" alt="Site Logo" />
          <h1>SoftDev</h1>
        </Link>
      </header>

      <section className="auth-form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn">Sign Up</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </section>

      <footer className="footer">
        <p>© 2024 SoftDev. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;
