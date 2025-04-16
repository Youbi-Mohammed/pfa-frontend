import React from 'react';
import Sidebar from '../components/sidebar';
import './EncadrantDashboard.css';
import {
  FaHome,
  FaPlusCircle,
  FaList,
  FaUsers,
  FaCog,
  FaLightbulb
} from 'react-icons/fa';

const EncadrantDashboard = () => {
  const menuItems = [
    {
      label: 'Dashboard',
      icon: <FaHome />,
      onClick: () => console.log('Dashboard clicked'),
      iconColor: 'purple'
    },
    {
      label: 'Propose a Topic',
      icon: <FaPlusCircle />,
      onClick: () => console.log('Propose clicked'),
      iconColor: 'green'
    },
    {
      label: 'My Topics',
      icon: <FaList />,
      onClick: () => console.log('My Topics clicked'),
      iconColor: 'orange'
    },
    {
      label: 'Co-supervisors',
      icon: <FaUsers />,
      onClick: () => console.log('Co-supervisors clicked'),
      iconColor: 'teal'
    },
    {
      label: 'Settings',
      icon: <FaCog />,
      onClick: () => console.log('Settings clicked'),
      iconColor: 'pink'
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar menuItems={menuItems} />
      
      <div className="dashboard-content">
        {/* Creative background shapes */}
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
        <div className="background-shape shape-3"></div>
        
        {/* Background icon */}
        <div className="background-icon">
          <FaLightbulb />
        </div>
        
        <div className="content-wrapper fade-in">
          <h1 className="dashboard-title">Welcome, Supervisor</h1>
          <p className="dashboard-subtitle">Select an option from the sidebar to manage your topics and supervisions.</p>
        </div>
      </div>
    </div>
  );
};

export default EncadrantDashboard;