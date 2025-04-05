// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Route for the SignUp page */}
          <Route path="/" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
