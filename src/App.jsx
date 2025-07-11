import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import DigitalNotebook from './pages/DigitalNotebook';
import EdahForm from './components/forms/FormEdah/EdahForm';
import NotFound from './pages/NotFound';
import './styles/globals.css';
import Login from './auth/pages/Login/Login';
import Register from './auth/pages/Register/Register';
import ForgotPassword from './auth/pages/ForgotPassword/ForgotPassword';
import CredentialsAccess from './pages/CredentialsAcces';
import Dashboard from './pages/Dashboard/Dashboard';
import EdahResults from './pages/EdahResults/EdahResults';
import CredentialGenerator from './components/forms/CredentialGenerator/CredentialGenerator';

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/access-edah-form" element={<CredentialsAccess />} /> {/* Ruta para tutores */}
          <Route path="/edah-form" element={<EdahForm />} /> {/* Ruta para el llenado del formulario EDAH */}

          {/* Rutas del Dashboard (protegidas para administradores) */}
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Ruta anidada para EdahResults */}
            <Route path="edah-results">
              <Route index element={<EdahResults />} />
              <Route path=":testId" element={<EdahResults />} />
            </Route>
            <Route path="generate-credentials" element={<CredentialGenerator />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
  );
}

export default App;