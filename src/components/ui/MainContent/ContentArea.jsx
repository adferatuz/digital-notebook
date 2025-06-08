/* import StatsCards from '../StatsCards/StatsCards';
import ChartSection from '../ChartSection/ChartSection';
import RecentActivity from '../RecentActivity/RecentActivity'; */
import './ContentArea.module.css';

const ContentArea = () => {
  return (
    <div className="content-area">
      <div className="content-container">
        {/* Tarjetas de estadísticas */}
        <section className="content-section">
            <h1>hola</h1>
          {/* <StatsCards /> */}
        </section>

        {/* Sección de gráficos y actividad reciente */}
        <div className="content-grid">
          <section className="content-section chart-section">
            <h1>hola</h1>
            {/* <ChartSection /> */}
          </section>
          
          <section className="content-section activity-section">
            <h1>hola</h1>
            {/* <RecentActivity /> */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContentArea;