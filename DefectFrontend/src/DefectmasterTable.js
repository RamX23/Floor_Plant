import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Container } from 'react-bootstrap';
import DefectMasterForm from "./DefectMasterForm";

const DefectMasterTable = () => {
    const [defects, setDefects] = useState([]); // State for storing defect data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate();

    // Fetch all defects from the API
    useEffect(() => {
        const fetchDefects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/defect-master/getall');
                setDefects(response.data); // Store fetched data in the state
            } catch (err) {
                setError('Failed to fetch defect data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDefects();
    }, []);

    // Handle delete functionality
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this defect?')) {
            try {
                await axios.delete(`http://localhost:5000/api/defect-master/delete/${id}`);
                setDefects(defects.filter((defect) => defect._id !== id)); // Update the table after deletion
            } catch (err) {
                setError('Failed to delete defect. Please try again.');
            }
        }
    };

    // Handle edit navigation
    const handleEdit = (id) => {
        navigate(`/defect-master/edit/${id}`);
    };

    const handleRefresh = () => {
        // Refresh the page
        window.location.reload();
      };


    return (
        <Container className="mt-2">
            <DefectMasterForm />
            {/* <div className="d-flex justify-content-center align-items-center mb-2 mt-2">
                <h2>Defect Master Data</h2>
                </div> */}
                {/* <Button variant="primary" onClick={() => navigate('/defect-master/add')}>
                    ➕ Add New Defect
                </Button> */}
          <div className="row align-items-center mt-2">
                 {/* Align the button on the right */}
        <div className="col-12 col-md-6 text-md-start mt-2 mt-md-0">
          <button className="btn btn-primary" onClick={handleRefresh}>
            Refresh Table
          </button>
        </div>
        {/* Center the heading */}
        <div className="col-12 col-md-6 text-end">
          <h2 className="mb-2 mt-2 ">Defect Master Data</h2>
        </div>
       
      </div>
            

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Defect Name</th>
                            <th>Defect Type</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {defects.length > 0 ? (
                            defects.map((defect, index) => (
                                <tr key={defect._id}>
                                    <td>{index + 1}</td>
                                    <td>{defect.defectName}</td>
                                    <td>{defect.defectType}</td>
                                    <td>{new Date(defect.createdAt).toLocaleString()}</td>
                                    <td>{new Date(defect.updatedAt).toLocaleString()}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEdit(defect._id)}
                                        >
                                            ✏️ Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(defect._id)}
                                        >
                                            🗑️ Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No defects found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default DefectMasterTable;
