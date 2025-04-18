// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Student from './dashboards/Student';
import EncadrantDashboard from './pages/EncadrantDashboard';
import SaisirProject from './pages/SaisirProject';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Route for the SignUp page */}
          <Route path="/login" element={<SignUp />} />
          <Route path="/student" element={<Student />} />
          <Route path="/encadrant" element={<EncadrantDashboard />} />
          <Route path="/project" element={<SaisirProject />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
