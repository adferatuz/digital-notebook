import { useState, useEffect } from 'react';
import styles from './CredentialGenerator.module.css';

const CredentialGenerator = () => {
  const [generatedCredentials, setGeneratedCredentials] = useState([]);

  useEffect(() => {
    const loadCredentials = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('edahCredentials')) || [];
        setGeneratedCredentials(stored);
      } catch (error) {
        console.error("Failed to load credentials from localStorage:", error);
      }
    };
    loadCredentials();
  }, []);

  const generateCredentials = () => {
    const testId = `EDAH-${Date.now()}`;
    const newCredential = {
      testId,
      tutorA: `TutorA-${testId}`,
      tutorB: `TutorB-${testId}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const updatedCredentials = [...generatedCredentials, newCredential];
    setGeneratedCredentials(updatedCredentials);
    try {
      localStorage.setItem('edahCredentials', JSON.stringify(updatedCredentials));
    } catch (error) {
      console.error("Failed to save credentials to localStorage:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Generador de Credenciales para Prueba EDAH</h2>
      <button onClick={generateCredentials} className={styles.button}>
        Generar Nuevas Credenciales
      </button>

      {generatedCredentials.length > 0 && (
        <div className={styles.credentialsList}>
          <h3>Credenciales Generadas:</h3>
          {generatedCredentials.map((cred, index) => (
            <div key={index} className={styles.credentialsDisplay}>
              <p><strong>ID de la Prueba:</strong> {cred.testId}</p>
              <p><strong>Credencial Tutor A:</strong> {cred.tutorA}</p>
              <p><strong>Credencial Tutor B:</strong> {cred.tutorB}</p>
              <p><strong>Válido hasta:</strong> {new Date(cred.expiresAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CredentialGenerator;