import styles from './MainContent.module.css';
import { Outlet } from 'react-router-dom';

const MainContent = () => {
  return (
    <main className={styles.mainContent}>
      <Outlet />
    </main>
  );
};

export default MainContent;