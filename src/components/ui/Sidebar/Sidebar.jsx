import { useState } from 'react';
import { sidebarConfig } from './sidebarConfig.jsx';
import styles from './Sidebar.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>{isCollapsed ? 'App' : 'Mi Aplicación'}</h2>
      </div>

      <nav className={styles.sidebarNav}>
        <ul className={styles.sidebarMenu}>
          {sidebarConfig.map((item) => (
            <li key={item.id} className={styles.sidebarMenuItem}>
              <Link
                to={item.path}
                className={styles.sidebarLink}
              >
                <span className={styles.sidebarIcon}>{item.icon}</span>
                {!isCollapsed && <span className={styles.sidebarText}>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <button className={styles.collapseButton} onClick={toggleCollapse}>
          {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;