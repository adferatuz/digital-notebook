import { supabase } from '../utils/supabase';

/**
 * Creates a new test session in the database.
 * @param {object} sessionData - The data for the new session.
 * @returns {Promise<{data: object, error: object}>}
 */
export const createTestSession = async (sessionData) => {
  const { data, error } = await supabase
    .from('test_sessions')
    .insert([sessionData])
    .select();
  return { data, error };
};

/**
 * Retrieves all test sessions from the database.
 * @returns {Promise<{data: Array<object>, error: object}>}
 */
export const getAllTestSessions = async () => {
  const { data, error } = await supabase
    .from('test_sessions')
    .select('*');
  return { data, error };
};

/**
 * Retrieves a test session by its ID.
 * @param {string} sessionId - The ID of the test session to retrieve.
 * @returns {Promise<{data: object, error: object}>}
 */
export const getTestSessionById = async (sessionId) => {
  const { data, error } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('id', sessionId)
    .single();
  return { data, error };
};