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

/**
 * Obtiene los resultados de la evaluación EDAH para un testId específico.
 * Invoca una Edge Function de Supabase para obtener los datos.
 *
 * @param {string} testId - El ID de la prueba.
 * @returns {Promise<{data: EdahFormResponse[] | null, error?: any}>} - Un objeto con los datos del formulario o un error.
 */
export const getEdahResultsByTestId = async (testId) => {
  const { data, error } = await supabase.functions.invoke('get-edah-results', {
    body: { testId },
  });

  if (error) {
    console.error('Error fetching EDAH results:', error);
    return { data: null, error };
  }

  return { data };
};

/**
 * Obtiene un resumen de todos los formularios EDAH.
 * Invoca la Edge Function 'get-edah-summaries'.
 *
 * @returns {Promise<{data: Array<{test_id: string, student_name: string, last_evaluation_date: string, evaluators_count: number}> | null, error?: any}>} - Un objeto con los datos resumidos o un error.
 */
export const getEdahSummaries = async () => {
  const { data, error } = await supabase.functions.invoke('get-edah-summaries');

  if (error) {
    console.error('Error fetching EDAH summaries:', error);
    return { data: null, error };
  }

  return { data };
};