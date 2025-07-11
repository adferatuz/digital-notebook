import React from 'react';
import styles from '../EdahForm.module.css';

const EdahResultsDisplay = ({ scores, interpretation, studentInfo }) => {
  return (
    <div className={styles.stepContainer}>
      <h3 className={styles.stepTitle}>Resultados de la Evaluación</h3>
      
      <div className={styles.resultsGrid}>
        <div className={styles.studentSummary}>
          <h4>Información del Paciente</h4>
          <p><strong>Nombre:</strong> {studentInfo.name}</p>
          <p><strong>Edad:</strong> {studentInfo.age} años</p>
          <p><strong>Grado:</strong> {studentInfo.grade}</p>
          <p><strong>Tutor a evaluar:</strong> {studentInfo.evaluator}</p>
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

export default EdahResultsDisplay;