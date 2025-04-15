import React from 'react';
import Sidebar from '../components/sidebar';
import './Student.css';

const Student: React.FC = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to Our App</h1>
        <p>Main content goes here</p>
      </div>
    </div>
  );
};

export default Student;