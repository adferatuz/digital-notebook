import { useState } from 'react';
import styles from './CredentialGenerator.module.css';
import { useTestSessions } from '../../../hooks/useTestSessions';

const CredentialGenerator = () => {
  const { testSessions, isLoading, error, addTestSession } = useTestSessions();

  const generateCredentials = async () => {
    const testId = `EDAH-${Date.now()}`;
    const newCredential = {
      testId,
      credential_tutor_a: `TutorA-${testId}`,
      credential_tutor_b: `TutorB-${testId}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    await addTestSession(newCredential);
  };

  if (isLoading) {
    return <div className={styles.container}>Cargando sesiones de prueba...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Generador de Credenciales para Prueba EDAH</h2>
      <button onClick={generateCredentials} className={styles.button}>
        Generar Nuevas Credenciales
      </button>

      {testSessions.length > 0 && (
        <div className={styles.credentialsList}>
          <h3>Credenciales Generadas:</h3>
          {testSessions.map((cred) => (
            <div key={cred.testId} className={styles.credentialsDisplay}>
              <p><strong>ID de la Prueba:</strong> {cred.testId}</p>
              <p><strong>Credencial Tutor A:</strong> {cred.credential_tutor_a}</p>
              <p><strong>Credencial Tutor B:</strong> {cred.credential_tutor_b}</p>
              <p><strong>Válido hasta:</strong> {new Date(cred.expiresAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CredentialGenerator;