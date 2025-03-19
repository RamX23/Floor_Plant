// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button, Form, Container, Row, Col } from 'react-bootstrap';

// const LossesDataEntryForm = () => {
//     const { id } = useParams(); // Get ID for edit mode
//     const [model, setModel] = useState('');
//     const [losses, setLosses] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [remark, setRemark] = useState('');
//     const [message, setMessage] = useState('');
//     const [models, setModels] = useState([]);
// const [lossesList, setLossesList] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch Models
//         axios.get('http://localhost:5000/api/model-master/getall')
//             .then((response) => setModels(response.data))
//             .catch((error) => console.error('Error fetching models:', error));

//         // Fetch Losses
//         axios.get('http://localhost:5000/api/losses-master/getall')
//             .then((response) => setLossesList(response.data))
//             .catch((error) => console.error('Error fetching losses:', error));
//     }, []);

//     useEffect(() => {
//         if (id) {
//             // Fetch existing data for editing
//             axios.get(`http://localhost:5000/api/losses-data-entry/get/${id}`)
//                 .then((response) => {
//                     const { model, losses, quantity, remark } = response.data;
//                     setModel(model);
//                     setLosses(losses);
//                     setQuantity(quantity);
//                     setRemark(remark);
//                 })
//                 .catch(() => {
//                     setMessage('Failed to fetch data.');
//                 });
//         }
//     }, [id]);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const payload = { model, losses, quantity, remark };
//         const apiCall = id
//             ? axios.put(`http://localhost:5000/api/losses-data-entry/edit/${id}`, payload)
//             : axios.post('http://localhost:5000/api/losses-data-entry/create', payload);

//         apiCall
//             .then(() => {
//                 setMessage(id ? 'Data updated successfully!' : 'Data added successfully!');
//                 navigate('/losses-data-entry/view'); // Redirect to table view
//             })
//             .catch((error) => {
//                 setMessage(`Error: ${error.response?.data?.message || 'Failed to save data.'}`);
//             });
//     };

//     return (
//         <Container className="mt-5">
//             <h2 className="text-center mb-4">{id ? 'Edit Losses Data Entry' : 'Add Losses Data Entry'}</h2>
//             {message && <div className="alert alert-info">{message}</div>}
//             {/* <Form onSubmit={handleSubmit}>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Model</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={model}
//                                 onChange={(e) => setModel(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Losses</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={losses}
//                                 onChange={(e) => setLosses(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Quantity</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 value={quantity}
//                                 onChange={(e) => setQuantity(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Remark</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={remark}
//                                 onChange={(e) => setRemark(e.target.value)}
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <div className="d-flex justify-content-between">
//                     <Button variant="secondary" onClick={() => navigate('/losses-data-entry/view')}>
//                         Cancel
//                     </Button>
//                     <Button type="submit" variant="primary">
//                         {id ? 'Update' : 'Add'}
//                     </Button>
//                 </div>
//             </Form> */}

// <Form onSubmit={handleSubmit}>
//     <Row>
//         <Col md={6}>
//             <Form.Group className="mb-3">
//                 <Form.Label>Model</Form.Label>
//                 <Form.Select
//                     value={model}
//                     onChange={(e) => setModel(e.target.value)}
//                     required
//                 >
//                     <option value="">Select Model</option>
//                     {models.map((modelOption) => (
//                         <option key={modelOption._id} value={modelOption.name}>
//                             {modelOption.name}
//                         </option>
//                     ))}
//                 </Form.Select>
//             </Form.Group>
//         </Col>
//         <Col md={6}>
//             <Form.Group className="mb-3">
//                 <Form.Label>Losses</Form.Label>
//                 <Form.Select
//                     value={losses}
//                     onChange={(e) => setLosses(e.target.value)}
//                     required
//                 >
//                     <option value="">Select Loss</option>
//                     {lossesList.map((lossOption) => (
//                         <option key={lossOption._id} value={lossOption.name}>
//                             {lossOption.name}
//                         </option>
//                     ))}
//                 </Form.Select>
//             </Form.Group>
//         </Col>
//     </Row>
//     <Row>
//         <Col md={6}>
//             <Form.Group className="mb-3">
//                 <Form.Label>Quantity</Form.Label>
//                 <Form.Control
//                     type="number"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                     required
//                 />
//             </Form.Group>
//         </Col>
//         <Col md={6}>
//             <Form.Group className="mb-3">
//                 <Form.Label>Remark</Form.Label>
//                 <Form.Control
//                     type="text"
//                     value={remark}
//                     onChange={(e) => setRemark(e.target.value)}
//                 />
//             </Form.Group>
//         </Col>
//     </Row>
//     <div className="d-flex justify-content-between">
//         <Button variant="secondary" onClick={() => navigate('/losses-data-entry/view')}>
//             Cancel
//         </Button>
//         <Button type="submit" variant="primary">
//             {id ? 'Update' : 'Add'}
//         </Button>
//     </div>
// </Form>

