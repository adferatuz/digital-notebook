import Sidebar from '../../components/ui/Sidebar/Sidebar';
import MainContent from '../../components/ui/MainContent/MainContent';
import './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Dashboard;