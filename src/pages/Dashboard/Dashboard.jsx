import { useState } from 'react';
import Sidebar from '../../components/ui/Sidebar/Sidebar';
import MainContent from '../../components/ui/MainContent/MainContent';
import styles from './Dashboard.module.css';
import { useTestSessions } from '../../hooks/useTestSessions';

const Dashboard = () => {
  const [activeView, setActiveView] = useState(null);
  const { testSessions, isLoading, error, addTestSession } = useTestSessions();

  return (
    <div className={styles.dashboard}>
      <Sidebar setActiveView={setActiveView} />
      <MainContent 
        activeView={activeView}
        testSessions={testSessions}
        isLoading={isLoading}
        error={error}
        addTestSession={addTestSession}
      />
    </div>
  );
};

export default Dashboard;