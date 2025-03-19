// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button, Form, Container, Row, Col } from 'react-bootstrap';

// const DefectDataEntryForm = () => {
//     const { id } = useParams(); // Get the ID from the URL if editing
//     const navigate = useNavigate();
//     const [model, setModel] = useState('');
//     const [defect, setDefect] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [remark, setRemark] = useState('');
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         // Fetch data if editing
//         if (id) {
//             const fetchData = async () => {
//                 try {
//                     const response = await axios.get(`http://localhost:5000/api/defect-data-entry/get/${id}`);
//                     const { model, defect, quantity, remark } = response.data;
//                     setModel(model);
//                     setDefect(defect);
//                     setQuantity(quantity);
//                     setRemark(remark);
//                 } catch (error) {
//                     setMessage('Error fetching defect data.');
//                 }
//             };

//             fetchData();
//         }
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const defectData = { model, defect, quantity, remark };

//         try {
//             if (id) {
//                 // Update entry
//                 await axios.put(`http://localhost:5000/api/defect-data-entry/edit/${id}`, defectData);
//                 setMessage('Defect data updated successfully!');
//             } else {
//                 // Create entry
//                 await axios.post('http://localhost:5000/api/defect-data-entry/create', defectData);
//                 setMessage('Defect data added successfully!');
//                 setModel('');
//                 setDefect('');
//                 setQuantity('');
//                 setRemark('');
//             }

//             setTimeout(() => navigate('/defect-data-entry/view'), 1500); // Redirect after success
//         } catch (error) {
//             const errorMsg = error.response?.data?.message || 'An unexpected error occurred';
//             setMessage(`Error: ${errorMsg}`);
//         }
//     };

//     return (
//         <Container className="mt-5">
//             <Row>
//                 <Col md={{ span: 6, offset: 3 }}>
//                     <h2 className="text-center mb-4">{id ? 'Edit Defect Data' : 'Add Defect Data'}</h2>
//                     {message && <div className="alert alert-info">{message}</div>}
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Model</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={model}
//                                 onChange={(e) => setModel(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Defect</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={defect}
//                                 onChange={(e) => setDefect(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Quantity</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 value={quantity}
//                                 onChange={(e) => setQuantity(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Remark</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={remark}
//                                 onChange={(e) => setRemark(e.target.value)}
//                             />
//                         </Form.Group>
//                         <div className="d-flex justify-content-between">
//                             <Button variant="primary" type="submit">
//                                 {id ? 'Update' : 'Add'}
//                             </Button>
//                             <Button variant="secondary" onClick={() => navigate('/defect-data-entry/view')}>
//                                 Cancel
//                             </Button>
//                         </div>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default DefectDataEntryForm;


// 1 dd 
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button, Form, Container, Row, Col } from 'react-bootstrap';

// const DefectDataEntryForm = () => {
//     const { id } = useParams(); // Get the ID from the URL if editing
//     const navigate = useNavigate();
//     const [model, setModel] = useState('');
//     const [defect, setDefect] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [remark, setRemark] = useState('');
//     const [message, setMessage] = useState('');
//     const [models, setModels] = useState([]); // State to store models for dropdown

//     // Fetch models for dropdown
//     useEffect(() => {
//         const fetchModels = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/model-master');
//                 setModels(response.data); // Save the models to state
//             } catch (error) {
//                 console.error('Error fetching models:', error);
//             }
//         };

//         fetchModels();
//     }, []);

//     // Fetch data if editing
//     useEffect(() => {
//         if (id) {
//             const fetchData = async () => {
//                 try {
//                     const response = await axios.get(`http://localhost:5000/api/defect-data-entry/get/${id}`);
//                     const { model, defect, quantity, remark } = response.data;
//                     setModel(model);
//                     setDefect(defect);
//                     setQuantity(quantity);
//                     setRemark(remark);
//                 } catch (error) {
//                     setMessage('Error fetching defect data.');
//                 }
//             };

//             fetchData();
//         }
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const defectData = { model, defect, quantity, remark };

//         try {
//             if (id) {
//                 // Update entry
//                 await axios.put(`http://localhost:5000/api/defect-data-entry/edit/${id}`, defectData);
//                 setMessage('Defect data updated successfully!');
//             } else {
//                 // Create entry
//                 await axios.post('http://localhost:5000/api/defect-data-entry/create', defectData);
//                 setMessage('Defect data added successfully!');
//                 setModel('');
//                 setDefect('');
//                 setQuantity('');
//                 setRemark('');
//             }

