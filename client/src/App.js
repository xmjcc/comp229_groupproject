// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Signin from './components/Signin';
import SurveyPage from './components/SurveyPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/surveys" element={<SurveyPage />} />
        {/* Add routes for profile, create-survey, etc. as needed */}
      </Routes>
    </Router>
  );
};

export default App;
