import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow px-4 py-3">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">
                    CRM Tracker
                </Link>

                {user && (
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700">Hello, {user.name}</span>
                        <Link
                            to="/create"
                            className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm"
                        >
                            + New
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;