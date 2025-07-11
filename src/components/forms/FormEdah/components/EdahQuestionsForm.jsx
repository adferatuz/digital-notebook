import React from 'react';
import styles from '../EdahForm.module.css';

const EdahQuestionsForm = ({ responses, updateResponse, edahQuestions, scaleLabels, scaleTypes }) => {
  return (
    <div className={styles.stepContainer}>
      <h3 className={styles.stepTitle}>Selecciona la opción que mejor describa la frecuencia de cada comportamiento en el niño/a, utilizando la siguiente escala:</h3>
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
};

export default EdahQuestionsForm;