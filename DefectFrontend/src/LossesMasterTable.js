import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import LossesMasterForm from "./LossesMasterForm";

const LossesMasterTable = () => {
    const [losses, setLosses] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchLosses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/losses-master/getall');
                setLosses(response.data);
            } catch (error) {
                setMessage('Error fetching losses data.');
            }
        };

        fetchLosses();
    }, []);

    const handleEdit = (id) => {
        navigate(`/losses-master/edit/${id}`); // Redirect to edit form
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/losses-master/delete/${id}`);
            setLosses(losses.filter((loss) => loss._id !== id)); // Update state after deletion
            setMessage('Loss deleted successfully!');
        } catch (error) {
            setMessage('Error deleting loss.');
        }
    };

     
     
         // Navigate back to the form
         const handleNavigation = () => {
             navigate("/losses-master/add");
         };

         const handleRefresh = () => {
            // Refresh the page
            window.location.reload();
          };

    return (
        <div className="container mt-0">
            <LossesMasterForm />
            {/* <div className="d-flex justify-content-start mb-3">
                <Button onClick={handleNavigation} variant="primary">
                    Add
                </Button>
            </div> */}
            {/* <h2 className="text-center">Losses Master Data</h2> */}
            <div className="row align-items-center mt-2">
                 {/* Align the button on the right */}
        <div className="col-12 col-md-6 text-md-start mt-2 mt-md-0">
          <button className="btn btn-primary" onClick={handleRefresh}>
            Refresh Table
          </button>
        </div>
        {/* Center the heading */}
        <div className="col-12 col-md-6 text-end">
          <h2 className="mb-2 mt-2 ">Losses Master Data</h2>
        </div>
       
      </div>
            {message && <div className="alert alert-info">{message}</div>}
            <table className="table table-bordered table-striped mt-4">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Losses Name</th>
                        <th>Losses Type</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {losses.length > 0 ? (
                        losses.map((loss, index) => (
                            <tr key={loss._id}>
                                <td>{index + 1}</td>
                                <td>{loss.lossesName}</td>
                                <td>{loss.lossesType}</td>
                                <td>{new Date(loss.createdAt).toLocaleString()}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(loss._id)}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(loss._id)}
                                    >
                                        🗑️ Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LossesMasterTable;
