import { useState, useEffect, createContext, useContext } from 'react';
import * as authService from '../services/authService';

// 1. Create Auth Context
const AuthContext = createContext();

// 2. Create AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Start with true to check initial session
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for an existing session on initial load
        const checkSession = async () => {
            const { data: { user: sessionUser }, error: sessionError } = await authService.getCurrentUser();
            if (sessionError) {
                setError(sessionError);
            }
            setUser(sessionUser);
            setIsLoading(false);
        };

        checkSession();

        // Listen for auth state changes
        const { data: { subscription } } = authService.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        // Cleanup subscription on unmount
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email, password) => {
        setIsLoading(true);
        setError(null);
        const { data, error } = await authService.signIn(email, password);
        if (error) {
            setError(error);
        }
        setUser(data.user);
        setIsLoading(false);
    };

    const signOut = async () => {
        setIsLoading(true);
        setError(null);
        const { error } = await authService.signOut();
        if (error) {
            setError(error);
        }
        setUser(null);
        setIsLoading(false);
    };

    const value = {
        user,
        isLoading,
        error,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create useAuth Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};