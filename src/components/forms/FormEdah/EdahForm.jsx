import { useState } from 'react';
import { 
  useEdahForm, 
  edahQuestions, 
  scaleLabels, 
  scaleTypes 
} from './EdahForm.logic';
import styles from './EdahForm.module.css';

const EdahForm = () => {
  const {
    responses,
    studentInfo,
    updateResponse,
    updateStudentInfo,
    calculateScores,
    getInterpretation,
    isFormComplete,
    resetForm,
    generateReport
  } = useEdahForm();

  const [currentStep, setCurrentStep] = useState('info'); // 'info', 'questions', 'results'
  const [showResults, setShowResults] = useState(false);

  const handleNext = () => {
    if (currentStep === 'info') {
      setCurrentStep('questions');
    } else if (currentStep === 'questions') {
      setCurrentStep('results');
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 'questions') {
      setCurrentStep('info');
    } else if (currentStep === 'results') {
      setCurrentStep('questions');
      setShowResults(false);
    }
  };

  const handleSubmit = () => {
    const report = generateReport();
    console.log('Reporte EDAH:', report);
    // Aquí puedes agregar lógica para enviar el reporte a una API o guardarlo
    alert('Evaluación completada. Revisa la consola para ver el reporte completo.');
  };

  const handleReset = () => {
    resetForm();
    setCurrentStep('info');
    setShowResults(false);
  };

  const renderStudentInfo = () => (
    <div className={styles.stepContainer}>
      <h3 className={styles.stepTitle}>Información del Estudiante</h3>
      <div className={styles.infoGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Nombre del estudiante:</label>
          <input
            type="text"
            value={studentInfo.name}
            onChange={(e) => updateStudentInfo('name', e.target.value)}
            className={styles.input}
            placeholder="Ingrese el nombre completo"
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Edad:</label>
          <input
            type="number"
            value={studentInfo.age}
            onChange={(e) => updateStudentInfo('age', e.target.value)}
            className={styles.input}
            placeholder="Edad en años"
            min="3"
            max="18"
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Grado escolar:</label>
          <input
            type="text"
            value={studentInfo.grade}
            onChange={(e) => updateStudentInfo('grade', e.target.value)}
            className={styles.input}
            placeholder="Ej: 3°, 4°, 5°"
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Evaluador:</label>
          <input
            type="text"
            value={studentInfo.evaluator}
            onChange={(e) => updateStudentInfo('evaluator', e.target.value)}
            className={styles.input}
            placeholder="Nombre del profesor/evaluador"
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Fecha de evaluación:</label>
          <input
            type="date"
            value={studentInfo.date}
            onChange={(e) => updateStudentInfo('date', e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );

  const renderQuestions = () => (
    <div className={styles.stepContainer}>
      <h3 className={styles.stepTitle}>Evaluación EDAH</h3>
      <div className={styles.scaleInfo}>
        <h4>Escala de valoración:</h4>
        <div className={styles.scaleGrid}>
          {Object.entries(scaleLabels).map(([value, label]) => (
            <div key={value} className={styles.scaleItem}>
              <span className={styles.scaleValue}>{value}</span>
              <span className={styles.scaleLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.questionsContainer}>
        {Object.entries(edahQuestions).map(([id, question]) => (
          <div key={id} className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>{id}</span>
              <span className={`${styles.scaleTag} ${styles[`scale${question.escala}`]}`}>
                {scaleTypes[question.escala]}
              </span>
            </div>
            
            <p className={styles.questionText}>{question.pregunta}</p>
            
            <div className={styles.responseOptions}>
              {Object.entries(scaleLabels).map(([value, label]) => (
                <label key={value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name={`question-${id}`}
                    value={value}
                    checked={responses[id] === parseInt(value)}
                    onChange={(e) => updateResponse(id, e.target.value)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioCustom}></span>
                  <span className={styles.radioText}>
                    {value} - {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResults = () => {
    const scores = calculateScores();
    const interpretation = getInterpretation(scores);
    
    return (
      <div className={styles.stepContainer}>
        <h3 className={styles.stepTitle}>Resultados de la Evaluación</h3>
        
        <div className={styles.resultsGrid}>
          <div className={styles.studentSummary}>
            <h4>Información del Estudiante</h4>
            <p><strong>Nombre:</strong> {studentInfo.name}</p>
            <p><strong>Edad:</strong> {studentInfo.age} años</p>
            <p><strong>Grado:</strong> {studentInfo.grade}</p>
            <p><strong>Evaluador:</strong> {studentInfo.evaluator}</p>
            <p><strong>Fecha:</strong> {studentInfo.date}</p>
          </div>
          
          <div className={styles.scoresContainer}>
            <h4>Puntuaciones por Subescala</h4>
            <div className={styles.scoresGrid}>
              {Object.entries(scores).map(([scale, score]) => (
                <div key={scale} className={styles.scoreCard}>
                  <div className={styles.scoreHeader}>
                    <span className={styles.scaleName}>
                      {scaleTypes[scale] || scale}
                    </span>
                    <span className={`${styles.interpretation} ${styles[interpretation[scale]?.toLowerCase()]}`}>
                      {interpretation[scale]}
                    </span>
                  </div>
                  <div className={styles.scoreValue}>{score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.interpretationSection}>
          <h4>Interpretación de Resultados</h4>
          <div className={styles.interpretationGrid}>
            <div className={styles.interpretationCard}>
              <h5>Hiperactividad/Impulsividad (H)</h5>
              <p>Puntuación: {scores.H} - Nivel: {interpretation.H}</p>
              <p>Evalúa la inquietud motora, impulsividad y comportamientos hiperactivos.</p>
            </div>
            
            <div className={styles.interpretationCard}>
              <h5>Déficit de Atención (DA)</h5>
              <p>Puntuación: {scores.DA} - Nivel: {interpretation.DA}</p>
              <p>Mide las dificultades de atención, concentración y finalización de tareas.</p>
            </div>
            
            <div className={styles.interpretationCard}>
              <h5>Trastorno de Conducta (TC)</h5>
              <p>Puntuación: {scores.TC} - Nivel: {interpretation.TC}</p>
              <p>Evalúa problemas de comportamiento social y dificultades de relación.</p>
            </div>
            
            <div className={styles.interpretationCard}>
              <h5>H + DA (Combinado)</h5>
              <p>Puntuación: {scores['H+DA']} - Nivel: {interpretation['H+DA']}</p>
              <p>Combinación de hiperactividad y déficit de atención.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 'info':
        return renderStudentInfo();
      case 'questions':
        return renderQuestions();
      case 'results':
        return renderResults();
      default:
        return renderStudentInfo();
    }
  };

  const canProceed = () => {
    if (currentStep === 'info') {
      return Object.values(studentInfo).every(value => value.trim() !== '');
    }
    if (currentStep === 'questions') {
      return Object.keys(edahQuestions).every(id => responses[id] !== undefined);
    }
    return true;
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
          <div className={`${styles.progressDot} ${currentStep === 'questions' ? styles.active : currentStep === 'results' ? styles.completed : ''}`}>
            2
          </div>
          <span>Evaluación</span>
        </div>
        <div className={styles.progressLine}></div>
        <div className={styles.progressStep}>
          <div className={`${styles.progressDot} ${currentStep === 'results' ? styles.active : ''}`}>
            3
          </div>
          <span>Resultados</span>
        </div>
      </div>

      <main className={styles.content}>
        {getStepContent()}
      </main>

      <footer className={styles.footer}>
        <div className={styles.buttonGroup}>
          {currentStep !== 'info' && (
            <button 
              onClick={handlePrevious}
              className={`${styles.button} ${styles.secondary}`}
            >
              Anterior
            </button>
          )}
          
          <button 
            onClick={handleReset}
            className={`${styles.button} ${styles.danger}`}
          >
            Reiniciar
          </button>
          
          {currentStep !== 'results' ? (
            <button 
              onClick={handleNext}
              disabled={!canProceed()}
              className={`${styles.button} ${styles.primary}`}
            >
              Siguiente
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className={`${styles.button} ${styles.success}`}
            >
              Generar Reporte
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default EdahForm;
