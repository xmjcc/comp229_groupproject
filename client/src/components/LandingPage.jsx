import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header Section with Logo and Navigation */}
      <header className="header">
        {/* Logo Section */}
        <div className="logo">
          <img src="/assets/Logo.png" alt="Site Logo" />
          <h1>SoftDev</h1>
        </div>

        {/* Navigation Section */}
        <nav className="nav-bar">
          <ul>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Welcome to SoftDev!</h2>
        <p>Your one-stop platform to create, share, and analyze surveys with ease.</p>
        <Link to="/surveys" className="btn">Explore Surveys</Link>

      </section>

      {/* Features Section */}
      <section className="features">
        <h3>What We Offer</h3>
        <div className="features-list">
          <div className="feature">
          <Link to="/createsurvey" className="btn"><h4>Create Surveys</h4></Link>


            
            <p>Design surveys tailored to your needs in minutes.</p>
          </div>
          <div className="feature">
            <h4>Share Surveys</h4>
            <p>Easily distribute your surveys and collect responses.</p>
          </div>
          <div className="feature">
            <h4>Analyze Results</h4>
            <p>Get detailed insights and analytics from your survey responses.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 SoftDev. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
