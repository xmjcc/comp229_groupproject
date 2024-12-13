import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../styles/SurveyPage.css';  // Import the same CSS file for consistent styling

const ViewSurvey = () => {
  const [survey, setSurvey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();  // Get the survey id from the URL

  // Fetch survey data
  const fetchSurvey = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/surveys/${id}`);
      setSurvey(res.data);  // Assuming the response contains the survey details
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message || 'Could not fetch survey');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSurvey();
  }, [id]);  // Fetch survey whenever the ID changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!survey) {
    return <div>Survey not found.</div>;
  }

  return (
    <div className="view-survey">
      <header className="survey-header">
        <Link to="/" className="logo">
          <img src="/assets/Logo.png" alt="Site Logo" />
          <h1>SoftDev</h1>
        </Link>
      </header>

      <body1>

      <section className="survey-details-container">
        <h2>{survey.title}</h2>
        <p>{survey.description}</p>

    

        <div className="survey-questions">
          <h3>Questions</h3>
          {survey.questions.map((question, index) => (

         
           <div key={index} className="question">
              <p>{question.questionText}</p>
              {question.responseType === 'multiple_choice' && (
                <ul>
                  {question.options.map((option, idx) => (
                    <li key={idx}>{option}</li>
                  ))}
                </ul>
              )}
              {question.responseType === 'text' && <p>Open-ended response</p>}

             
            </div>
           

          ))}
        </div>


      </section>
      </body1>

      
      <footer className="footer">
        <p>? 2024 SoftDev. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewSurvey;
