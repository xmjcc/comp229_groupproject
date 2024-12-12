// client/src/components/SurveyPage.jsx
import { Link } from 'react-router-dom';
import '../styles/SurveyPage.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const SurveyPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/surveys');
      setSurveys(res.data);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Could not fetch surveys');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="survey-page">
      <header className="survey-header">
        <Link to="/" className="logo">
          <img src="/assets/Logo.png" alt="Site Logo" />
          <h1>SoftDev</h1>
        </Link>
      </header>

      <section className="survey-list-container">
        <h2>Explore Surveys</h2>
        <p>Choose a survey to participate in or view the results.</p>
        <div className="survey-list">
          {surveys.map((survey) => (
            <div key={survey._id} className="survey-card">
              <h3>{survey.title}</h3>
              <p>{survey.description}</p>
              <Link to={`/surveys/${survey._id}`} className="btn">Take Survey</Link>
            </div>
          ))}
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}
      </section>

      <footer className="footer">
        <p>© 2024 SoftDev. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SurveyPage;
