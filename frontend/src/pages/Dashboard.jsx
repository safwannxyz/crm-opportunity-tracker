import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        fetchOpportunities();
    }, []);

    const fetchOpportunities = async () => {
        try {
            const response = await api.get('/api/opportunities');
            setOpportunities(response.data);
        } catch (error) {
            setError('Failed to load opportunities');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                await api.delete(`/api/opportunities/${id}`);
                setOpportunities(opportunities.filter(opp => opp._id !== id));
            } catch (error) {
                alert('Failed to delete');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Opportunities</h1>
                    <p className="text-gray-500 text-sm">{opportunities.length} total</p>
                </div>
                <Link
                    to="/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add New
                </Link>
            </div>

            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
                    {error}
                </div>
            )}

            {opportunities.length === 0 ? (
                <div className="bg-white rounded shadow p-8 text-center">
                    <p className="text-gray-500">No opportunities found</p>
                    <Link to="/create" className="text-blue-600 hover:underline mt-2 inline-block">
                        Create one
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {opportunities.map((opp) => (
                        <div key={opp._id} className="bg-white rounded shadow p-4 border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-800">{opp.customerName}</h3>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    {opp.stage}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm mb-2">{opp.requirement}</p>

                            <div className="flex justify-between text-sm mb-3">
                                <span className="font-bold text-blue-600">
                                    ${(opp.estimatedValue || 0).toLocaleString()}
                                </span>
                                <span className="text-gray-500">{opp.priority}</span>
                            </div>

                            <div className="text-xs text-gray-400 border-t pt-2">
                                <div>Owner: {opp.owner?.name}</div>
                                {opp.nextFollowUpDate && (
                                    <div>Follow-up: {new Date(opp.nextFollowUpDate).toLocaleDateString()}</div>
                                )}
                            </div>

                            {user && opp.owner?._id === user._id && (
                                <div className="flex gap-2 mt-3 pt-2 border-t">
                                    <Link
                                        to={`/edit/${opp._id}`}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(opp._id)}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;