import { supabase } from '../utils/supabase';

/**
 * @typedef {import('../models/EdahForm').EdahFormResponse} EdahFormResponse
 */

/**
 * Valida las credenciales de acceso a un formulario EDAH.
 * Invoca una Edge Function de Supabase para verificar el testId y la credencial.
 *
 * @param {string} testId - El ID de la prueba.
 * @param {string} credential - La credencial del tutor.
 * @returns {Promise<{isValid: boolean, error?: any}>} - Un objeto indicando si las credenciales son válidas.
 */
export const validateCredentials = async (testId, credential) => {
  const { data, error } = await supabase.functions.invoke('validate-credential', {
    body: { testId, credential },
  });

  if (error) {
    console.error('Error validating credentials:', error);
    return { isValid: false, error };
  }

  return { isValid: data.isValid };
};

/**
 * Envía los datos de un formulario EDAH completado.
 * Invoca una Edge Function de Supabase para guardar los datos.
 *
 * @param {EdahFormResponse} formData - Los datos del formulario a enviar.
 * @returns {Promise<{success: boolean, data?: any, error?: any}>} - Un objeto indicando si el envío fue exitoso.
 */
export const submitEdahForm = async (formData) => {
  const { data, error } = await supabase.functions.invoke('submit-edah-form', {
    body: formData,
  });

  if (error) {
    console.error('Error submitting EDAH form:', error);
    return { success: false, error };
  }

  return { success: true, data };
};