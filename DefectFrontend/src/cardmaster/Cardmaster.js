// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   Container,
//   Button,
//   Form,
//   Row,
//   Col,
//   Alert,
// } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";

// function CardMaster() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [cardMasters, setCardMasters] = useState([]);
//   const [numbers, setNumbers] = useState("");
//   const [date, setDate] = useState("");
//   const [shift, setShift] = useState("");
//   const [line, setLine] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/cardmaster/cardmasters")
//       .then((response) => setCardMasters(response.data))
//       .catch((error) => console.error("Error fetching card masters:", error));
//   }, []);

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`http://localhost:5000/api/cardmaster/cardmasters/${id}`)
//         .then((response) => {
//           const { numbers, date, shift, line } = response.data;
//           setNumbers(numbers);
//           setDate(date.split("T")[0]); // Convert date format
//           setShift(shift);
//           setLine(line);
//         })
//         .catch(() => setMessage("Error fetching card master data."));
//     }
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const cardMasterData = { numbers, date, shift, line };

//     try {
//       if (id) {
//         await axios.put(
//           `http://localhost:5000/api/cardmaster/cardmasters/${id}`,
//           cardMasterData
//         );
//         setMessage("Card Master updated successfully!");
//       } else {
//         await axios.post(
//           "http://localhost:5000/api/cardmaster/cardmaster",
//           cardMasterData
//         );
//         setMessage("Card Master added successfully!");
//         setNumbers("");
//         setDate("");
//         setShift("");
//         setLine("");
//       }
//       navigate("/card-master");
//     } catch (error) {
//       setMessage(
//         "Error: " + (error.response?.data?.message || "Unexpected error")
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <div className="shadow-sm p-4 bg-light rounded">
//         <h4>{id ? "Edit Card Master" : "Add Card Master"}</h4>
//         {message && <Alert variant="info">{message}</Alert>}
//         <Form onSubmit={handleSubmit}>
//           <Row>
//             <Col md={6}>
//               <Form.Group controlId="numbers">
//                 <Form.Label>Numbers</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={numbers}
//                   onChange={(e) => setNumbers(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group controlId="date">
//                 <Form.Label>Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={6}>
//               <Form.Group controlId="shift">
//                 <Form.Label>Shift</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={shift}
//                   onChange={(e) => setShift(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group controlId="line">
//                 <Form.Label>Line</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={line}
//                   onChange={(e) => setLine(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Button
//             type="submit"
//             variant="primary"
//             disabled={loading}
//             className="mt-3"
//           >
//             {id ? "Update" : "Add Card Master"}
//           </Button>
//         </Form>
//       </div>

//       <Table striped bordered hover responsive className="mt-3">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Numbers</th>
//             <th>Date</th>
//             <th>Shift</th>
//             <th>Line</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cardMasters.map((item, index) => (
//             <tr key={item._id}>
//               <td>{index + 1}</td>
//               <td>{item.numbers}</td>
//               <td>{item.date.split("T")[0]}</td>
//               <td>{item.shift}</td>
//               <td>{item.line}</td>
//               <td>
//                 <Button
//                   variant="warning"
//                   onClick={() => navigate(`/card-master/edit/${item._id}`)}
//                 >
//                   Edit
//                 </Button>
                
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }

