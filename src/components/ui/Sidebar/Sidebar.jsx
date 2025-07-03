import { useState } from 'react';
import { sidebarConfig } from './sidebarConfig.jsx';
import styles from './Sidebar.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Sidebar = ({ setActiveView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleItemClick = (view) => {
    setActiveView(view);
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
              <button
                className={styles.sidebarLink}
                onClick={() => handleItemClick(item.id)}
              >
                <span className={styles.sidebarIcon}>{item.icon}</span>
                {!isCollapsed && <span className={styles.sidebarText}>{item.label}</span>}
              </button>
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