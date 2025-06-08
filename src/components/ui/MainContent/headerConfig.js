export const headerConfig = {
  notifications: [
    {
      id: 1,
      title: 'Nueva venta registrada',
      time: 'hace 5 min',
      type: 'success'
    },
    {
      id: 2,
      title: 'Usuario registrado',
      time: 'hace 15 min',
      type: 'info'
    },
    {
      id: 3,
      title: 'Stock bajo en productos',
      time: 'hace 1 hora',
      type: 'warning'
    }
  ],
  userMenu: [
    {
      id: 'profile',
      label: 'Mi Perfil',
      icon: '👤',
      action: 'profile'
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: '⚙️',
      action: 'settings'
    },
    {
      id: 'help',
      label: 'Ayuda',
      icon: '❓',
      action: 'help'
    },
    {
      id: 'logout',
      label: 'Cerrar Sesión',
      icon: '🚪',
      action: 'logout'
    }
  ]
};