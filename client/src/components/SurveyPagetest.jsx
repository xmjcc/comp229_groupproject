import { Link } from 'react-router-dom';
import '../styles/SurveyPage.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const SurveyPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/surveys');
      setSurveys(res.data); // Assuming response data contains surveys array
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message || 'Could not fetch surveys');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSurvey = async (id) => {
    try {
      await axios.delete(`/api/surveys/${id}`);
      setSurveys((prevSurveys) => prevSurveys.filter((survey) => survey.id !== id));
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message || 'Could not delete survey');
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
        <p>Choose a survey to participate in or manage surveys.</p>
        <div className="survey-list">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            surveys.map((survey) => (
              <div key={survey.id} className="survey-card">
                <h3>{survey.title}</h3>
                <p>{survey.description}</p>
                <div className="survey-actions">
                  <Link to={`/surveys/${survey.id}`} className="btn">
                    View Survey
                  </Link>
                  <button
                    className="btn delete-btn"
                    onClick={() => deleteSurvey(survey.id)}
                  >
                    Delete Survey
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 SoftDev. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SurveyPage;
