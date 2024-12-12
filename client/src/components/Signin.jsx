// client/src/components/Signin.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import axios from 'axios';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signin', { email, password });
      localStorage.setItem('jwt_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/'); // Go back to home
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Could not sign in');
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
          <button type="submit" className="btn">Sign In</button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </section>

      <footer className="footer">
        <p>© 2024 SoftDev. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signin;
