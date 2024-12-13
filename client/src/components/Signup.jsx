import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', { email, password });
      navigate('/signin'); // Redirect to sign-in page after sign-up
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Could not sign up');
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p>{error}</p>}
        <button type="submit">Sign Up</button>
        <Link to="/signin">Already have an account? Sign In</Link>
      </form>
    </div>
  );
};

export default Signup;
