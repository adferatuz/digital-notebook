import { useState, useCallback } from 'react';
import { validateCredentials, submitEdahForm } from '../services/edahFormService';
import { edahQuestions, scaleLabels, scaleTypes } from '../components/forms/FormEdah/EdahForm.logic';

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
 *   submit: (formData: EdahFormResponse) => Promise<{success: boolean, data?: any, error?: any}>,
 *   responses: object,
 *   studentInfo: object,
 *   updateResponse: (questionId: string, value: string) => void,
 *   updateStudentInfo: (field: string, value: string) => void,
 *   calculateScores: () => object,
 *   getInterpretation: (scores: object) => object,
 *   isFormComplete: () => boolean,
 *   resetForm: () => void,
 *   generateReport: () => object,
 *   edahQuestions: object,
 *   scaleLabels: object,
 *   scaleTypes: object
 * }}
 */
export const useEdahForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [responses, setResponses] = useState({});
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    age: '',
    grade: '',
    evaluator: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Actualizar respuesta de una pregunta específica
  const updateResponse = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }));
  };

  // Actualizar información del estudiante
  const updateStudentInfo = (field, value) => {
    setStudentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calcular puntuaciones por subescala
  const calculateScores = () => {
    const scores = {
      H: 0,
      DA: 0,
      TC: 0,
      total: 0
    };

    Object.entries(edahQuestions).forEach(([id, question]) => {
      const response = responses[id] || 0;
      scores[question.escala] += response;
      scores.total += response;
    });

    // Calcular H+DA
    scores['H+DA'] = scores.H + scores.DA;

    return scores;
  };

  // Obtener interpretación básica de los resultados
  const getInterpretation = (scores) => {
    const interpretation = {};
    
    // Rangos aproximados (estos deberían ajustarse según normas específicas)
    const ranges = {
      H: { low: 0, medium: 6, high: 12 },
      DA: { low: 0, medium: 6, high: 12 },
      TC: { low: 0, medium: 12, high: 24 },
      'H+DA': { low: 0, medium: 12, high: 24 }
    };

    Object.entries(ranges).forEach(([scale, range]) => {
      const score = scores[scale];
      if (score <= range.low) {
        interpretation[scale] = 'Bajo';
      } else if (score <= range.medium) {
        interpretation[scale] = 'Medio';
      } else {
        interpretation[scale] = 'Alto';
      }
    });

    return interpretation;
  };

  // Validar si el formulario está completo
  const isFormComplete = () => {
    const allQuestionsAnswered = Object.keys(edahQuestions).every(
      id => responses[id] !== undefined
    );
    const studentInfoComplete = Object.values(studentInfo).every(
      value => value.trim() !== ''
    );
    return allQuestionsAnswered && studentInfoComplete;
  };

  // Resetear formulario
  const resetForm = () => {
    setResponses({});
    setStudentInfo({
      name: '',
      age: '',
      grade: '',
      evaluator: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  // Generar reporte completo
  const generateReport = (testId) => {
    const scores = calculateScores();
    
    // Eliminar el campo 'total' de scores antes de devolverlo
    const { total, ...scoresWithoutTotal } = scores;

    let maxScore = -1;
    let minScore = Infinity;
    let maxScale = '';
    let minScale = '';

    // Exclude 'total' and 'H+DA' from min/max calculation if they are not primary scales
    const primaryScales = Object.keys(scoresWithoutTotal).filter(scale => scale !== 'H+DA');

    primaryScales.forEach(scale => {
      const score = scoresWithoutTotal[scale];
      if (score > maxScore) {
        maxScore = score;
        maxScale = scale;
      }
      if (score < minScore) {
        minScore = score;
        minScale = scale;
      }
    });

    return {
      testId,
      studentInfo,
      responses,
      scores: scoresWithoutTotal,
      highestScoreScale: { scale: maxScale, score: maxScore },
      lowestScoreScale: { scale: minScale, score: minScore },
      timestamp: new Date().toISOString()
    };
  };

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
    responses,
    studentInfo,
    updateResponse,
    updateStudentInfo,
    calculateScores,
    getInterpretation,
    isFormComplete,
    resetForm,
    generateReport,
    edahQuestions,
    scaleLabels,
    scaleTypes
  };
};
