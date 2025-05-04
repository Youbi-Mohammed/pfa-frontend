import React from 'react';
import Sidebar from '../../components/sidebar';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import TokenTest from '../TokenTest';
import {
  FaHome,
  FaUserShield,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaProjectDiagram,
  FaCog,
  FaChartPie,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa';

const AdminDashboard = () => {
    const navigate = useNavigate();
  
  const menuItems = [
    {
      label: 'Dashboard',
      icon: <FaHome />,
      onClick: () => console.log('Dashboard clicked'),
      iconColor: 'purple',
    },
    {
      label: 'Manage Supervisors',
      icon: <FaChalkboardTeacher />,
      onClick: () => console.log('Manage Supervisors clicked'),
      iconColor: 'green',
    },
    {
      label: 'Manage Students',
      icon: <FaUserGraduate />,
      onClick: () => console.log('Manage Students clicked'),
      iconColor: 'orange',
    },
    {
      label: 'Manage Topics',
      icon: <FaProjectDiagram />,
      onClick: () => console.log('Manage Topics clicked'),
      iconColor: 'teal',
    },
    {
      label: 'System Settings',
      icon: <FaCog />,
      onClick: () => console.log('Settings clicked'),
      iconColor: 'blue',
    },
    {
      label: 'Reports & Stats',
      icon: <FaChartPie />,
      onClick: () => navigate('/create-project'),
      iconColor: 'brown',
    },
    {
      label: 'Notifications',
      icon: <FaBell />,
      onClick: () => navigate('/test-auth'),
      iconColor: 'red',
    },
   {
           label: 'Profile',
           icon: <FaUserCircle />,
           onClick: () => navigate('/test-connection'),
           iconColor: 'darkcyan',
         },
    {
      label: 'Logout',
      icon: <FaSignOutAlt />,
      onClick: () => console.log('Logout clicked'),
      iconColor: 'black',
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar menuItems={menuItems} />

      <div className="dashboard-content">
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
        <div className="background-shape shape-3"></div>

        <div className="background-icon">
          <FaUserShield />
        </div>

        <div className="content-wrapper fade-in">
          <h1 className="dashboard-title">Welcome, Administrator</h1>
          <p className="dashboard-subtitle">Use the sidebar to manage users, topics, and system settings.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
