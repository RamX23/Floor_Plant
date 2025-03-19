import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function Plantmaster() {
    const { id } = useParams(); // Get ID for editing
    const navigate = useNavigate();
    const [plantmasters, setPlantmasters] = useState([]); // State for table
    const [plantmasterName, setPlantmasterName] = useState('');
    const [department, setDepartment] = useState('');
    const [line, setLine] = useState('');
    const [dataentry, setDataentry] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch all plantmaster records
    useEffect(() => {
        axios.get("http://localhost:5000/api/plantm")
            .then(response => setPlantmasters(response.data))
            .catch(error => console.error("Error fetching plantmasters:", error));
    }, []);

    // Fetch data if editing
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/plantm/${id}`)
                .then(response => {
                    const { plantmasterName, department, line, dataentry } = response.data;
                    setPlantmasterName(plantmasterName);
                    setDepartment(department);
                    setLine(line);
                    setDataentry(dataentry);
                })
                .catch(() => setMessage('Error fetching data.'));
        }
    }, [id]);

    // Handle form submission (Add or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const plantmasterData = { plantmasterName, department, line, dataentry };

        try {
            if (id) {
                await axios.put(`http://localhost:5000/api/update/${id}`, plantmasterData);
                setMessage("Plantmaster updated successfully!");
            } else {
                await axios.post("http://localhost:5000/api/plantmaster", plantmasterData);
                setMessage("Plantmaster added successfully!");
                setPlantmasterName("");
                setDepartment("");
                setLine("");
                setDataentry("");
            }
            navigate("/plant-master/create");
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.message || "Unexpected error"));
        } finally {
            setLoading(false);
        }
    };

    // Delete a record
    const deletePlantmaster = (id) => {
        axios.delete(`http://localhost:5000/api/deleteplan/${id}`)
            .then(() => setPlantmasters(plantmasters.filter(item => item._id !== id)))
            .catch(error => console.error("Error deleting plantmaster:", error));
    };

    const handleRefresh = () => {
        // Refresh the page
        window.location.reload();
      };

    return (
        <Container className="mt-4">
            <div className="shadow-sm p-4 bg-light rounded">
                <h4 className="mb-4">{id ? "Edit Plantmaster" : "Add Plantmaster"}</h4>
                {message && <Alert variant="info">{message}</Alert>}

                {/* Form */}
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="plantmasterName">
                                <Form.Label>Plantmaster Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={plantmasterName}
                                    onChange={(e) => setPlantmasterName(e.target.value)}
                                    placeholder="Enter Plantmaster Name"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="department">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    placeholder="Enter Department"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="line">
                                <Form.Label>Line</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={line}
                                    onChange={(e) => setLine(e.target.value)}
                                    placeholder="Enter Line"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="dataentry">
                                <Form.Label>Data Entry</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={dataentry}
                                    onChange={(e) => setDataentry(e.target.value)}
                                    placeholder="Enter Data Entry"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Buttons */}
                    <Row className="mt-4">
                        <Col md={3}>
                            <Button type="submit" variant="primary" disabled={loading} className="w-100">
                                {id ? "Update" : "Add Plantmaster"}
                            </Button>
                        </Col>
                        <Col md={3}>
                            <Button variant="secondary" className="w-100" onClick={() => navigate("/plant-master/create")}>
                                Back
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            {/* Table */}
            <div className="row align-items-center mt-0">
                 {/* Align the button on the right */}
        <div className="col-12 col-md-6 text-md-start mt-2 mt-md-0">
          <button className="btn btn-primary" onClick={handleRefresh}>
            Refresh Table
          </button>
        </div>
        {/* Center the heading */}
        <div className="col-12 col-md-6 text-end">
          <h2 className="mb-2 mt-2 ">Plant Master</h2>
        </div>

      </div>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Plantmaster Name</th>
                        <th>Department</th>
                        <th>Line</th>
                        <th>Data Entry</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {plantmasters.length > 0 ? (
                        plantmasters.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.plantmasterName}</td>
                                <td>{item.department}</td>
                                <td>{item.line}</td>
                                <td>{item.dataentry}</td>
                                <td>
                                    <Button variant="warning" size="sm" className="me-2" onClick={() => navigate(`/plant-master/edit/${item._id}`)}>
                                        ✏️ Edit
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => deletePlantmaster(item._id)}>
                                        🗑️ Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No plantmasters found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default Plantmaster;