//             setTimeout(() => navigate('/defect-data-entry/view'), 1500); // Redirect after success
//         } catch (error) {
//             const errorMsg = error.response?.data?.message || 'An unexpected error occurred';
//             setMessage(`Error: ${errorMsg}`);
//         }
//     };

//     return (
//         <Container className="mt-5">
//             <Row>
//                 <Col md={{ span: 6, offset: 3 }}>
//                     <h2 className="text-center mb-4">{id ? 'Edit Defect Data' : 'Add Defect Data'}</h2>
//                     {message && <div className="alert alert-info">{message}</div>}
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Model</Form.Label>
//                             <Form.Select
//                                 value={model}
//                                 onChange={(e) => setModel(e.target.value)}
//                                 required
//                             >
//                                 <option value="">Select Model</option>
//                                 {models.map((modelOption) => (
//                                     <option key={modelOption._id} value={modelOption.modelName}>
//                                         {modelOption.modelName}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Defect</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={defect}
//                                 onChange={(e) => setDefect(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Quantity</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 value={quantity}
//                                 onChange={(e) => setQuantity(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Remark</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={remark}
//                                 onChange={(e) => setRemark(e.target.value)}
//                             />
//                         </Form.Group>
//                         <div className="d-flex justify-content-between">
//                             <Button variant="primary" type="submit">
//                                 {id ? 'Update' : 'Add'}
//                             </Button>
//                             <Button variant="secondary" onClick={() => navigate('/defect-data-entry/view')}>
//                                 Cancel
//                             </Button>
//                         </div>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default DefectDataEntryForm;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const DefectDataEntryForm = () => {
    const { id } = useParams(); // Get the ID from the URL if editing
    const navigate = useNavigate();
    const [model, setModel] = useState('');
    const [defect, setDefect] = useState('');
    const [quantity, setQuantity] = useState('');
    const [remark, setRemark] = useState('');
    const [message, setMessage] = useState('');
    const [models, setModels] = useState([]); // State to store models for dropdown
    const [defects, setDefects] = useState([]); // State to store defects for dropdown
     const [shift, setShift] = useState('');
     const [department, setDepartment] = useState('');
     const [line, setLine] = useState('');
     const [timestamp, setTimestamp] = useState('');
    // Fetch models for dropdown
    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/model-master');
                setModels(response.data); // Save the models to state
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };

        fetchModels();
    }, []);

    // Fetch defects for dropdown
    // useEffect(() => {
    //     const fetchDefects = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/api/defect-master');
    //             setDefects(response.data); // Save the defects to state
    //         } catch (error) {
    //             console.error('Error fetching defects:', error);
    //         }
    //     };

    //     fetchDefects();
    // }, []);
    useEffect(() => {
        const fetchDefects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/defect-master/getall');
                console.log('Defects API Response:', response.data); // Debug the response
                setDefects(response.data); // Save the defects to state
            } catch (error) {
                console.error('Error fetching defects:', error);
            }
        };
        fetchDefects();
    }, []);


    // Fetch data if editing
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/defect-data-entry/get/${id}`);
                    const { model, defect, shift, quantity, department, line, timestamp, remark } = response.data;
                    
                    setModel(model);
                    setDefect(defect);
                    setShift(shift);
                    setQuantity(quantity);
                    setDepartment(department);
                    setLine(line);
                    setTimestamp(timestamp);
                    setRemark(remark);

                } catch (error) {
                    setMessage('Error fetching defect data.');
                }
            };

            fetchData();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const defectData = { model, defect, shift, quantity, department, line, remark,timestamp };

        // console.log(timestamp);

        try {
            if (id) {
                // Update entry
                await axios.put(`http://localhost:5000/api/defect-data-entry/edit/${id}`, defectData);
                setMessage('Defect data updated successfully!');
            } else {
                // Create entry
                await axios.post('http://localhost:5000/api/defect-data-entry/create', defectData);
                setMessage('Defect data added successfully!');
                setModel('');
                setDefect('');
                setShift('');
                setQuantity('');
                setDepartment('');
                setLine('');
                setTimestamp('');
                setRemark('');

            }

            setTimeout(() => navigate('/defect-data-entry/view'), 1500); // Redirect after success
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'An unexpected error occurred';
            setMessage(`Error: ${errorMsg}`);
        }
    };

    return (
        // <Container className="mt-5">
        //     <Row>
        //         <Col md={{ span: 6, offset: 3 }}>
        //             <h2 className="text-center mb-4">{id ? 'Edit Defect Data' : 'Add Defect Data'}</h2>
        //             {message && <div className="alert alert-info">{message}</div>}
        //             <Form onSubmit={handleSubmit}>
        //                 <Form.Group className="mb-3">
        //                     <Form.Label>Model</Form.Label>
        //                     <Form.Select
        //                         value={model}
        //                         onChange={(e) => setModel(e.target.value)}
        //                         required
        //                     >
        //                         <option value="">Select Model</option>
        //                         {models.map((modelOption) => (
        //                             <option key={modelOption._id} value={modelOption.modelName}>
        //                                 {modelOption.modelName}
        //                             </option>
        //                         ))}
        //                     </Form.Select>
        //                 </Form.Group>
        //                 <Form.Group className="mb-3">
        //                     <Form.Label>Defect</Form.Label>
        //                     <Form.Select
        //                         value={defect}
        //                         onChange={(e) => setDefect(e.target.value)}
        //                         required
        //                     >
        //                         <option value="">Select Defect</option>
        //                         {defects.map((defectOption) => (
        //                             <option key={defectOption._id} value={defectOption.defectName}>
        //                                 {defectOption.defectName}
        //                             </option>
        //                         ))}
        //                     </Form.Select>
        //                 </Form.Group>
        //                 <Form.Group className="mb-3">
        //                     <Form.Label>Quantity</Form.Label>
        //                     <Form.Control
        //                         type="number"
        //                         value={quantity}
        //                         onChange={(e) => setQuantity(e.target.value)}
        //                         required
        //                     />
        //                 </Form.Group>
        //                 <Form.Group className="mb-3">
        //                     <Form.Label>Remark</Form.Label>
        //                     <Form.Control
        //                         type="text"
        //                         value={remark}
        //                         onChange={(e) => setRemark(e.target.value)}
        //                     />
        //                 </Form.Group>
        //                 <div className="d-flex justify-content-between">
        //                     <Button variant="primary" type="submit">
        //                         {id ? 'Update' : 'Add'}
        //                     </Button>
        //                     <Button variant="secondary" onClick={() => navigate('/defect-data-entry/view')}>
        //                         Cancel
        //                     </Button>
        //                 </div>
        //             </Form>
        //         </Col>
        //     </Row>
        // </Container>


        <Container className="mt-2">
        <div className="shadow-sm p-4 bg-light rounded">
          <h4 className="text-start mb-4">{id ? 'Edit Defect Data' : ' Defect Data'}</h4>
          {message && <div className="alert alert-info">{message}</div>}
  
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="model">
                  <Form.Label>Model</Form.Label>
                  <Form.Select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                  >
                    <option value="">Select Model</option>
                    {models.map((modelOption) => (
                      <option key={modelOption._id} value={modelOption.modelName}>
                        {modelOption.modelName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="defect">
                  <Form.Label>Defect</Form.Label>
                  <Form.Select
                    value={defect}
                    onChange={(e) => setDefect(e.target.value)}
                    required
                  >
                    <option value="">Select Defect</option>
                    {defects.map((defectOption) => (
                      <option key={defectOption._id} value={defectOption.defectName}>
                        {defectOption.defectName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
    <Form.Group controlId="line">
        <Form.Label>Line</Form.Label>
        <Form.Select value={line} onChange={(e) => setLine(e.target.value)} required>
            <option value="">Select Line</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
        </Form.Select>
    </Form.Group>
</Col>


<Col md={3}>
    <Form.Group className="shift">
        <Form.Label>Shift</Form.Label>
        <Form.Select
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            required
        >
            <option value="">Select Shift</option>
            <option value="Shift 1">Shift 1</option>
            <option value="Shift 2">Shift 2</option>
            <option value="Shift 3">Shift 3</option>
        </Form.Select>
    </Form.Group>
</Col>
              <Col md={3}>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    placeholder="Enter Quantity"
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="department">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    placeholder="Enter Department"
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="dateandtime">
                  <Form.Label>Date and Time</Form.Label>
                  <Form.Control
                    type="date"
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                    placeholder="Enter Date and Time"
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="remark">
                  <Form.Label>Remark</Form.Label>
                  <Form.Control
                    type="text"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Enter Remark"
                  />
                </Form.Group>
              </Col>
            </Row>
  
            {/* <Row className="mb-4">
              <Col md={3}>
                <Form.Group controlId="remark">
                  <Form.Label>Remark</Form.Label>
                  <Form.Control
                    type="text"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Enter Remark"
                  />
                </Form.Group>
              </Col>
            </Row> */}
  
            <Row>
              <Col md={3}>
                <Button type="submit" variant="primary" className="w-100">
                  {id ? 'Update' : 'Add Defect'}
                </Button>
              </Col>
              <Col md={3}>
                <Button
                  variant="secondary"
                  className="w-100"
                  onClick={() => navigate('/defect-data-entry/view')}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    );
};

export default DefectDataEntryForm;
