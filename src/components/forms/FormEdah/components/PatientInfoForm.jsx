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
          <label className={styles.label}>Nombre del tutor/evaluador:</label>
          <input
            type="text"
            value={studentInfo.evaluatorName}
            onChange={(e) => updateStudentInfo('evaluatorName', e.target.value)}
            className={styles.input}
            placeholder="Nombre de la persona que evalúa"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Parentesco o relación:</label>
          <select
            value={studentInfo.evaluatorRelationship}
            onChange={(e) => updateStudentInfo('evaluatorRelationship', e.target.value)}
            className={styles.input}
          >
            <option value="" disabled>Seleccione una opción</option>
            <option value="Madre">Madre</option>
            <option value="Padre">Padre</option>
            <option value="Tutor Legal">Tutor Legal</option>
            <option value="Profesor(a)">Profesor(a)</option>
            <option value="Otro">Otro</option>
          </select>
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