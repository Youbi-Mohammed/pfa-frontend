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
    width: isOpen ? `${width}px` : '60px', // petite largeur pliée
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`} style={sidebarStyle}>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isOpen ? '◄' : '►'}
      </button>

      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index} onClick={item.onClick} className="sidebar-item">
            <button className="sidebar-button">
              <span className="icon">{item.icon}</span>
              {isOpen && <span className="label">{item.label}</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
