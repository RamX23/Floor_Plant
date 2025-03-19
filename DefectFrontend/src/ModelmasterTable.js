// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";

// const ModelMasterTable = () => {
//     const [models, setModels] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate(); // Navigation hook
//     const handleNavigation = () => {
//         navigate("/"); // Navigate to the form route
//     };

//     useEffect(() => {
//         const fetchModels = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/getall');
//                 setModels(response.data); // Save the fetched data to state
//             } catch (err) {
//                 setError(err.response?.data?.message || 'An error occurred while fetching data.');
//             } finally {
//                 setLoading(false); // Set loading to false regardless of success or failure
//             }
//         };

//         fetchModels();
//     }, []);

//     return (
//         <div className="container mt-5">
//             {/* Back Button */}
//             <div className="d-flex justify-content-start mb-3">
//                 <Button onClick={handleNavigation} variant="primary">
//                     🔙 Back
//                 </Button>
//             </div>
//             <h2 className="mb-4 text-center">Model Master Data</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <div className="alert alert-danger">{error}</div>
//             ) : (
//                 <div className="table-responsive">
//                     <table className="table table-bordered table-striped">
//                         <thead className="table-dark">
//                             <tr>
//                                 <th>#</th>
//                                 <th>Model Name</th>
//                                 <th>Model SKU</th>
//                                 <th>Created At</th>
//                                 <th>Updated At</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {models.length > 0 ? (
//                                 models.map((model, index) => (
//                                     <tr key={model._id}>
//                                         <td>{index + 1}</td>
//                                         <td>{model.modelName}</td>
//                                         <td>{model.modelSKU}</td>
//                                         <td>{new Date(model.createdAt).toLocaleString()}</td>
//                                         <td>{new Date(model.updatedAt).toLocaleString()}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="5" className="text-center">
//                                         No data available
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ModelMasterTable;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";

// const ModelMasterTable = () => {
//     const [models, setModels] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleNavigation = () => {
//         navigate("/"); // Navigate to the form route
//     };

//     useEffect(() => {
//         const fetchModels = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/getall');
//                 setModels(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'An error occurred while fetching data.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchModels();
//     }, []);

//     const handleEdit = (id) => {
//         // Navigate to edit form with model ID
//         navigate(`/edit/${id}`);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/delete/${id}`);
//             setModels(models.filter((model) => model._id !== id)); // Update state after deletion
//         } catch (err) {
//             console.error("Error deleting model:", err);
//             setError('Failed to delete the model. Please try again.');
//         }
//     };

//     return (
//         <div className="container mt-5">
//             {/* Back Button */}
//             <div className="d-flex justify-content-start mb-3">
//                 <Button onClick={handleNavigation} variant="primary">
//                     🔙 Back
//                 </Button>
//             </div>
//             <h2 className="mb-4 text-center">Model Master Data</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <div className="alert alert-danger">{error}</div>
//             ) : (
//                 <div className="table-responsive">
//                     <table className="table table-bordered table-striped">
//                         <thead className="table-dark">
//                             <tr>
//                                 <th>#</th>
//                                 <th>Model Name</th>
//                                 <th>Model SKU</th>
//                                 <th>Created At</th>
//                                 <th>Updated At</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {models.length > 0 ? (
//                                 models.map((model, index) => (
//                                     <tr key={model._id}>
//                                         <td>{index + 1}</td>
//                                         <td>{model.modelName}</td>
//                                         <td>{model.modelSKU}</td>
//                                         <td>{new Date(model.createdAt).toLocaleString()}</td>
//                                         <td>{new Date(model.updatedAt).toLocaleString()}</td>
//                                         <td>
//                                             <Button
//                                                 variant="warning"
//                                                 size="sm"
//                                                 className="me-2"
//                                                 onClick={() => handleEdit(model._id)}
//                                             >
//                                                 ✏️ Edit
//                                             </Button>
//                                             <Button
//                                                 variant="danger"
//                                                 size="sm"
//                                                 onClick={() => handleDelete(model._id)}
//                                             >
//                                                 🗑️ Delete
//                                             </Button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="6" className="text-center">
//                                         No data available
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ModelMasterTable;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModelMasterForm from "../src/ModelMasterForm";

