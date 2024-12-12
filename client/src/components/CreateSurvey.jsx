// client/src/components/CreateSurvey.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', responseType: 'text', options: [] }]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('jwt_token');

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', responseType: 'text', options: [] }]);
  };

  const handleQuestionChange = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/surveys', { title, description, questions }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/surveys');
    } catch (err) {
      setError(err.response?.data?.error || 'Could not create survey');
    }
  };

  return (
    <div style={{padding:'20px'}}>
      <h2>Create a New Survey</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required /><br/>

        <label>Description</label>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} /><br/>

        <h3>Questions</h3>
        {questions.map((q, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Question text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
              required
            />
            <select value={q.responseType} onChange={(e)=>handleQuestionChange(index, 'responseType', e.target.value)}>
              <option value="text">Text</option>
              <option value="multiple_choice">Multiple Choice</option>
            </select>
            {/* Add UI for options if multiple_choice */}
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>Add Question</button><br/><br/>

        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
};

export default CreateSurvey;
