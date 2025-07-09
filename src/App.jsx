import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import DigitalNotebook from './pages/DigitalNotebook';
import NotFound from './pages/NotFound';
import './styles/globals.css';
import Login from './auth/pages/Login/Login';
import Register from './auth/pages/Register/Register';
import ForgotPassword from './auth/pages/ForgotPassword/ForgotPassword';
import CredentialsAccess from './pages/CredentialsAcces';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acceso-prueba" element={<DigitalNotebook />} />
          <Route path="/credentials-access" element={<CredentialsAccess />} />
          {/* Rutas específicas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
  );
}

export default App;