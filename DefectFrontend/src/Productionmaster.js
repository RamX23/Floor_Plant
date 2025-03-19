// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

// const ProductionMasterPage = () => {
//     const [entries, setEntries] = useState([]);
//     const [modelName, setModelName] = useState('');
//     const [shift, setShift] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [remark, setRemark] = useState('');
//     const [editingId, setEditingId] = useState(null); // ID of the entry being edited
//     const [message, setMessage] = useState('');

//     // Fetch all entries
//     const fetchEntries = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/production-master/getall');
//             setEntries(response.data);
//         } catch (error) {
//             setMessage('Error fetching data.');
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchEntries();
//     }, []);

    

//     // Handle form submission for Add/Edit
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!modelName || !shift || !quantity) {
//             setMessage('Model Name, Shift, and Quantity are required.');
//             return;
//         }

//         const payload = { modelName, shift, quantity, remark };

//         try {
//             if (editingId) {
//                 // Update entry
//                 await axios.put(`http://localhost:5000/api/production-master/update/${editingId}`, payload);
//                 setMessage('Entry updated successfully!');
//             } else {
//                 // Add new entry
//                 await axios.post('http://localhost:5000/api/production-master/create', payload);
//                 setMessage('Entry added successfully!');
//             }

//             // Refresh the table and reset form
//             fetchEntries();
//             resetForm();
//         } catch (error) {
//             setMessage(`Error: ${error.response?.data?.message || 'Failed to save data.'}`);
//             console.error('Error during save operation:', error);
//         }
//     };

//     // Reset the form
//     const resetForm = () => {
//         setModelName('');
//         setShift('');
//         setQuantity('');
//         setRemark('');
//         setEditingId(null);
//     };

//     // Handle edit button click
//     const handleEdit = (entry) => {
//         setModelName(entry.modelName);
//         setShift(entry.shift);
//         setQuantity(entry.quantity);
//         setRemark(entry.remark);
//         setEditingId(entry._id);
//     };

//     // Handle delete button click
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/production-master/delete/${id}`);
//             setMessage('Entry deleted successfully!');
//             fetchEntries();
//         } catch (error) {
//             setMessage('Failed to delete entry.');
//             console.error('Error deleting entry:', error);
//         }
//     };

//     return (
//         <Container className="mt-5">
//             <h2 className="text-center mb-4">Production Master</h2>
//             {message && <div className="alert alert-info">{message}</div>}

//             {/* Add/Edit Form */}
//             <Form onSubmit={handleSubmit} className="mb-4">
//                 <Row>
//                     <Col md={3}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Model Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={modelName}
//                                 onChange={(e) => setModelName(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={3}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Shift</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={shift}
//                                 onChange={(e) => setShift(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={3}>
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
//                     <Col md={3}>
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
//                 <Button type="submit" variant="primary" className="me-2">
//                     {editingId ? 'Update' : 'Add'}
//                 </Button>
//                 <Button variant="secondary" onClick={resetForm}>
//                     Reset
//                 </Button>
//             </Form>

//             {/* Table to display entries */}
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Model Name</th>
//                         <th>Shift</th>
//                         <th>Quantity</th>
//                         <th>Remark</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {entries.map((entry, index) => (
//                         <tr key={entry._id}>
//                             <td>{index + 1}</td>
//                             <td>{entry.modelName}</td>
//                             <td>{entry.shift}</td>
//                             <td>{entry.quantity}</td>
//                             <td>{entry.remark}</td>
//                             <td>
//                                 <Button
//                                     variant="info"
//                                     size="sm"
//                                     className="me-2"
//                                     onClick={() => handleEdit(entry)}
//                                 >
//                                     Edit
//                                 </Button>
//                                 <Button
//                                     variant="danger"
//                                     size="sm"
//                                     onClick={() => handleDelete(entry._id)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// export default ProductionMasterPage;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

// const ProductionMasterPage = () => {
//     const [entries, setEntries] = useState([]);
//     const [models, setModels] = useState([]); // To hold model options for the dropdown
//     const [model, setModel] = useState(''); // To hold the selected model
//     const [shift, setShift] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [remark, setRemark] = useState('');
//     const [editingId, setEditingId] = useState(null); // ID of the entry being edited
//     const [message, setMessage] = useState('');

//     // Fetch all entries
//     const fetchEntries = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/production-master/getall');
//             setEntries(response.data);
//         } catch (error) {
//             setMessage('Error fetching production master data.');
//             console.error('Error fetching production master data:', error);
//         }
//     };

//     // Fetch models for dropdown
//     const fetchModels = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/model-master');
//             setModels(response.data); // Populate dropdown with model data
//         } catch (error) {
//             console.error('Error fetching models:', error);
//         }
//     };

//     useEffect(() => {
//         fetchEntries();
//         fetchModels();
//     }, []);

//     // Handle form submission for Add/Edit
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!model || !shift || !quantity) {
//             setMessage('modelName, Shift, and Quantity are required.');
//             return;
//         }

//         const payload = { model, shift, quantity, remark };

//         try {
//             if (editingId) {
//                 // Update entry
//                 await axios.put(`http://localhost:5000/api/production-master/update/${editingId}`, payload);
//                 setMessage('Entry updated successfully!');
//             } else {
//                 // Add new entry
//                 await axios.post('http://localhost:5000/api/production-master/create', payload);
//                 setMessage('Entry added successfully!');
//             }

//             // Refresh the table and reset the form
//             fetchEntries();
//             resetForm();
//         } catch (error) {
//             setMessage(`Error: ${error.response?.data?.message || 'Failed to save data.'}`);
//             console.error('Error during save operation:', error);
//         }
//     };

//     // Reset the form
//     const resetForm = () => {
//         setModel('');
//         setShift('');
//         setQuantity('');
//         setRemark('');
//         setEditingId(null);
//     };

//     // Handle edit button click
//     const handleEdit = (entry) => {
//         setModel(entry.model);
//         setShift(entry.shift);
//         setQuantity(entry.quantity);
//         setRemark(entry.remark);
//         setEditingId(entry._id);
//     };

//     // Handle delete button click
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/production-master/delete/${id}`);
//             setMessage('Entry deleted successfully!');
//             fetchEntries();
//         } catch (error) {
//             setMessage('Failed to delete entry.');
//             console.error('Error deleting entry:', error);
//         }
//     };

//     return (
//         <Container className="mt-5">
//             <h2 className="text-center mb-4">Production Master</h2>
//             {message && <div className="alert alert-info">{message}</div>}

//             {/* Add/Edit Form */}
//             <Form onSubmit={handleSubmit} className="mb-4">
//                 <Row>
//                     <Col md={3}>
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
//                     </Col>
//                     <Col md={3}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Shift</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={shift}
//                                 onChange={(e) => setShift(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={3}>
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
//                     <Col md={3}>
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
//                 <Button type="submit" variant="primary" className="me-2">
//                     {editingId ? 'Update' : 'Add'}
//                 </Button>
//                 <Button variant="secondary" onClick={resetForm}>
//                     Reset
//                 </Button>
//             </Form>

//             {/* Table to display entries */}
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Model</th>
//                         <th>Shift</th>
//                         <th>Quantity</th>
//                         <th>Remark</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {entries.map((entry, index) => (
//                         <tr key={entry._id}>
//                             <td>{index + 1}</td>
//                             <td>{entry.model}</td>
//                             <td>{entry.shift}</td>
//                             <td>{entry.quantity}</td>
//                             <td>{entry.remark}</td>
//                             <td>
//                                 <Button
//                                     variant="info"
//                                     size="sm"
//                                     className="me-2"
//                                     onClick={() => handleEdit(entry)}
//                                 >
//                                     Edit
//                                 </Button>
//                                 <Button
//                                     variant="danger"
//                                     size="sm"
//                                     onClick={() => handleDelete(entry._id)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// export default ProductionMasterPage;

// all perfect 
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

// const ProductionMasterPage = () => {
//     const [entries, setEntries] = useState([]);
//     const [models, setModels] = useState([]); // Model options for the dropdown
//     const [modelName, setModelName] = useState(''); // Selected model name
//     const [shift, setShift] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [remark, setRemark] = useState('');
//     const [editingId, setEditingId] = useState(null); // ID of the entry being edited
//     const [message, setMessage] = useState('');

//     // Fetch all entries
//     const fetchEntries = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/production-master/getall');
//             setEntries(response.data);
//         } catch (error) {
//             setMessage('Error fetching production master data.');
//             console.error('Error fetching production master data:', error);
//         }
//     };

//     // Fetch models for dropdown
//     const fetchModels = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/model-master');
//             setModels(response.data); // Populate dropdown with model data
//         } catch (error) {
//             setMessage('Error fetching models.');
//             console.error('Error fetching models:', error);
//         }
//     };

//     useEffect(() => {
//         fetchEntries();
//         fetchModels();
//     }, []);

//     // Handle form submission for Add/Edit
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!modelName || !shift || !quantity) {
//             setMessage('Model Name, Shift, and Quantity are required.');
//             return;
//         }

//         const payload = { modelName, shift, quantity, remark };

//         try {
//             if (editingId) {
//                 // Update entry
//                 await axios.put(`http://localhost:5000/api/production-master/update/${editingId}`, payload);
//                 setMessage('Entry updated successfully!');
//             } else {
//                 // Add new entry
//                 await axios.post('http://localhost:5000/api/production-master/create', payload);
//                 setMessage('Entry added successfully!');
//             }

//             // Refresh the table and reset the form
//             fetchEntries();
//             resetForm();
//         } catch (error) {
//             setMessage(`Error: ${error.response?.data?.message || 'Failed to save data.'}`);
//             console.error('Error during save operation:', error);
//         }
//     };

//     // Reset the form
//     const resetForm = () => {
//         setModelName('');
//         setShift('');
//         setQuantity('');
//         setRemark('');
//         setEditingId(null);
//     };

//     // Handle edit button click
//     const handleEdit = (entry) => {
//         setModelName(entry.modelName);
//         setShift(entry.shift);
//         setQuantity(entry.quantity);
//         setRemark(entry.remark);
//         setEditingId(entry._id);
//     };

//     // Handle delete button click
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/production-master/delete/${id}`);
//             setMessage('Entry deleted successfully!');
//             fetchEntries();
//         } catch (error) {
//             setMessage('Failed to delete entry.');
//             console.error('Error deleting entry:', error);
//         }
//     };

//     return (
//         <Container className="mt-5">
//             <h2 className="text-center mb-4">Production Master</h2>
//             {message && <div className="alert alert-info">{message}</div>}

//             {/* Add/Edit Form */}
//             <Form onSubmit={handleSubmit} className="mb-4 bg-light p-4 shadow-sm">
//                 <Row>
//                     <Col md={3}>
//                         <Form.Group className="mb-3">
//                                                     <Form.Label>Model</Form.Label>
//                                                     <Form.Select
//                                                         value={modelName}
//                                                         onChange={(e) => setModelName(e.target.value)}
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
//                     <Col md={3}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Shift</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={shift}
//                                 onChange={(e) => setShift(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={3}>
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
//                     <Col md={3}>
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
//                 <div className="d-flex justify-content-start g-2">
//                 <Button type="submit" variant="primary" className="me-2">
//                     {editingId ? 'Update' : 'Add'}
//                 </Button>
//                 <Button variant="secondary" onClick={resetForm}>
//                     Reset
//                 </Button>
//                 </div>
//             </Form>

//             {/* Table to display entries */}
//             {/* <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Model</th>
//                         <th>Shift</th>
//                         <th>Quantity</th>
//                         <th>Remark</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {entries.map((entry, index) => (
//                         <tr key={entry._id}>
//                             <td>{index + 1}</td>
//                             <td>{entry.modelName}</td>
//                             <td>{entry.shift}</td>
//                             <td>{entry.quantity}</td>
//                             <td>{entry.remark}</td>
//                             <td>
//                                 <Button
//                                     variant="info"
//                                     size="sm"
//                                     className="me-2"
//                                     onClick={() => handleEdit(entry)}
//                                 >
//                                     Edit
//                                 </Button>
//                                 <Button
//                                     variant="danger"
//                                     size="sm"
//                                     onClick={() => handleDelete(entry._id)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table> */}

// <h2 className="text-center mb-4">Production Master</h2>
// <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Model</th>
//                         <th>Shift</th>
//                         <th>Quantity</th>
//                         <th>Remark</th>
//                         <th>Created At</th>
//                         <th>Updated At</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {entries.map((entry, index) => (
//                         <tr key={entry._id}>
//                             <td>{index + 1}</td>
//                             <td>{entry.modelName}</td>
//                             <td>{entry.shift}</td>
//                             <td>{entry.quantity}</td>
//                             <td>{entry.remark}</td>
//                             <td>{new Date(entry.createdAt).toLocaleString()}</td>
//                             <td>{new Date(entry.updatedAt).toLocaleString()}</td>
//                             <td>
//                                 <Button
//                                     variant="info"
//                                     size="sm"
//                                     className="me-2"
//                                     onClick={() => handleEdit(entry)}
//                                 >
//                                     Edit
//                                 </Button>
//                                 <Button
//                                     variant="danger"
//                                     size="sm"
//                                     onClick={() => handleDelete(entry._id)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// export default ProductionMasterPage;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

const ProductionMasterPage = () => {
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [models, setModels] = useState([]); // Model options for the dropdown
    const [modelFilter, setModelFilter] = useState(''); // Model filter
    const [shiftFilter, setShiftFilter] = useState(''); // Shift filter
    const [modelName, setModelName] = useState(''); // Selected model name
    const [shift, setShift] = useState('');
    const [plannedQuantity, setPlannedQuantity] = useState('');
    const [actualQuantity, setactualQuantity] =useState("");
    const [department, setDepartment] = useState("");
    const [line, setLine] = useState("");
    const [remark, setRemark] = useState('');
    const [editingId, setEditingId] = useState(null); // ID of the entry being edited
    const [message, setMessage] = useState('');

    // Fetch all entries
    const fetchEntries = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/production-master/getall');
            setEntries(response.data);
            setFilteredEntries(response.data); // Initialize filtered entries
        } catch (error) {
            setMessage('Error fetching production master data.');
            console.error('Error fetching production master data:', error);
        }
    };

    // Fetch models for dropdown
    const fetchModels = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/model-master');
            setModels(response.data); // Populate dropdown with model data
        } catch (error) {
            setMessage('Error fetching models.');
            console.error('Error fetching models:', error);
        }
    };

    useEffect(() => {
        fetchEntries();
        fetchModels();
    }, []);

    // Handle filter logic
    useEffect(() => {
        let filtered = entries;
        if (modelFilter) {
            filtered = filtered.filter((entry) => entry.modelName === modelFilter);
        }
        if (shiftFilter) {
            filtered = filtered.filter((entry) => entry.shift === shiftFilter);
        }
        setFilteredEntries(filtered);
    }, [modelFilter, shiftFilter, entries]);

    // Handle form submission for Add/Edit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!modelName || !shift || !plannedQuantity || !actualQuantity || !department || !line) {
            setMessage('Model Name, Shift, PlanndQuantity, Department, Line  and ActualQuantity are required.');
            return;
        }

        const payload = { modelName, shift, plannedQuantity, actualQuantity, department,line, remark };

        try {
            if (editingId) {
                // Update entry
                await axios.put(`http://localhost:5000/api/production-master/update/${editingId}`, payload);
                setMessage('Entry updated successfully!');
            } else {
                // Add new entry
                await axios.post('http://localhost:5000/api/production-master/create', payload);
                setMessage('Entry added successfully!');
            }

            // Refresh the table and reset the form
            fetchEntries();
            resetForm();
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.message || 'Failed to save data.'}`);
            console.error('Error during save operation:', error);
        }
    };

    // Reset the form
    const resetForm = () => {
        setModelName('');
        setShift('');
        setPlannedQuantity('');
        setactualQuantity("");
        setDepartment("");
        setLine("");
        setRemark('');
        setEditingId(null);
    };

    // Handle edit button click
    const handleEdit = (entry) => {
        setModelName(entry.modelName);
        setShift(entry.shift);
        setPlannedQuantity(entry.plannedquantity);
        setactualQuantity(entry.actualQuantity);
        setDepartment(entry.department);
        setLine(entry.line);
        setRemark(entry.remark);
        setEditingId(entry._id);
    };

    // Handle delete button click
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/production-master/delete/${id}`);
            setMessage('Entry deleted successfully!');
            fetchEntries();
        } catch (error) {
            setMessage('Failed to delete entry.');
            console.error('Error deleting entry:', error);
        }
    };

    // Get unique shift options for filtering
    const shiftOptions = [...new Set(entries.map((entry) => entry.shift))];

    const handleRefresh = () => {
        // Refresh the page
        window.location.reload();
      };

    return (
        <Container className="mt-2">
            <h2 className="text-center mb-4">Production Master</h2>
            {message && <div className="alert alert-info">{message}</div>}

            {/* Add/Edit Form */}
            <Form onSubmit={handleSubmit} className="mb-4 bg-light p-4 shadow-sm">
                <Row>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Model</Form.Label>
                            <Form.Select
                                value={modelName}
                                onChange={(e) => setModelName(e.target.value)}
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
                    {/* <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Shift</Form.Label>
                            <Form.Control
                                type="text"
                                value={shift}
                                onChange={(e) => setShift(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col> */}

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
                            <Form.Label>Planned Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={plannedQuantity}
                                placeholder="Enter Planned Quantity"
                                onChange={(e) => setPlannedQuantity(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Actual Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={actualQuantity}
                                placeholder="Enter Actual Quantity"
                                onChange={(e) => setactualQuantity(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
    <Form.Group className="mb-3">
        <Form.Label>Department</Form.Label>
        <Form.Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
        >
            <option value="">Select Department</option>
            <option value="Department 1">Department 1</option>
            <option value="Department 2">Department 2</option>
            <option value="Department 3">Department 3</option>
        </Form.Select>
    </Form.Group>
</Col>
<Col md={3}>
    <Form.Group className="mb-3">
        <Form.Label>Line</Form.Label>
        <Form.Select
            value={line}
            onChange={(e) => setLine(e.target.value)}
            required
        >
            <option value="">Select Line</option>
            <option value="Line 1">Line 1</option>
            <option value="Line 2">Line 2</option>
            <option value="Line 3">Line 3</option>
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
                    <Button type="submit" variant="primary" className="me-2">
                        {editingId ? 'Update' : 'Add'}
                    </Button>
                    <Button variant="secondary" onClick={resetForm}>
                        Reset
                    </Button>
                </div>
            </Form>


         {/* Align the button on the right */}
         <div className="col-12 col-md-6 text-md-start mt-2 mt-md-0 mb-3">
          <button className="btn btn-primary" onClick={handleRefresh}>
            Refresh Table
          </button>
        </div>
        <div style={{ height: "400px", overflowY: "auto" }} className="border rounded">
            {/* Table to display entries */}
            <Table striped bordered hover>
            <thead className="table-dark sticky-top">
                    <tr>
                        <th>#</th>
                        <th>
                            <Form.Select
                                size="sm"
                                className="mt-0"
                                value={modelFilter}
                                onChange={(e) => setModelFilter(e.target.value)}
                            >
                                <option value="">All Model</option>
                                {models.map((modelOption) => (
                                    <option key={modelOption._id} value={modelOption.modelName}>
                                        {modelOption.modelName}
                                    </option>
                                ))}
                            </Form.Select>
                        </th>
                        <th>
                            <Form.Select
                                size="sm"
                                className="mt-0"
                                value={shiftFilter}
                                onChange={(e) => setShiftFilter(e.target.value)}
                            >
                                <option value="">All Shift</option>
                                {shiftOptions.map((shiftOption) => (
                                    <option key={shiftOption} value={shiftOption}>
                                        {shiftOption}
                                    </option>
                                ))}
                            </Form.Select>
                        </th>
                        <th>Planned Quantity</th>
                        <th>Actual Quantity</th>
                        <th>Department</th>
                        <th>Line</th>
                        <th>Remark</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEntries.map((entry, index) => (
                        <tr key={entry._id}>
                            <td>{index + 1}</td>
                            <td>{entry.modelName}</td>
                            <td>{entry.shift}</td>
                            <td>{entry.plannedQuantity}</td>
                            <td>{entry.actualQuantity}</td>
                            <td>{entry.department}</td>
                            <td>{entry.line}</td>
                            <td>{entry.remark}</td>
                            <td>{new Date(entry.createdAt).toLocaleString()}</td>
                            <td>{new Date(entry.updatedAt).toLocaleString()}</td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEdit(entry)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(entry._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        </Container>
    );
};

export default ProductionMasterPage;
