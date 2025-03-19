import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Table, Spinner, Button, Form } from "react-bootstrap";


const ModelMasterForm = () => {
    const [modelName, setModelName] = useState('');
    const [modelSKU, setModelSKU] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/model-master', {
                modelName,
                modelSKU,
            });

            setMessage(`Model created successfully: ${response.data.modelName}`);
            setModelName('');
            setModelSKU('');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'An unexpected error occurred';
            setMessage(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleView = () => {
        navigate('/view'); // Navigate to the '/view' route
      };
      

    return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-6">
//                     <div className="card shadow-sm">
//                         <div className="card-body">
//                             <h2 className="card-title text-center mb-4">Create Model Master</h2>
//                              {/* Navigate to Charts Page Button */}
//                              <Col md={6} className="text-start mb-3">
//   <Button onClick={handleView} variant="primary">
//      View More
//   </Button>
// </Col>

//                             {message && <div className="alert alert-info">{message}</div>}
//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-3">
//                                     <label htmlFor="modelName" className="form-label">
//                                         Model Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="modelName"
//                                         value={modelName}
//                                         onChange={(e) => setModelName(e.target.value)}
//                                         required
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="modelSKU" className="form-label">
//                                         Model SKU
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="modelSKU"
//                                         value={modelSKU}
//                                         onChange={(e) => setModelSKU(e.target.value)}
//                                         required
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="d-grid">
//                                     <button type="submit" className="btn btn-primary" disabled={loading}>
//                                         {loading ? 'Submitting...' : 'Submit'}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

<Container className="mt-0">
<div className="shadow-sm p-4 bg-light rounded">
  <h4 className="text-start mb-2"> Model Master</h4>
 

  {/* Navigate to Charts Page Button */}
  {/* <div className="mb-4 text-start">
    <Button onClick={handleView} variant="primary">
      View More
    </Button>
  </div> */}

  {/* Show message if exists */}
  {message && <div className="alert alert-info">{message}</div>}

  {/* Form */}
  <Form onSubmit={handleSubmit}>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="modelName">
          <Form.Label>Model Name</Form.Label>
          <Form.Control
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            placeholder="Enter Model Name"
            required
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="modelSKU">
          <Form.Label>Model SKU</Form.Label>
          <Form.Control
            type="text"
            value={modelSKU}
            onChange={(e) => setModelSKU(e.target.value)}
            placeholder="Enter Model SKU"
            required
          />
        </Form.Group>
      </Col>
    </Row>

    {/* Submit Button */}
    <div className="d-flex justify-content-start">
      <Button type="submit" variant="primary" disabled={loading} className="me-2">
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
      {/* <Button variant="secondary" onClick={() => window.history.back()}>
        Cancel
      </Button> */}
    </div>
  </Form>
</div>
</Container>
    );
};

export default ModelMasterForm;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button } from 'react-bootstrap';

// const EditModelForm = () => {
//     const { id } = useParams(); // Get the model ID from the URL
//     const [modelName, setModelName] = useState('');
//     const [modelSKU, setModelSKU] = useState('');
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchModel = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/get/${id}`);
//                 const { modelName, modelSKU } = response.data;
//                 setModelName(modelName);
//                 setModelSKU(modelSKU);
//             } catch (error) {
//                 setMessage('Error fetching model data.');
//             }
//         };

//         fetchModel();
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             await axios.put(`http://localhost:5000/api/update/${id}`, {
//                 modelName,
//                 modelSKU,
//             });

//             setMessage('Model updated successfully!');
//             navigate('/view'); // Redirect to the table view after successful edit
//         } catch (error) {
//             const errorMsg = error.response?.data?.message || 'An unexpected error occurred';
//             setMessage(`Error: ${errorMsg}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-6">
//                     <div className="card shadow-sm">
//                         <div className="card-body">
//                             <h2 className="card-title text-center mb-4">Edit Model Master</h2>
//                             {message && <div className="alert alert-info">{message}</div>}
//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-3">
//                                     <label htmlFor="modelName" className="form-label">
//                                         Model Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="modelName"
//                                         value={modelName}
//                                         onChange={(e) => setModelName(e.target.value)}
//                                         required
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="modelSKU" className="form-label">
//                                         Model SKU
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="modelSKU"
//                                         value={modelSKU}
//                                         onChange={(e) => setModelSKU(e.target.value)}
//                                         required
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="d-grid">
//                                     <button type="submit" className="btn btn-success" disabled={loading}>
//                                         {loading ? 'Updating...' : 'Update'}
//                                     </button>
//                                 </div>
//                                 <div className="mt-3 text-center">
//                                     <Button variant="secondary" onClick={() => navigate('/view')}>
//                                         Cancel
//                                     </Button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditModelForm;
