export const APP_NAME = 'Mi Aplicación';

export const ROUTES = {
  HOME: '/',
  DIGITAL_NOTEBOOK: '/cuaderno-digital'
};

export const FORM_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es requerido',
  INVALID_EMAIL: 'El email no es válido',
  INVALID_DATE: 'La fecha no es válida',
  MIN_LENGTH: (min) => `Debe tener al menos ${min} caracteres`,
  MAX_LENGTH: (max) => `No puede tener más de ${max} caracteres`,
  SUBMIT_SUCCESS: 'Formulario enviado correctamente',
  SUBMIT_ERROR: 'Error al enviar el formulario'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};