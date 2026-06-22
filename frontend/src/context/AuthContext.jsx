import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

// Create the context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in on page load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, []);

    // Fetch user profile using token
    const fetchUserProfile = async () => {
        try {
            const response = await api.get('/api/auth/me');
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            const response = await api.post('/api/auth/login', { email, password });
            const { token, ...userData } = response.data;
            localStorage.setItem('token', token);
            setUser(userData);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    // Register function
    const register = async (name, email, password) => {
        try {
            const response = await api.post('/api/auth/register', { name, email, password });
            const { token, ...userData } = response.data;
            localStorage.setItem('token', token);
            setUser(userData);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};