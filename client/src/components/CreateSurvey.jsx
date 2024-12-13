import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', responseType: 'text', options: [] }]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', responseType: 'text', options: [] }]);
  };

  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt_token');
      await axios.post('/api/surveys', { title, description, questions }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/surveys'); // Redirect to survey list after creation
    } catch (err) {
      console.error('Error creating survey:', err.message);
    }
  };

  return (
    <div>
      <h2>Create a New Survey</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <div>
          {questions.map((question, index) => (
            <div key={index}>
              <input type="text" value={question.questionText} onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)} required />
              <select value={question.responseType} onChange={(e) => handleQuestionChange(index, 'responseType', e.target.value)}>
                <option value="text">Text</option>
                <option value="multiple_choice">Multiple Choice</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion}>Add Question</button>
        </div>
        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
};

export default CreateSurvey;
