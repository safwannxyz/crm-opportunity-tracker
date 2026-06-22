import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If authenticated, show the page
    return children;
};

export default ProtectedRoute;