//         </Container>
//     );
// };

// export default LossesDataEntryForm;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button, Form, Container, Row, Col } from 'react-bootstrap';

// const LossesDataEntryForm = () => {
//     const { id } = useParams(); // Get ID for edit mode
//     const [model, setModel] = useState('');
//     const [losses, setLosses] = useState('');
//     const [minutes, setMinutes] = useState('');
//     const [remark, setRemark] = useState('');
//     const [message, setMessage] = useState('');
//     const [models, setModels] = useState([]);
//     const [lossesList, setLossesList] = useState([]);

//     const navigate = useNavigate();

//    // Fetch models for dropdown
//    useEffect(() => {
//     const fetchModels = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/model-master');
//             setModels(response.data); // Save the models to state
//         } catch (error) {
//             console.error('Error fetching models:', error);
//         }
//     };

// //     fetchModels();
// // }, []);

//         // Fetch Losses for dropdown
//         const fetchLosses = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/losses-master/getall');
//                 setLossesList(response.data);
//             } catch (error) {
//                 console.error('Error fetching losses:', error);
//             }
//         };

//         fetchModels();
//         fetchLosses();
//     }, []);

//     useEffect(() => {
//         if (id) {
//             // Fetch existing data for editing
//             axios.get(`http://localhost:5000/api/losses-data-entry/get/${id}`)
//                 .then((response) => {
//                     const { model, losses, minutes, remark } = response.data;
//                     setModel(model);
//                     setLosses(losses);
//                     setMinutes(minutes);
//                     setRemark(remark);
//                 })
//                 .catch(() => {
//                     setMessage('Failed to fetch data.');
//                 });
//         }
//     }, [id]);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const payload = { model, losses, minutes, remark };
//         const apiCall = id
//             ? axios.put(`http://localhost:5000/api/losses-data-entry/edit/${id}`, payload)
//             : axios.post('http://localhost:5000/api/losses-data-entry/create', payload);

//         apiCall
//             .then(() => {
//                 setMessage(id ? 'Data updated successfully!' : 'Data added successfully!');
//                 navigate('/losses-data-entry/view'); // Redirect to table view
//             })
//             .catch((error) => {
//                 setMessage(`Error: ${error.response?.data?.message || 'Failed to save data.'}`);
//             });
//     };

//     return (
//         <Container className="mt-5">
//             <h2 className="text-center mb-4">{id ? 'Edit Losses Data Entry' : 'Add Losses Data Entry'}</h2>
//             {message && <div className="alert alert-info">{message}</div>}

//             <Form onSubmit={handleSubmit}>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Model</Form.Label>
//                             <Form.Select
//                                 value={model}
//                                 onChange={(e) => setModel(e.target.value)}
//                                 required
//                             >
//                                 <option value="">Select Model</option>
//                                 {models.map((modelOption) => (
//                                     <option key={modelOption._id} value={modelOption.name}>
//                                         {modelOption.name}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Losses</Form.Label>
//                             <Form.Select
//                                 value={losses}
//                                 onChange={(e) => setLosses(e.target.value)}
//                                 required
//                             >
//                                 <option value="">Select Loss</option>
//                                 {lossesList.map((lossOption) => (
//                                     <option key={lossOption._id} value={lossOption.name}>
//                                         {lossOption.name}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Minutes</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 value={minutes}
//                                 onChange={(e) => setMinutes(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Remark</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={remark}
//                                 onChange={(e) => setRemark(e.target.value)}
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <div className="d-flex justify-content-between">
//                     <Button variant="secondary" onClick={() => navigate('/losses-data-entry/view')}>
//                         Cancel
//                     </Button>
//                     <Button type="submit" variant="primary">
//                         {id ? 'Update' : 'Add'}
//                     </Button>
//                 </div>
//             </Form>
//         </Container>
//     );
// };

// export default LossesDataEntryForm;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button, Form, Container, Row, Col } from 'react-bootstrap';

// const LossesDataEntryForm = () => {
//     const { id } = useParams(); // Get ID for edit mode
//     const [model, setModel] = useState('');
//     const [losses, setLosses] = useState('');
//     const [minutes, setMinutes] = useState('');
//     const [remark, setRemark] = useState('');
//     const [message, setMessage] = useState('');
//     const [models, setModels] = useState([]);
//     const [lossesList, setLossesList] = useState([]);

//     const navigate = useNavigate();

//     // useEffect(() => {