const ModelMasterTable = () => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Navigate back to the form
    const handleNavigation = () => {
        navigate("/");
    };


    

    // Fetch all models on component mount
    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getall');
                setModels(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    // Navigate to the edit form with model ID
    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    // Delete a model by ID
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/delete/${id}`);
            setModels(models.filter((model) => model._id !== id)); // Update state after deletion
        } catch (err) {
            console.error("Error deleting model:", err);
            setError('Failed to delete the model. Please try again.');
        }
    };

    const handleRefresh = () => {
        // Refresh the page
        window.location.reload();
      };

       const confirmDelete = (id) => {
    // Show a confirmation dialog before deleting
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      handleDelete(id); // Proceed with the delete if confirmed
    }
  };

    return (
        <div className="container mt-2">

            <ModelMasterForm />
            {/* Back Button */}
            {/* <div className="d-flex justify-content-start mb-3">
                <Button onClick={handleNavigation} variant="primary">
                    Add
                </Button>
            </div> */}

            {/* Table Header */}
            {/* <h2 className="mb-2 mt-2 text-center">Model Master Data</h2> */}
            <div className="row align-items-center mt-2">
                 {/* Align the button on the right */}
        <div className="col-12 col-md-6 text-md-start mt-2 mt-md-0">
          <button className="btn btn-primary" onClick={handleRefresh}>
            Refresh Table
          </button>
        </div>
        {/* Center the heading */}
        <div className="col-12 col-md-6 text-end">
          <h2 className="mb-2 mt-2 ">Model Master Data</h2>
        </div>
       
      </div>
            {/* Display Loading, Error, or Table */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                // <div className="table-responsive">
                //     <table className="table table-bordered table-striped">
                //         <thead className="table-dark">
                //             <tr>
                //                 <th>#</th>
                //                 <th>Model Name</th>
                //                 <th>Model SKU</th>
                //                 <th>Created At</th>
                //                 <th>Updated At</th>
                //                 <th>Actions</th>
                //             </tr>
                //         </thead>
                //         <tbody>
                //             {models.length > 0 ? (
                //                 models.map((model, index) => (
                //                     <tr key={model._id}>
                //                         <td>{index + 1}</td>
                //                         <td>{model.modelName}</td>
                //                         <td>{model.modelSKU}</td>
                //                         <td>{new Date(model.createdAt).toLocaleString()}</td>
                //                         <td>{new Date(model.updatedAt).toLocaleString()}</td>
                //                         <td>
                //                             {/* Edit Button */}
                //                             <Button
                //                                 variant="warning"
                //                                 size="sm"
                //                                 className="me-2"
                //                                 onClick={() => handleEdit(model._id)}
                //                             >
                //                                 ✏️ Edit
                //                             </Button>

                //                             {/* Delete Button */}
                //                             <Button
                //                                 variant="danger"
                //                                 size="sm"
                //                                 onClick={() => handleDelete(model._id)}
                //                             >
                //                                 🗑️ Delete
                //                             </Button>
                //                         </td>
                //                     </tr>
                //                 ))
                //             ) : (
                //                 <tr>
                //                     <td colSpan="6" className="text-center">
                //                         No data available
                //                     </td>
                //                 </tr>
                //             )}
                //         </tbody>
                //     </table>
                // </div>
                <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Model Name</th>
                      <th>Model SKU</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.length > 0 ? (
                      models.map((model, index) => (
                        <tr key={model._id}>
                          <td>{index + 1}</td>
                          <td>{model.modelName}</td>
                          <td>{model.modelSKU}</td>
                          <td>{new Date(model.createdAt).toLocaleString()}</td>
                          <td>{new Date(model.updatedAt).toLocaleString()}</td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {/* Edit Button */}
                              <Button
                                variant="warning"
                                size="sm"
                                className="me-2"
                                onClick={() => handleEdit(model._id)}
                              >
                                ✏️ Edit
                              </Button>
          
                              {/* Delete Button */}
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => confirmDelete(model._id)}
                              >
                                🗑️ Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
        </div>
    );
};

export default ModelMasterTable;
