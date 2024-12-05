import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../styles/Auth.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


  
const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
    
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      // Handle form submission
      const handleSubmit = async (e) => {
        
    
        try {
          // Make a POST request to the server for sign-in
          const response = await axios.post('/api/auth/signin', {
            email: email,
            password: password,
          });

          console.log("sign in succesfuly");
    
          // On successful login, store the JWT token (you can store it in localStorage or cookies)
          localStorage.setItem('jwt_token', response.data.token);
    
          // Optionally, store user data
          localStorage.setItem('user', JSON.stringify(response.data.user));
    
          // Redirect to the dashboard or home page
          navigate('/'); // Redirect to dashboard
        } catch (err) {
          // Handle error: invalid credentials or other issues
          setError(err.response ? err.response.data.error : err.message || 'Could not sign in');

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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          
          <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
          </button>
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

export default Login;
   