import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Signin from './components/Signin';
import SurveyPage from './components/SurveyPage';
import Createsurvey from './components/Createsurvey';
import Viewsurvey from './components/Viewsurvey';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/surveys" element={<SurveyPage />} />
        <Route path="/createsurvey" element={<Createsurvey/>} />
        <Route path="/viewsurvey/:id" element={<Viewsurvey/>} />


        {/* <Route path="/takesurvey" element={<takesurvey/>} /> */}


      </Routes>
    </Router>
  );
};

export default App;
