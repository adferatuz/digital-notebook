import Header from './Header';
import ContentArea from './ContentArea';
import './MainContent.module.css';

const MainContent = () => {
  return (
    <main className="main-content">
      <Header />
      <ContentArea />
    </main>
  );
};

export default MainContent;