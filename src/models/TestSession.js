/**
 * @typedef {object} TestSession
 * @property {number} id - ID autonumérico de la sesión de prueba.
 * @property {string} test_id - ID legible y único para la URL (ej: "prueba-a1b2c3").
 * @property {string} patient_name - Nombre del paciente para identificar la prueba.
 * @property {string} credential_tutor_a - Credencial para el Tutor A.
 * @property {string} credential_tutor_b - Credencial para el Tutor B.
 * @property {string} created_at - Timestamp de creación (ISO 8601).
 * @property {string} expires_at - Timestamp de expiración (ISO 8601).
 * @property {string} user_id - UUID de la psicóloga que creó la prueba.
 * @property {EdahFormResponse[]} [form_responses] - (Opcional) Array con los dos formularios llenos.
 */
