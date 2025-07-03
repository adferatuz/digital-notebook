import { useState } from 'react';
import styles from './CredentialGenerator.module.css';

const CredentialGenerator = () => {
  const [credentials, setCredentials] = useState(null);

  const generateCredentials = () => {
    const testId = `EDAH-${Date.now()}`;
    const newCredentials = {
      testId,
      tutorA: `TutorA-${testId}`,
      tutorB: `TutorB-${testId}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    setCredentials(newCredentials);
  };

  return (
    <div className={styles.container}>
      <h2>Generador de Credenciales para Prueba EDAH</h2>
      <button onClick={generateCredentials} className={styles.button}>
        Generar Nuevas Credenciales
      </button>

      {credentials && (
        <div className={styles.credentialsDisplay}>
          <h3>Credenciales Generadas:</h3>
          <p><strong>ID de la Prueba:</strong> {credentials.testId}</p>
          <p><strong>Credencial Tutor A:</strong> {credentials.tutorA}</p>
          <p><strong>Credencial Tutor B:</strong> {credentials.tutorB}</p>
          <p><strong>Válido hasta:</strong> {new Date(credentials.expiresAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default CredentialGenerator;