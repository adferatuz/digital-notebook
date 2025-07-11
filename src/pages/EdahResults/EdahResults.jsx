import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getEdahResultsByTestId } from '../../services/edahFormService';
import styles from './EdahResults.module.css'; // Asumo que crearás este archivo CSS

const EdahResults = () => {
  const [searchParams] = useSearchParams();
  const testId = searchParams.get('testId');

  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!testId) {
        setError(new Error('No se proporcionó un ID de prueba (testId).'));
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await getEdahResultsByTestId(testId);
        if (error) {
          setError(error);
        } else {
          setResults(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [testId]);

  if (isLoading) {
    return <div className={styles.loading}>Cargando resultados...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  if (!results || results.length === 0) {
    return <div className={styles.noResults}>No se encontraron resultados para el ID de prueba: {testId}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Resultados de Evaluación EDAH para Test ID: {testId}</h1>
      
      {results.map((result, index) => (
        <div key={index} className={styles.resultCard}>
          <h2 className={styles.cardTitle}>Formulario {index + 1} (Tutor: {result.studentInfo.evaluator})</h2>
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Información del Paciente</h3>
            <p><strong>Nombre:</strong> {result.studentInfo.name}</p>
            <p><strong>Edad:</strong> {result.studentInfo.age} años</p>
            <p><strong>Grado:</strong> {result.studentInfo.grade}</p>
            <p><strong>Fecha de Evaluación:</strong> {result.studentInfo.date}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Puntuaciones por Subescala</h3>
            <div className={styles.scoresGrid}>
              {Object.entries(result.scores).map(([scale, score]) => (
                <div key={scale} className={styles.scoreItem}>
                  <span className={styles.scoreScale}>{scale}</span>
                  <span className={styles.scoreValue}>{score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Interpretación</h3>
            <div className={styles.interpretationGrid}>
              {Object.entries(result.interpretation).map(([scale, interpretationText]) => (
                <div key={scale} className={styles.interpretationItem}>
                  <span className={styles.interpretationScale}>{scale}</span>
                  <span className={styles.interpretationText}>{interpretationText}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Puedes añadir más detalles si es necesario, como las respuestas individuales */}
          {/* <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Respuestas Individuales</h3>
            <pre>{JSON.stringify(result.responses, null, 2)}</pre>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default EdahResults;