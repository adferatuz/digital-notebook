import { supabase } from '../utils/supabase';

/**
 * Signs in a user with email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{data: {user: object, session: object}, error: object}>}
 */
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

/**
 * Signs out the current user.
 * @returns {Promise<{error: object}>}
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/**
 * Gets the current authenticated user.
 * @returns {Promise<{data: {user: object}, error: object}>}
 */
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { data: { user }, error };
};

/**
 * Listens for changes in the authentication state.
 * @param {function} callback - The callback to execute when the auth state changes.
 * @returns {{ data: { subscription: object } }}
 */
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(_event, session);
  });
};
