
import { Link } from 'react-router-dom';
import '../styles/SurveyPage.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


// const surveys = [
//   { id: 1, title: 'Customer Satisfaction Survey', description: 'Help us improve by sharing your feedback.' },
//   { id: 2, title: 'Product Feedback Survey', description: 'Tell us what you think about our latest product.' },
//   { id: 3, title: 'Employee Engagement Survey', description: 'Your input matters! Share your experience.' },
// ];




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
      fetchData(); // Refresh the surveys list

      // console.log("my test");
      // setSurveys((prevSurveys) => prevSurveys.filter((survey) => survey.id !== id));
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message || 'Could not delete survey');
    }
  };



  useEffect(() => {
    fetchData();
  }, []); //
  


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
          {surveys.map((survey) => {
            console.log('Survey:', survey);  // Debugging
            return (
              <div key={survey.id} className="survey-card">
                <h3>{survey.title}</h3>
                <p>{survey.description}</p>
                <button
                  className="btn delete-btn"
                  onClick={() => deleteSurvey(survey._id)}
                 
                >
                  Delete Survey
                </button>
                <p></p> 
                <Link to={`/viewsurvey/${survey._id}`} className="btn">
                View Survey
              </Link>


              </div>
            );
          })}
        </div>
      </section>


      <footer className="footer">
        <p>© 2024 SoftDev. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SurveyPage;