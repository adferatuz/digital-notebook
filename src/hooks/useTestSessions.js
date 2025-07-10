import { useState, useEffect } from 'react';
import { getAllTestSessions, createTestSession } from '../services/testSessionService';

export const useTestSessions = () => {
  const [testSessions, setTestSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestSessions = async () => {
      setIsLoading(true);
      setError(null);
      const { data, error } = await getAllTestSessions();
      if (error) {
        setError(error);
      } else {
        setTestSessions(data);
      }
      setIsLoading(false);
    };

    fetchTestSessions();
  }, []);

  const addTestSession = async (sessionData) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await createTestSession(sessionData);
    if (error) {
      setError(error);
    } else if (data && data.length > 0) {
      setTestSessions((prevSessions) => [...prevSessions, data[0]]);
    }
    setIsLoading(false);
  };

  // TODO: Implementar getTestSessionById si es necesario para un caso de uso específico

  return {
    testSessions,
    isLoading,
    error,
    addTestSession,
    // getTestSessionById, // Descomentar si se implementa
  };
};