// export default CardMaster;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function CardMaster() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cardMasters, setCardMasters] = useState([]);
    const [numbers, setNumbers] = useState('');
    const [date, setDate] = useState('');
    const [shift, setShift] = useState('');
    const [line, setLine] = useState('');
    const [message, setMessage] = useState('');
    const [defects,setDefects]=useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchCardMasters();
    }, []);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/cardmaster/cardmasters/${id}`)
                .then(response => {
                    const { numbers, date, shift, line, defects } = response.data;
                    setNumbers(numbers);
                    setDate(date.split("T")[0]);
                    setShift(shift);
                    setLine(line);
                    setDefects(defects)
                })
                .catch(() => setMessage('Error fetching card master data.'));
        }
    }, [id]);

    const fetchCardMasters = () => {
        axios.get("http://localhost:5000/api/cardmaster/cardmasters")
            .then(response => setCardMasters(response.data))
            .catch(error => console.error("Error fetching card masters:", error));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const cardMasterData = { numbers, date, shift, line, defects };

        try {
            if (id) {
                await axios.put(`http://localhost:5000/api/cardmaster/cardmasters/${id}`, cardMasterData);
                setMessage("Card Master updated successfully!");
            } else {
                await axios.post("http://localhost:5000/api/cardmaster/cardmaster", cardMasterData);
                setMessage("Card Master added successfully!");
                setNumbers("");
                setDate("");
                setShift("");
                setLine("");
                setDefects("");
            }
            fetchCardMasters();
            navigate("/card-master");
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.message || "Unexpected error"));
        } finally {
            setLoading(false);
        }
    };

    const deleteCardMaster = async (cardMasterId) => {
        if (window.confirm("Are you sure you want to delete this card master?")) {
            try {
                await axios.delete(`http://localhost:5000/api/cardmaster/cardmasters/${cardMasterId}`);
                setMessage("Card Master deleted successfully!");
                fetchCardMasters();
            } catch (error) {
                console.error("Error deleting card master:", error);
                setMessage("Error deleting card master");
            }
        }
    };


    const resetForm = () => {
        setNumbers("");
        setDate("");
        setShift("");
        setLine("");
        setMessage("");
    };

    const handleRefresh = () => {
        // Refresh the page
        window.location.reload();
      };

    return (
        <Container className="mt-4">
            <div className="shadow-sm p-4 bg-light rounded">
                <h4>{id ? "Edit Card Master" : "Add Card Master"}</h4>
                {message && <Alert variant="info">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="numbers">
                                <Form.Label>Number of Cards</Form.Label>
                                <Form.Control type="number" value={numbers} onChange={(e) => setNumbers(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="numbers">
                                <Form.Label>Number of Defects</Form.Label>
                                <Form.Control type="number" value={defects} onChange={(e) => setDefects(e.target.value)} required />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                    <Col md={6}>
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="shift">
                                <Form.Label>Shift</Form.Label>
                                <Form.Select value={shift} onChange={(e) => setShift(e.target.value)} required>
                                    <option value="">Select Shift</option>
                                    <option value="Shift 1">Shift 1</option>
                                    <option value="Shift 2">Shift 2</option>
                                    <option value="Shift 3">Shift 3</option>
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
                    </Row>

                    <Row className="mt-3">
                        <Col md={3}>
                            <Button type="submit" variant="primary" disabled={loading} className="w-100">
                                {id ? "Update" : "Add Card Master"}
                            </Button>
                        </Col>

                        {!id && (
                            <Col md={3}>
                                <Button type="button" variant="secondary" className="w-100" onClick={resetForm}>
                                    Reset
                                </Button>
                            </Col>
                        )}

                        {id && (
                            <Col md={6}>
                                <Button type="button" variant="warning" className="w-100" onClick={() => navigate("/card-master")}>
                                    Back
                                </Button>
                            </Col>
                        )}
                    </Row>
                </Form>
            </div>


            <div className="row align-items-center mt-0">
        <div className="col-12 col-md-6 text-md-start mt-2 mt-md-0">
          <button className="btn btn-primary" onClick={handleRefresh}>
            Refresh Table
          </button>
        </div>

        <div className="col-12 col-md-6 text-end">
          <h2 className="mb-2 mt-2 ">Card Master</h2>
        </div>

      </div>

            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Numbers</th>
                        <th>Date</th>
                        <th>Shift</th>
                        <th>Line</th>
                        <th>Defects</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cardMasters.length > 0 ? (
                        cardMasters.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.numbers}</td>
                                <td>{item.date.split("T")[0]}</td>
                                <td>{item.shift}</td>
                                <td>{item.line}</td>
                                <td>{item.defects?item.defects:0}</td>
                                <td>
                                    <Button variant="warning" size="sm" className="me-2" onClick={() => navigate(`/card-master/edit/${item._id}`)}>
                                        ✏️ Edit
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => deleteCardMaster(item._id)}>
                                        🗑️ Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No card masters found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default CardMaster;
