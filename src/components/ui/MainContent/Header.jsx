import React, { useState } from 'react';
import { headerConfig } from './headerConfig';
import './Header.module.css';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Título de la página actual */}
        <div className="header-title">
          <h1>Dashboard</h1>
          <span className="header-breadcrumb">Inicio / Dashboard</span>
        </div>

        {/* Barra de búsqueda */}
        <div className="header-search">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar..."
              className="search-input"
            />
            <button className="search-button">
              🔍
            </button>
          </div>
        </div>

        {/* Acciones del header */}
        <div className="header-actions">
          {/* Notificaciones */}
          <div className="header-action-item">
            <button
              className="header-action-button"
              onClick={toggleNotifications}
            >
              <span className="action-icon">🔔</span>
              <span className="notification-badge">3</span>
            </button>
            
            {showNotifications && (
              <div className="dropdown-menu notifications-menu">
                <div className="dropdown-header">
                  <h4>Notificaciones</h4>
                </div>
                <div className="dropdown-content">
                  {headerConfig.notifications.map((notification) => (
                    <div key={notification.id} className="notification-item">
                      <div className="notification-content">
                        <span className="notification-title">{notification.title}</span>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <button className="btn-link">Ver todas</button>
                </div>
              </div>
            )}
          </div>

          {/* Menú de usuario */}
          <div className="header-action-item">
            <button
              className="header-user-button"
              onClick={toggleUserMenu}
            >
              <div className="user-avatar">
                <span>U</span>
              </div>
              <span className="user-name">Usuario</span>
              <span className="dropdown-arrow">▼</span>
            </button>

            {showUserMenu && (
              <div className="dropdown-menu user-menu">
                <div className="dropdown-content">
                  {headerConfig.userMenu.map((item) => (
                    <button
                      key={item.id}
                      className="dropdown-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        // Aquí puedes agregar la lógica para cada acción
                        console.log(`Clicked: ${item.label}`);
                      }}
                    >
                      <span className="dropdown-icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;