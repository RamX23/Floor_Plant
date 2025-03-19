import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';

const DefectMasterForm = () => {
    const { id } = useParams(); // Get the defect ID from the URL
    const [defectName, setDefectName] = useState('');
    const [defectType, setDefectType] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data only in Edit mode
        if (id) {
            const fetchDefect = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/defect-master/get/${id}`);
                    const { defectName, defectType } = response.data;
                    setDefectName(defectName);
                    setDefectType(defectType);
                } catch (error) {
                    setMessage('Error fetching defect data.');
                }
            };

            fetchDefect();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (id) {
                // Edit mode
                await axios.put(`http://localhost:5000/api/defect-master/edit/${id}`, {
                    defectName,
                    defectType,
                });
                setMessage('Defect updated successfully!');
            } else {
                // Add mode
                await axios.post('http://localhost:5000/api/defect-master', {
                    defectName,
                    defectType,
                });
                setMessage('Defect added successfully!');
                setDefectName('');
                setDefectType('');
            }
            navigate('/defect-master'); // Redirect to the table view after successful submission
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'An unexpected error occurred';
            setMessage(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        // <div className="container mt-5">
        //     <div className="row justify-content-center">
        //         <div className="col-md-6">
        //             <div className="card shadow-sm">
        //                 <div className="card-body">
        //                     <h2 className="card-title text-center mb-4">
        //                         {id ? 'Edit Defect Master' : 'Add Defect Master'}
        //                     </h2>
        //                     {message && <div className="alert alert-info">{message}</div>}
        //                     <form onSubmit={handleSubmit}>
        //                         <div className="mb-3">
        //                             <label htmlFor="defectName" className="form-label">
        //                                 Defect Name
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 id="defectName"
        //                                 value={defectName}
        //                                 onChange={(e) => setDefectName(e.target.value)}
        //                                 required
        //                                 className="form-control"
        //                             />
        //                         </div>
        //                         <div className="mb-3">
        //                             <label htmlFor="defectType" className="form-label">
        //                                 Defect Type
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 id="defectType"
        //                                 value={defectType}
        //                                 onChange={(e) => setDefectType(e.target.value)}
        //                                 required
        //                                 className="form-control"
        //                             />
        //                         </div>
        //                         <div className="d-grid">
        //                             <button type="submit" className="btn btn-primary" disabled={loading}>
        //                                 {loading ? (id ? 'Updating...' : 'Submitting...') : id ? 'Update' : 'Submit'}
        //                             </button>
        //                         </div>
        //                         <div className="mt-3 text-center">
        //                             <Button variant="secondary" onClick={() => navigate('/defect-master/view')}>
        //                                 Back to List
        //                             </Button>
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>


        <Container className="mt-2">
      <div className="shadow-sm p-4 bg-light rounded">
        <h4 className="mb-4 text-start">{id ? 'Edit Defect Master' : ' Defect Master'}</h4>
        {message && <div className="alert alert-info">{message}</div>}

        {/* Form */}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="defectName">
                <Form.Label>Defect Name</Form.Label>
                <Form.Control
                  type="text"
                  value={defectName}
                  onChange={(e) => setDefectName(e.target.value)}
                  placeholder="Enter Defect Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="defectType">
                <Form.Label>Defect Type</Form.Label>
                <Form.Control
                  type="text"
                  value={defectType}
                  onChange={(e) => setDefectType(e.target.value)}
                  placeholder="Enter Defect Type"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Buttons */}
          <Row className="mt-4">
            <Col md={2}>
              <Button type="submit" variant="primary" disabled={loading} className="w-100">
                {loading ? (id ? 'Updating...' : 'Submitting...') : id ? 'Update' : 'Add Defect'}
              </Button>
            </Col>
            {/* <Col md={2}>
              <Button variant="secondary" onClick={() => navigate('/defect-master')} className="w-100">
                Back to List
              </Button>
            </Col> */}
          </Row>
        </Form>
      </div>
    </Container>
    );
};

export default DefectMasterForm;
