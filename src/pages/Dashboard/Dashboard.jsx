import { useState } from 'react';
import Sidebar from '../../components/ui/Sidebar/Sidebar';
import MainContent from '../../components/ui/MainContent/MainContent';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [activeView, setActiveView] = useState(null);

  return (
    <div className={styles.dashboard}>
      <Sidebar setActiveView={setActiveView} />
      <MainContent activeView={activeView} />
    </div>
  );
};

export default Dashboard;