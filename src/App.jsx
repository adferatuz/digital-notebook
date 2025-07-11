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
          <Route path="/edah-form" element={<EdahForm />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="credentials-access" element={<CredentialsAccess />} />
            <Route path="edah-results" element={<EdahResults />} />
            <Route path="generate-credentials" element={<CredentialGenerator />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
  );
}

export default App;