//     //     // Fetch Models for dropdown
//     //     const fetchModels = async () => {
//     //         try {
//     //             const response = await axios.get('http://localhost:5000/api/model-master/getall');
//     //             setModels(response.data);
//     //         } catch (error) {
//     //             console.error('Error fetching models:', error);
//     //         }
//     //     };

//     //     // Fetch Losses for dropdown
//     //     const fetchLosses = async () => {
//     //         try {
//     //             const response = await axios.get('http://localhost:5000/api/losses-master/getall');
//     //             setLossesList(response.data);
//     //         } catch (error) {
//     //             console.error('Error fetching losses:', error);
//     //         }
//     //     };

//     //     fetchModels();
//     //     fetchLosses();
//     // }, []);

//      // Fetch models for dropdown
//      useEffect(() => {
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

//     useEffect(() => {
//         const fetchLosses = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/losses-master/getall');
//                 setLossesList(response.data); // Assuming `response.data` contains an array of losses
//             } catch (error) {
//                 setMessage('Error fetching losses data.');
//                 console.error('Error fetching losses data:', error);
//             }
//         };

//         fetchLosses();
//     }, []);

//     useEffect(() => {
//         if (id) {
//             // Fetch existing data for editing
//             axios.get(`http://localhost:5000/api/losses-data-entry/get/${id}`)
//                 .then((response) => {
//                     const { model, losses, minutes, remark } = response.data;
//                     setModel(model);
//                     setLosses(losses);
//                     setMinutes(minutes);
//                     setRemark(remark);
//                 })
//                 .catch(() => {
//                     setMessage('Failed to fetch data.');
//                 });
//         }
//     }, [id]);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const payload = { model, losses, minutes, remark };
//         const apiCall = id
//             ? axios.put(`http://localhost:5000/api/losses-data-entry/edit/${id}`, payload)
//             : axios.post('http://localhost:5000/api/losses-data-entry/create', payload);

//         apiCall
//             .then(() => {
//                 setMessage(id ? 'Data updated successfully!' : 'Data added successfully!');
//                 navigate('/losses-data-entry/view'); // Redirect to table view
//             })
//             .catch((error) => {
//                 setMessage(`Error: ${error.response?.data?.message || 'Failed to save data.'}`);
//             });
//     };

//     return (
//         <Container className="mt-5">
//             <h2 className="text-center mb-4">{id ? 'Edit Losses Data Entry' : 'Add Losses Data Entry'}</h2>
//             {message && <div className="alert alert-info">{message}</div>}

//             <Form onSubmit={handleSubmit}>
//                 <Row>
//                     <Col md={6}>
//                          <Form.Group className="mb-3">
//                                                     <Form.Label>Model</Form.Label>
//                                                     <Form.Select
//                                                         value={model}
//                                                         onChange={(e) => setModel(e.target.value)}
//                                                         required
//                                                     >
//                                                         <option value="">Select Model</option>
//                                                         {models.map((modelOption) => (
//                                                             <option key={modelOption._id} value={modelOption.modelName}>
//                                                                 {modelOption.modelName}
//                                                             </option>
//                                                         ))}
//                                                     </Form.Select>
//                                                 </Form.Group>
//                     </Col>
//                     <Col md={6}>
//     <Form.Group className="mb-3">
//         <Form.Label>Losses</Form.Label>
//         <Form.Select
//             value={losses}
//             onChange={(e) => setLosses(e.target.value)}
//             required
//         >
//             <option value="">Select Loss</option>
//             {lossesList.map((loss) => (
//                 <option key={loss._id} value={loss.lossesname}>
//                     {loss.lossesName}
//                 </option>
//             ))}
//         </Form.Select>
//     </Form.Group>
// </Col>

//                 </Row>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Minutes</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 value={minutes}
//                                 onChange={(e) => setMinutes(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Remark</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={remark}
//                                 onChange={(e) => setRemark(e.target.value)}
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <div className="d-flex justify-content-between">
//                     <Button variant="secondary" onClick={() => navigate('/losses-data-entry/view')}>
//                         Cancel
//                     </Button>
//                     <Button type="submit" variant="primary">
//                         {id ? 'Update' : 'Add'}
//                     </Button>
//                 </div>
//             </Form>
//         </Container>
//     );
// };

