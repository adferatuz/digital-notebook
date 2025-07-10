import { useState, useCallback } from 'react';
import { validateCredentials, submitEdahForm } from '../services/edahFormService';

/**
 * @typedef {import('../models/EdahForm').EdahFormResponse} EdahFormResponse
 */

/**
 * Hook de React para gestionar la lógica del formulario EDAH.
 * Maneja la validación de credenciales y el envío del formulario,
 * encapsulando los estados de carga y error.
 *
 * @returns {{
 *   isLoading: boolean,
 *   error: Error | null,
 *   validate: (testId: string, credential: string) => Promise<{isValid: boolean, error?: any}>,
 *   submit: (formData: EdahFormResponse) => Promise<{success: boolean, data?: any, error?: any}>
 * }}
 */
export const useEdahForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleValidateCredentials = useCallback(async (testId, credential) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await validateCredentials(testId, credential);
      if (!result.isValid) {
        setError(new Error('Credenciales no válidas o expiradas.'));
      }
      return result;
    } catch (err) {
      console.error("Error during credential validation in hook:", err);
      setError(err);
      return { isValid: false, error: err };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmitForm = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await submitEdahForm(formData);
      if (!result.success) {
        setError(new Error('Error al enviar el formulario.'));
      }
      return result;
    } catch (err) {
      console.error("Error during form submission in hook:", err);
      setError(err);
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    validate: handleValidateCredentials,
    submit: handleSubmitForm,
  };
};
