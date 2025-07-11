import Sidebar from '../../components/ui/Sidebar/Sidebar';
import MainContent from '../../components/ui/MainContent/MainContent';
import styles from './Dashboard.module.css';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
};

export default Dashboard;