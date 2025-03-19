import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Spinner, Button, Form } from "react-bootstrap";

const LossesMasterForm = () => {
    const [lossesName, setLossesName] = useState('');
    const [lossesType, setLossesType] = useState('');
    const [message, setMessage] = useState('');
    const { id } = useParams(); // Get ID from URL for editing
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Fetch existing data for editing
            const fetchLoss = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/losses-master/get/${id}`);
                    setLossesName(response.data.lossesName);
                    setLossesType(response.data.lossesType);
                } catch (error) {
                    setMessage('Error fetching loss data.');
                }
            };
            fetchLoss();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                // Update existing loss
                await axios.put(`http://localhost:5000/api/losses-master/edit/${id}`, {
                    lossesName,
                    lossesType,
                });
                setMessage('Loss updated successfully!');
            } else {
                // Create new loss
                await axios.post('http://localhost:5000/api/losses-master/', {
                    lossesName,
                    lossesType,
                });
                setMessage('Loss added successfully!');
            }
            navigate('/losses-master/view'); // Redirect to table view
        } catch (error) {
            setMessage('Error: ' + error.response?.data?.message || 'An unexpected error occurred.');
        }
    };
    const handleView = () => {
        navigate('/losses-master/view'); // Navigate to the '/view' route
      };

    return (
//         <div className="container mt-5">
//              {/* Navigate to Charts Page Button */}
//              <Col md={6} className="text-start mb-3">
//   <Button onClick={handleView} variant="primary">
//      View More
//   </Button>
// </Col>
//             <h2 className="text-center">{id ? 'Edit Losses Master' : 'Add Losses Master'}</h2>
//             {message && <div className="alert alert-info">{message}</div>}
//             {/* <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="lossesName" className="form-label">Losses Name</label>
//                     <input
//                         type="text"
//                         id="lossesName"
//                         value={lossesName}
//                         onChange={(e) => setLossesName(e.target.value)}
//                         required
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="lossesType" className="form-label">Losses Type</label>
//                     <input
//                         type="text"
//                         id="lossesType"
//                         value={lossesType}
//                         onChange={(e) => setLossesType(e.target.value)}
//                         required
//                         className="form-control"
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                     {id ? 'Update' : 'Add'}
//                 </button>
//             </form> */}

// <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
//         <Row className="mb-3">
//           <Col md={8}>
//             <Form.Group controlId="lossesName">
//               <Form.Label>Losses Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={lossesName}
//                 onChange={(e) => setLossesName(e.target.value)}
//                 placeholder="Enter losses name"
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row className="mb-3">
//           <Col md={8}>
//             <Form.Group controlId="lossesType">
//               <Form.Label>Losses Type</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={lossesType}
//                 onChange={(e) => setLossesType(e.target.value)}
//                 placeholder="Enter losses type"
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <div className="d-flex justify-content-between">
//           <Button type="submit" variant="primary">
//             {id ? 'Update' : 'Add'}
//           </Button>
//           <Button variant="secondary" onClick={() => window.history.back()}>
//             Cancel
//           </Button>
//         </div>
//       </Form>
//         </div>


<Container className="mt-2">

<div className="mt-5 d-flex justify-content-center">
  <div className="col-md-8 p-4 border rounded shadow-sm bg-light">
    {/* Navigate to Charts Page Button */}
    {/* <Col md={6} className="text-start mb-3">
      <Button onClick={handleView} variant="primary">
        View More
      </Button>
    </Col> */}
    <h2 className="text-center">{id ? 'Edit Losses Master' : ' Losses Master'}</h2>
    {message && <div className="alert alert-info">{message}</div>}

    {/* Form */}
    {/* <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="lossesName">
            <Form.Label>Losses Name</Form.Label>
            <Form.Control
              type="text"
              value={lossesName}
              onChange={(e) => setLossesName(e.target.value)}
              placeholder="Enter losses name"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="lossesType">
            <Form.Label>Losses Type</Form.Label>
            <Form.Control
              type="text"
              value={lossesType}
              onChange={(e) => setLossesType(e.target.value)}
              placeholder="Enter losses type"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="d-flex justify-content-between">
        <Button type="submit" variant="primary">
          {id ? 'Update' : 'Add'}
        </Button>
        <Button variant="secondary" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>
    </Form> */}

<Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="lossesName">
                  <Form.Label>Losses Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lossesName}
                    onChange={(e) => setLossesName(e.target.value)}
                    placeholder="Enter losses name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lossesType">
                  <Form.Label>Losses Type</Form.Label>
                  <Form.Control
                    type="text"
                    value={lossesType}
                    onChange={(e) => setLossesType(e.target.value)}
                    placeholder="Enter losses type"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={2}>
                <Button type="submit" variant="primary" className="w-100">
                  {id ? 'Update' : 'Add'}
                </Button>
              </Col>
              <Col md={2}>
                <Button
                  variant="secondary"
                  className="w-100"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
  </div>
</div>

</Container>





    );
};

export default LossesMasterForm;
