import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const OpportunityForm = ({ mode, opportunityId }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        requirement: '',
        estimatedValue: '',
        stage: 'New',
        priority: 'Medium',
        nextFollowUpDate: '',
        notes: '',
    });

    useEffect(() => {
        if (mode === 'edit' && opportunityId) {
            fetchOpportunity();
        }
    }, [mode, opportunityId]);

    const fetchOpportunity = async () => {
        try {
            const response = await api.get(`/api/opportunities/${opportunityId}`);
            const data = response.data;
            setFormData({
                customerName: data.customerName || '',
                contactName: data.contactName || '',
                contactEmail: data.contactEmail || '',
                contactPhone: data.contactPhone || '',
                requirement: data.requirement || '',
                estimatedValue: data.estimatedValue || '',
                stage: data.stage || 'New',
                priority: data.priority || 'Medium',
                nextFollowUpDate: data.nextFollowUpDate ? data.nextFollowUpDate.split('T')[0] : '',
                notes: data.notes || '',
            });
        } catch (error) {
            alert('Failed to load');
            navigate('/');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSend = {
                ...formData,
                estimatedValue: parseFloat(formData.estimatedValue) || 0,
            };

            if (mode === 'edit') {
                await api.put(`/api/opportunities/${opportunityId}`, dataToSend);
            } else {
                await api.post('/api/opportunities', dataToSend);
            }

            navigate('/');
        } catch (error) {
            alert('Failed to save');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="bg-white rounded shadow p-6">
                <h1 className="text-2xl font-bold mb-6">
                    {mode === 'edit' ? 'Edit Opportunity' : 'New Opportunity'}
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Customer Name *
                            </label>
                            <input
                                type="text"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Contact Person
                            </label>
                            <input
                                type="text"
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="contactPhone"
                                    value={formData.contactPhone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Requirement *
                            </label>
                            <input
                                type="text"
                                name="requirement"
                                value={formData.requirement}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">
                                    Value ($)
                                </label>
                                <input
                                    type="number"
                                    name="estimatedValue"
                                    value={formData.estimatedValue}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">
                                    Stage
                                </label>
                                <select
                                    name="stage"
                                    value={formData.stage}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option>New</option>
                                    <option>Contacted</option>
                                    <option>Qualified</option>
                                    <option>Proposal Sent</option>
                                    <option>Won</option>
                                    <option>Lost</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">
                                    Priority
                                </label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">
                                    Follow-up Date
                                </label>
                                <input
                                    type="date"
                                    name="nextFollowUpDate"
                                    value={formData.nextFollowUpDate}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Notes
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OpportunityForm;