import React, { useState } from 'react';
import { sidebarConfig } from './sidebarConfig';
import './Sidebar.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // En móvil, cerrar sidebar después de seleccionar
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button 
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay para móvil */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Mi Aplicación</h2>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {sidebarConfig.map((item) => (
              <li key={item.id} className="sidebar-menu-item">
                <button
                  className={`sidebar-link ${activeItem === item.id ? 'active' : ''}`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-text">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              <span>U</span>
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">Usuario</span>
              <span className="sidebar-user-email">user@example.com</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;