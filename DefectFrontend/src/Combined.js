import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ModelMasterForm = () => {
    const { id } = useParams(); // Get the model ID from the URL (null for Add mode)
    const [modelName, setModelName] = useState('');
    const [modelSKU, setModelSKU] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data only in Edit mode
        if (id) {
            const fetchModel = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/getmodelbyid/${id}`);
                    const { modelName, modelSKU } = response.data;
                    setModelName(modelName);
                    setModelSKU(modelSKU);
                } catch (error) {
                    setMessage('Error fetching model data.');
                }
            };

            fetchModel();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (id) {
                // Edit mode
                await axios.put(`http://localhost:5000/api/edit/${id}`, {
                    modelName,
                    modelSKU,
                });
                setMessage('Model updated successfully!');
            } else {
                // Add mode
                await axios.post('http://localhost:5000/api/model-master', {
                    modelName,
                    modelSKU,
                });
                setMessage('Model added successfully!');
                setModelName('');
                setModelSKU('');
            }
            navigate('/view'); // Redirect to the table view after successful submission
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'An unexpected error occurred';
            setMessage(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">
                                {id ? 'Edit Model Master' : 'Add Model Master'}
                            </h2>
                            {message && <div className="alert alert-info">{message}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="modelName" className="form-label">
                                        Model Name
                                    </label>
                                    <input
                                        type="text"
                                        id="modelName"
                                        value={modelName}
                                        onChange={(e) => setModelName(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="modelSKU" className="form-label">
                                        Model SKU
                                    </label>
                                    <input
                                        type="text"
                                        id="modelSKU"
                                        value={modelSKU}
                                        onChange={(e) => setModelSKU(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? (id ? 'Updating...' : 'Submitting...') : id ? 'Update' : 'Submit'}
                                    </button>
                                </div>
                                <div className="mt-3 text-center">
                                    <Button variant="secondary" onClick={() => navigate('/view')}>
                                        Back to List
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelMasterForm;
