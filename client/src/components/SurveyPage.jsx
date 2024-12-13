import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SurveyPage = () => {
    const [surveys, setSurveys] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
      try {
          const res = await axios.get('/api/surveys');
          console.log(res.data);  // Check what data is received
          setSurveys(res.data);
      } catch (err) {
          console.error('Error fetching surveys:', err);
          setError(err.response ? err.response.data.error : 'Could not fetch surveys');
      }
  };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/surveys/${id}`);
            fetchData(); // Refresh the list after deleting
        } catch (err) {
            setError('Failed to delete the survey');
        }
    };

    const handleEdit = (id) => {
        navigate(`/surveys/edit/${id}`); // Assuming you have a route set up for editing
    };

    return (
      <div className="survey-page">
          <h2>Explore Surveys</h2>
          {surveys.length ? (
              <div className="survey-list">
                  {surveys.map((survey) => (
                      <div key={survey._id} className="survey-card">
                          <h3>{survey.title}</h3>
                          <p>{survey.description}</p>
                          <Link to={`/surveys/${survey._id}`} className="btn">Take Survey</Link>
                      </div>
                  ))}
              </div>
          ) : (
              <p>No surveys found or error in fetching surveys.</p>  // Ensure this line is not always true
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  );
};

export default SurveyPage;
