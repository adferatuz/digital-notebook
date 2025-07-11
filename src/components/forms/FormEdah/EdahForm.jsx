import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEdahForm } from '../../../hooks/useEdahForm';
import PatientInfoForm from './components/PatientInfoForm';
import EdahQuestionsForm from './components/EdahQuestionsForm';
import EdahResultsDisplay from './components/EdahResultsDisplay';
import styles from './EdahForm.module.css';

const EdahForm = () => {
  const [searchParams] = useSearchParams();
  const testId = searchParams.get('testId');

  const {
    responses,
    studentInfo,
    updateResponse,
    updateStudentInfo,
    calculateScores,
    getInterpretation,
    resetForm,
    generateReport,
    edahQuestions,
    scaleLabels,
    scaleTypes,
    submit,
    isLoading,
    error
  } = useEdahForm();

  const [currentStep, setCurrentStep] = useState('info'); // 'info', 'questions'

  useEffect(() => {
    if (!testId) {
      // Optionally handle the case where testId is missing, e.g., redirect or show an error
      console.error("testId is missing from URL parameters.");
    }
  }, [testId]);

  const handleNext = () => {
    if (currentStep === 'info') {
      setCurrentStep('questions');
    }
  };

  const handlePrevious = () => {
    if (currentStep === 'questions') {
      setCurrentStep('info');
    }
  };

  const handleSubmit = async () => {
    const report = generateReport(testId);
    console.log('Reporte EDAH a enviar:', report);

    const scores = calculateScores();
    let maxScore = -1;
    let minScore = Infinity;
    let maxScale = '';
    let minScale = '';

    // Exclude 'total' and 'H+DA' from min/max calculation if they are not primary scales
    const primaryScales = Object.keys(scores).filter(scale => scale !== 'total' && scale !== 'H+DA');

    primaryScales.forEach(scale => {
      const score = scores[scale];
      if (score > maxScore) {
        maxScore = score;
        maxScale = scale;
      }
      if (score < minScore) {
        minScore = score;
        minScale = scale;
      }
    });

    console.log('Escala con mayor puntaje:', scaleTypes[maxScale] || maxScale, '(', maxScore, ')');
    console.log('Escala con menor puntaje:', scaleTypes[minScale] || minScale, '(', minScore, ')');

    const result = await submit(report);

    if (result.success) {
      alert('Evaluación completada y enviada exitosamente.');
      // Optionally reset form or redirect after successful submission
      resetForm();
      setCurrentStep('info');
    } else {
      alert(`Error al enviar la evaluación: ${result.error?.message || 'Error desconocido'}`);
    }
  };

  const handleReset = () => {
    resetForm();
    setCurrentStep('info');
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 'info':
        return (
          <PatientInfoForm 
            studentInfo={studentInfo} 
            updateStudentInfo={updateStudentInfo} 
            testId={testId}
          />
        );
      case 'questions':
        return (
          <EdahQuestionsForm
            responses={responses}
            updateResponse={updateResponse}
            edahQuestions={edahQuestions}
            scaleLabels={scaleLabels}
            scaleTypes={scaleTypes}
          />
        );
      default:
        return (
          <PatientInfoForm 
            studentInfo={studentInfo} 
            updateStudentInfo={updateStudentInfo} 
            testId={testId}
          />
        );
    }
  };

  const canProceed = () => {
    if (currentStep === 'info') {
      return Object.values(studentInfo).every(value => value.trim() !== '') && testId;
    }
    if (currentStep === 'questions') {
      return Object.keys(edahQuestions).every(id => responses[id] !== undefined);
    }
    return false; // Should not proceed beyond questions in this form
  };

  return (
    <div className={styles.formContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Evaluación EDAH</h1>
        <p className={styles.subtitle}>
          Escala para la Evaluación del Trastorno por Déficit de Atención con Hiperactividad
        </p>
      </header>

      <div className={styles.progressBar}>
        <div className={styles.progressStep}>
          <div className={`${styles.progressDot} ${currentStep === 'info' ? styles.active : styles.completed}`}>
            1
          </div>
          <span>Información</span>
        </div>
        <div className={styles.progressLine}></div>
        <div className={styles.progressStep}>
          <div className={`${styles.progressDot} ${currentStep === 'questions' ? styles.active : ''}`}>
            2
          </div>
          <span>Evaluación</span>
        </div>
      </div>

      <main className={styles.content}>
        {isLoading && <p>Enviando formulario...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        {getStepContent()}
      </main>

      <footer className={styles.footer}>
        <div className={styles.buttonGroup}>
          {currentStep === 'questions' && (
            <button 
              onClick={handlePrevious}
              className={`${styles.button} ${styles.secondary}`}
              disabled={isLoading}
            >
              Anterior
            </button>
          )}
          
          <button 
            onClick={handleReset}
            className={`${styles.button} ${styles.danger}`}
            disabled={isLoading}
          >
            Reiniciar
          </button>
          
          {currentStep === 'info' ? (
            <button 
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
              className={`${styles.button} ${styles.primary}`}
            >
              Siguiente
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className={`${styles.button} ${styles.success}`}
              disabled={isLoading}
            >
              Enviar Formulario
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default EdahForm;
