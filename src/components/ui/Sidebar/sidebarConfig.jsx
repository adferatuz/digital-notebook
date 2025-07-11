import { FaKey, FaChartBar } from 'react-icons/fa';

export const sidebarConfig = [
  {
    id: 'credential-generator',
    label: 'Generar Credenciales',
    icon: <FaKey />,
    path: '/dashboard/generate-credentials'
  },
  {
    id: 'edah-results',
    label: 'Resultados EDAH',
    icon: <FaChartBar />,
    path: '/dashboard/edah-results'
  },
];