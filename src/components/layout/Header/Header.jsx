import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <h1>DIGITAL NOTEBOOK</h1>
        </Link>
        <Navigation currentPath={location.pathname} />
      </div>
    </header>
  );
};

export default Header;