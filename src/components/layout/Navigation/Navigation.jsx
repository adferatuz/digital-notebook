import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ currentPath }) => {
  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/credentials-access', label: 'Acceder a la prueba' },
    { path: '/login', label: 'Login' },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.path} className={styles.navItem}>
            <Link
              to={item.path}
              className={`${styles.navLink} ${
                currentPath === item.path ? styles.active : ''
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;