// export default LossesDataEntryForm;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const LossesDataEntryForm = () => {
  const { id } = useParams(); // Get ID for edit mode
  const [model, setModel] = useState("");
  const [losses, setLosses] = useState("");
  const [minutes, setMinutes] = useState("");
  const [remark, setRemark] = useState("");
  const [shift, setShift] = useState("");
  const [department, setDepartment] = useState("");
  const [line, setLine] = useState("");
  const [message, setMessage] = useState("");
  const [models, setModels] = useState([]);
  const [lossesList, setLossesList] = useState([]);

  const navigate = useNavigate();

  // Fetch models for dropdown
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/model-master"
        );
        setModels(response.data); // Save the models to state
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, []);

  // Fetch Losses for dropdown
  useEffect(() => {
    const fetchLosses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/losses-master/getall"
        );
        setLossesList(response.data); // Save the losses to state
      } catch (error) {
        setMessage("Error fetching losses data.");
        console.error("Error fetching losses data:", error);
      }
    };

    fetchLosses();
  }, []);

  // Fetch existing data for editing
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/losses-data-entry/get/${id}`)
        .then((response) => {
          const { modelName, shift, lossesName, minutes,department,line, remark } = response.data;
          setModel(modelName);
          setLosses(lossesName);
          setMinutes(minutes);
          setShift(shift);
          setDepartment(department);
          setLine(line);
          setRemark(remark);

        })
        .catch(() => {
          setMessage("Failed to fetch data.");
        });
    }
  }, [id]);

  // const handleSubmit = (e) => {
  //     e.preventDefault();

  //     // Ensure all required fields are provided
  //     if (!model || !losses || !minutes) {
  //         setMessage('Model, Losses, and Minutes are required.');
  //         return;
  //     }

  //     const payload = { modelName: model, lossesName: losses, minutes, remark };

  //     const apiCall = id
  //         ? axios.put(`http://localhost:5000/api/losses-data-entry/edit/${id}`, payload)
  //         : axios.post('http://localhost:5000/api/losses-data-entry/create', payload);

  //     apiCall
  //         .then(() => {
  //             setMessage(id ? 'Data updated successfully!' : 'Data added successfully!');
  //             navigate('/losses-data-entry/view'); // Redirect to table view
  //         })
  //         .catch((error) => {
  //             setMessage(`Error: ${error.response?.data?.message || 'Failed to save data.'}`);
  //             console.error('Error during save operation:', error);
  //         });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { model, losses, shift, minutes, department, line, remark };
    const apiCall = id
      ? axios.put(
          `http://localhost:5000/api/losses-data-entry/edit/${id}`,
          payload
        )
      : axios.post(
          "http://localhost:5000/api/losses-data-entry/create",
          payload
        );

    apiCall
      .then(() => {
        setMessage(
          id ? "Data updated successfully!" : "Data added successfully!"
        );
        navigate("/losses-data-entry/view"); // Redirect to table view
      })
      .catch((error) => {
        setMessage(
          `Error: ${error.response?.data?.message || "Failed to save data."}`
        );
      });
  };
  return (
    <Container className="mt-0 bg-light p-2 shadow-sm">
      <h2 className="text-center mb-1">
        {id ? "Edit Losses Data Entry" : " Losses Data Entry"}
      </h2>
      {message && <div className="alert alert-info">{message}</div>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
              <Form.Label>Losses</Form.Label>
              <Form.Select
                value={losses}
                onChange={(e) => setLosses(e.target.value)}
                required
              >
                <option value="">Select Loss</option>
                {lossesList.map((loss) => (
                  <option key={loss._id} value={loss.lossesName}>
                    {loss.lossesName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
             <Form.Group className="mb-3">
                 <Form.Label>Department</Form.Label>
                 <Form.Select
                     value={department}
                     onChange={(e) => setDepartment(e.target.value)}
                    //  required
                 >
                     <option value="">Select local</option>
                     <option value="local 1">local 1</option>
                     <option value="local 2">local 2</option>
                     <option value="local 3">local 3</option>
                 </Form.Select>
             </Form.Group>
         </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Minutes</Form.Label>
              <Form.Control
                type="number"
                value={minutes}
                placeholder="Enter Minutes"
                onChange={(e) => setMinutes(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
             <Form.Group className="mb-3">
                 <Form.Label>Line</Form.Label>
                 <Form.Select
                     value={line}
                     onChange={(e) => setLine(e.target.value)}
                    //  required
                 >
                     <option value="">Select line</option>
                     <option value="line 1">line 1</option>
                     <option value="line 2">line 2</option>
                     <option value="line 3">line 3</option>
                 </Form.Select>
             </Form.Group>
         </Col>

         
          <Col md={3}>
             <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
              <Form.Label>Remark</Form.Label>
              <Form.Control
                type="text"
                value={remark}
                placeholder="Enter Remark"
                onChange={(e) => setRemark(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-start g-2">
          {/* <Button variant="secondary" onClick={() => navigate('/losses-data-entry/view')}>
                        Cancel
                    </Button> */}
          <Button type="submit" variant="primary">
            {id ? "Update" : "Add"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default LossesDataEntryForm;
