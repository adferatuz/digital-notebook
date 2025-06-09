import Sidebar from '../../components/ui/Sidebar/Sidebar';
import MainContent from '../../components/ui/MainContent/MainContent';
import './Dashboard.module.css';
import EdahForm from '../../components/forms/FormEdah/EdahForm';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <Sidebar />
      <MainContent /> */}
      <EdahForm />
    </div>
  );
};

export default Dashboard;