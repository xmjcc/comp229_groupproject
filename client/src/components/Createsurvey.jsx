import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SurveyPage.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: [''], responseType: 'multiple_choice' },
  ]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  

  // Update a question field
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Update an option within a question
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Add a new option to a question
  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  // Remove an option from a question
  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(updatedQuestions);
  };

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: [''], responseType: 'multiple_choice' },
    ]);
  };

  // Remove a question
  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit =async (e) => {
    
    e.preventDefault();

    try {

      console.log(title,description,
        questions,);
      
      await axios.post('/api/surveys', {
        title,
        description,
        questions,
        
      });
      setSuccess(true);
      setTitle('');
      setDescription('');
      setQuestions([{ questionText: '', options: [''], responseType: 'multiple_choice' }]);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Failed to create survey.');
    }
  };

  return (
    <div className="create-survey-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="form-container" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', width: '500px', background: '#f9f9f9' }}>
        <h2>Create a New Survey</h2>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        {success && <p className="success-message" style={{ color: 'green' }}>Survey created successfully!</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Survey Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter survey title"
            style={{ width: '100%', marginBottom: '10px' }}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter survey description"
            style={{ width: '100%', marginBottom: '10px' }}
          />

          <h3>Questions</h3>
          {questions.map((question, qIndex) => (
            <div key={qIndex} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
              <label>Question {qIndex + 1}</label>
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                required
                placeholder="Enter question text"
                style={{ width: '100%', marginBottom: '10px' }}
              />

              <label>Response Type</label>
              <select
                value={question.responseType}
                onChange={(e) => handleQuestionChange(qIndex, 'responseType', e.target.value)}
                style={{ width: '100%', marginBottom: '10px' }}
              >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="text">Text</option>
              </select>

              {question.responseType === 'multiple_choice' && (
                <>
                  <h4>Options</h4>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        placeholder={`Option ${oIndex + 1}`}
                        style={{ flex: 1, marginRight: '10px' }}
                      />
                      <button type="button" onClick={() => removeOption(qIndex, oIndex)} style={{ color: 'red' }}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addOption(qIndex)} style={{ marginBottom: '10px' }}>
                    Add Option
                  </button>
                </>
              )}
              <button type="button" onClick={() => removeQuestion(qIndex)} style={{ color: 'red' }}>
                Remove Question
              </button>
            </div>
          ))}

          <button type="button" onClick={addQuestion} style={{ marginBottom: '10px' }}>
            Add Question
          </button>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
            Submit Survey
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSurvey;
