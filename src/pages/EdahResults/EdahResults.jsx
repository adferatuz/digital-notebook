import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockEdahResults } from '../../services/mockEdahResults';
import { getEdahSummaries } from '../../services/edahFormService'; // Importamos la función real
import { scaleTypes } from '../../components/forms/FormEdah/EdahForm.logic';
import styles from './EdahResults.module.css';

// --- Sub-componente para mostrar la lista de pacientes ---
const PatientSummaryList = () => {
  const [summaries, setSummaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await getEdahSummaries();
        if (error) {
          throw error;
        }
        setSummaries(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummaries();
  }, []);

  if (isLoading) return <div className={styles.loading}>Cargando historial de evaluaciones...</div>;
  if (error) return <div className={styles.error}>Error al cargar el historial: {error.message}</div>;

  return (
    <div className={styles.summaryContainer}>
      <h1 className={styles.title}>Historial de Evaluaciones EDAH</h1>
      <p className={styles.subtitle}>Seleccione un paciente para ver los resultados detallados.</p>
      <div className={styles.summaryList}>
        {summaries.length > 0 ? (
          summaries.map((summary) => (
            <Link to={`/dashboard/edah-results/${summary.test_id}`} key={summary.test_id} className={styles.summaryCardLink}>
              <div className={styles.summaryCard}>
                <h2 className={styles.patientName}>{summary.student_name}</h2>
                <div className={styles.summaryDetails}>
                  <span className={styles.summaryTestId}>ID: {summary.test_id}</span>
                  <span className={styles.summaryDate}>Última eval: {summary.last_evaluation_date}</span>
                  <span className={styles.summaryCount}>{summary.evaluators_count} evaluador(es)</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.noResults}>No se encontraron evaluaciones en el historial.</div>
        )}
      </div>
    </div>
  );
};

// --- Sub-componente para mostrar los detalles de un resultado ---
const ResultDetails = ({ testId }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = () => {
      setIsLoading(true);
      setError(null);
      setTimeout(() => {
        try {
          // Aquí llamaríamos a getEdahResultsByTestId(testId)
          const filteredResults = mockEdahResults.filter(r => r.test_id === testId);
          if (filteredResults.length === 0) {
            throw new Error(`No se encontraron resultados para el ID: ${testId}`);
          }
          setResults(filteredResults);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    };
    fetchResults();
  }, [testId]);

  if (isLoading) return <div className={styles.loading}>Cargando resultados...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  const studentInfo = results[0].student_info;

  return (
    <div className={styles.container}>
       <div className={styles.header}>
        <h1 className={styles.title}>Resultados de Evaluación EDAH</h1>
        <Link to="/dashboard/edah-results" className={styles.backLink}>← Volver al historial</Link>
      </div>

      <div className={styles.patientInfoCard}>
        <h2 className={styles.sectionTitle}>Información del Paciente</h2>
        <div className={styles.infoGrid}>
          <p><strong>Nombre:</strong> {studentInfo.name}</p>
          <p><strong>Edad:</strong> {studentInfo.age} años</p>
          <p><strong>Grado:</strong> {studentInfo.grade}</p>
          <p><strong>Test ID:</strong> {testId}</p>
        </div>
      </div>

      <div className={styles.resultsGrid}>
        {results.map((result, index) => (
          <div key={result.id} className={styles.resultCard}>
            <h2 className={styles.cardTitle}>
              Evaluación {index + 1}
              <span className={styles.evaluator}>Tutor: {result.student_info.evaluator}</span>
            </h2>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Puntuaciones</h3>
              <div className={styles.scoresGrid}>
                {Object.entries(result.scores).map(([scale, score]) => (
                  <div key={scale} className={styles.scoreItem}>
                    <span className={styles.scoreScale}>{scaleTypes[scale] || scale}</span>
                    <span className={styles.scoreValue}>{score}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Escalas Destacadas</h3>
              <div className={styles.highlightGrid}>
                <div className={`${styles.highlightItem} ${styles.highest}`}>
                  <span className={styles.highlightLabel}>Puntuación Más Alta</span>
                  <span className={styles.highlightScale}>{scaleTypes[result.highest_score_scale.scale]}</span>
                  <span className={styles.highlightScore}>{result.highest_score_scale.score}</span>
                </div>
                <div className={`${styles.highlightItem} ${styles.lowest}`}>
                  <span className={styles.highlightLabel}>Puntuación Más Baja</span>
                  <span className={styles.highlightScale}>{scaleTypes[result.lowest_score_scale.scale]}</span>
                  <span className={styles.highlightScore}>{result.lowest_score_scale.score}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Componente Principal ---
const EdahResults = () => {
  const { testId } = useParams();

  // Si hay un testId en la URL, muestra los detalles.
  // Si no, muestra la lista de resúmenes.
  return testId ? <ResultDetails testId={testId} /> : <PatientSummaryList />;
};

export default EdahResults;
