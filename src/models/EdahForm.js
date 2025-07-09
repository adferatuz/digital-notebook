/**
 * @typedef {object} EdahFormResponse
 * @property {number} id - ID autonumérico de la respuesta del formulario.
 * @property {object} form_data - Objeto JSON con todas las respuestas del formulario.
 * @property {'TUTOR_A' | 'TUTOR_B'} filled_by_role - Rol del tutor que llenó el formulario.
 * @property {string} filled_by_credential - Credencial específica utilizada.
 * @property {string} created_at - Timestamp de envío (ISO 8601).
 * @property {number} test_session_id - ID de la sesión de prueba a la que pertenece.
 */
