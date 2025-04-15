import React, { useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  width?: number;
  defaultOpen?: boolean;
  // Add more props as needed
}

const Sidebar: React.FC<SidebarProps> = ({ 
  width = 250, 
  defaultOpen = true 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarStyle = {
    width: isOpen ? `${width}px` : '50px',
  };

  return (
    <div className="sidebar" style={sidebarStyle}>
      <button 
        className="sidebar-toggle" 
        onClick={toggleSidebar}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? '◄' : '►'}
      </button>
      
      {isOpen && (
        <div className="sidebar-content">
          <h2>Menu</h2>
          <ul className="sidebar-menu">
            <li>Dashboard</li>
            <li>Profile</li>
            <li>Settings</li>
            <li>Messages</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;