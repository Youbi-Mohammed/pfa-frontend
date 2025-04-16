// Sidebar.tsx
import React, { useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  width?: number;
  defaultOpen?: boolean;
  menuItems?: {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  width = 250,
  defaultOpen = true,
  menuItems = [],
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
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isOpen ? '◄' : '►'}
      </button>

      {isOpen && (
        <div className="sidebar-content">
          <h2>Menu</h2>
          <ul className="sidebar-menu">
            {menuItems.map((item, index) => (
              <li key={index} onClick={item.onClick} className="sidebar-item">
                <button className="sidebar-button">
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
