import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let valid = true;

    // temporalily remove to reduce complexcity

    // if (!validateEmail(email)) {
    //   setEmailError('Please enter a valid email address.');
    //   valid = false;
    // } else {
    //   setEmailError('');
    // }

    // if (!validatePassword(password)) {
    //   setPasswordError(
    //     'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character (!@#$%^&*).'
    //   );
    //   valid = false;
    // } else {
    //   setPasswordError('');
    // }
    if (valid) {
      console.log('Form submitted:', { email, password });
    }

    // added my benjamin wang Dec. 05
        try {
          // Make a POST request to the server for the server to create a new user
          const response = await axios.post('/api/users', {
            email: email,
            password: password,
          });

        console.log("sign up succefully and return to sign in page")    
          // Redirect to the dashboard or home page
          navigate('/signin'); // Redirect to dashboard
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
          {emailError && <p className="error-message">{emailError}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          {passwordError && <p className="error-message">{passwordError}</p>}

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
