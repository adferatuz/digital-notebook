import React from 'react';
import styles from '../EdahForm.module.css';

const PatientInfoForm = ({ studentInfo, updateStudentInfo, testId }) => {
  return (
    <div className={styles.stepContainer}>
      <h3 className={styles.stepTitle}>Información del Paciente</h3>
      <div className={styles.infoGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>ID del Formulario:</label>
          <input
            type="text"
            value={testId}
            className={styles.input}
            readOnly
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Nombre del paciente:</label>
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
          <label className={styles.label}>Tutor a evaluar:</label>
          <input
            type="text"
            value={studentInfo.evaluator}
            onChange={(e) => updateStudentInfo('evaluator', e.target.value)}
            className={styles.input}
            placeholder="Nombre del tutor/evaluador"
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
};

export default PatientInfoForm;