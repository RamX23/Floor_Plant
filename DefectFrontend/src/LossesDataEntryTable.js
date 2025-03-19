// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Table, Button, Container } from 'react-bootstrap';

// const LossesDataEntryTable = () => {
//     const [entries, setEntries] = useState([]);
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/losses-data-entry/getall')
//             .then((response) => {
//                 setEntries(response.data);
//             })
//             .catch(() => {
//                 setMessage('Failed to fetch data.');
//             });
//     }, []);

//     const handleDelete = (id) => {
//         axios.delete(`http://localhost:5000/api/losses-data-entry/delete/${id}`)
//             .then(() => {
//                 setEntries(entries.filter((entry) => entry._id !== id));
//                 setMessage('Entry deleted successfully!');
//             })
//             .catch(() => {
//                 setMessage('Failed to delete entry.');
//             });
//     };

//     return (
//         <Container className="mt-5">
//             <h2 className="text-center mb-4">Losses Data Entries</h2>
//             {message && <div className="alert alert-info">{message}</div>}
//             <div className="d-flex justify-content-end mb-3">
//                 <Button variant="success" onClick={() => navigate('/losses-data-entry/add')}>
//                     + Add New Entry
//                 </Button>
//             </div>
//             <Table striped bordered hover responsive>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Model</th>
//                         <th>Losses</th>
//                         <th>Quantity</th>
//                         <th>Remark</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {entries.length > 0 ? (
//                         entries.map((entry, index) => (
//                             <tr key={entry._id}>
//                                 <td>{index + 1}</td>
//                                 <td>{entry.model}</td>
//                                 <td>{entry.losses}</td>
//                                 <td>{entry.quantity}</td>
//                                 <td>{entry.remark}</td>
//                                 <td>
//                                     <Button
//                                         variant="warning"
//                                         size="sm"
//                                         className="me-2"
//                                         onClick={() => navigate(`/losses-data-entry/edit/${entry._id}`)}
//                                     >
//                                         ✏️ Edit
//                                     </Button>
//                                     <Button
//                                         variant="danger"
//                                         size="sm"
//                                         onClick={() => handleDelete(entry._id)}
//                                     >
//                                         🗑️ Delete
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="6" className="text-center">
//                                 No data available
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// export default LossesDataEntryTable;


// full work 
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Table, Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const LossesDataEntryTable = () => {
//     const [entries, setEntries] = useState([]);
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch all losses data entries
//         const fetchEntries = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/losses-data-entry/getall');
//                 setEntries(response.data);
//             } catch (error) {
//                 setMessage('Error fetching data.');
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchEntries();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/losses-data-entry/delete/${id}`);
//             setEntries((prevEntries) => prevEntries.filter((entry) => entry._id !== id));
//             setMessage('Entry deleted successfully.');
//         } catch (error) {
//             setMessage('Failed to delete entry.');
//             console.error('Error deleting entry:', error);
//         }
//     };

//     return (
//         <Container className="mt-5">
//             <h2 className="text-center mb-4">Losses Data Entries</h2>
//             {message && <div className="alert alert-info">{message}</div>}
//             <Button variant="primary" className="mb-3" onClick={() => navigate('/losses-data-entry/add')}>
//                 Add New Entry
//             </Button>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Model</th>
//                         <th>Losses</th>
//                         <th>Created At</th>
//                         <th>Remark</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {entries.map((entry, index) => (
//                         <tr key={entry._id}>
//                             <td>{index + 1}</td>
//                             <td>{entry.model}</td>
//                             <td>{entry.losses}</td>
//                             <td>{entry.timestamps}</td>
//                             <td>{entry.remark}</td>
//                             <td>
//                                 <Button
//                                     variant="info"
//                                     size="sm"
//                                     className="me-2"
//                                     onClick={() => navigate(`/losses-data-entry/edit/${entry._id}`)}
//                                 >
//                                     Edit
//                                 </Button>
//                                 <Button variant="danger" size="sm" onClick={() => handleDelete(entry._id)}>
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

// export default LossesDataEntryTable;


// all perfect 
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Table, Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import LossesDataEntryForm from "./LossesDataentryForm"

// const LossesDataEntryTable = () => {
//     const [entries, setEntries] = useState([]);
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch all losses data entries
//         const fetchEntries = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/losses-data-entry/getall');
//                 setEntries(response.data);
//             } catch (error) {
//                 setMessage('Error fetching data.');
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchEntries();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/losses-data-entry/delete/${id}`);
//             setEntries((prevEntries) => prevEntries.filter((entry) => entry._id !== id));
//             setMessage('Entry deleted successfully.');
//         } catch (error) {
//             setMessage('Failed to delete entry.');
//             console.error('Error deleting entry:', error);
//         }
//     };

//     return (
//         <Container className="mt-1">
//             <LossesDataEntryForm />
//             <h2 className="text-center mb-2">Losses Data Entries</h2>
//             {message && <div className="alert alert-info">{message}</div>}
//             {/* <Button variant="primary" className="mb-3" onClick={() => navigate('/losses-data-entry/add')}>
//                 Add New Entry
//             </Button> */}
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Model</th>
//                         <th>Losses</th>
//                         <th>Minutes</th>
//                         <th>Created At</th>
//                         <th>Updated At</th>
//                         <th>Remark</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {entries.map((entry, index) => (
//                         <tr key={entry._id}>
//                             <td>{index + 1}</td>
//                             <td>{entry.model}</td>
//                             <td>{entry.losses}</td>
//                             <td>{entry.minutes}min</td>
//                             <td>{new Date(entry.createdAt).toLocaleString()}</td>
//                             <td>{new Date(entry.updatedAt).toLocaleString()}</td>
//                             <td>{entry.remark}</td>
//                             <td>
//                                 <Button
//                                     variant="info"
//                                     size="sm"
//                                     className="me-2"
//                                     onClick={() => navigate(`/losses-data-entry/edit/${entry._id}`)}
//                                 >
//                                     Edit
//                                 </Button>
//                                 <Button variant="danger" size="sm" onClick={() => handleDelete(entry._id)}>
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

// export default LossesDataEntryTable;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LossesDataEntryForm from "./LossesDataentryForm";

const LossesDataEntryTable = () => {
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [modelFilter, setModelFilter] = useState('');
    const [lossesFilter, setLossesFilter] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all losses data entries
        const fetchEntries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/losses-data-entry/getall');
                setEntries(response.data);
                setFilteredEntries(response.data); // Initialize filtered entries
            } catch (error) {
                setMessage('Error fetching data.');
                console.error('Error fetching data:', error);
            }
        };

        fetchEntries();
    }, []);

    // Filter logic based on dropdown selections
    useEffect(() => {
        let filtered = entries;
        if (modelFilter) {
            filtered = filtered.filter((entry) => entry.model === modelFilter);
        }
        if (lossesFilter) {
            filtered = filtered.filter((entry) => entry.losses === lossesFilter);
        }
        setFilteredEntries(filtered);
    }, [modelFilter, lossesFilter, entries]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/losses-data-entry/delete/${id}`);
            const updatedEntries = entries.filter((entry) => entry._id !== id);
            setEntries(updatedEntries);
            setFilteredEntries(updatedEntries);
            setMessage('Entry deleted successfully.');
        } catch (error) {
            setMessage('Failed to delete entry.');
            console.error('Error deleting entry:', error);
        }
    };

    // Generate unique options for dropdowns
    const modelOptions = [...new Set(entries.map((entry) => entry.model))];
    const lossesOptions = [...new Set(entries.map((entry) => entry.losses))];

    const handleRefresh = () => {
        // Refresh the page
        window.location.reload();
      };


    return (
        <Container className="mt-0">
        <LossesDataEntryForm />
        {message && <div className="alert alert-info">{message}</div>}
        {/* <Button variant="primary" className="mb-3" onClick={() => navigate('/losses-data-entry/add')}>
            Add New Entry
        </Button> */}
         <div className="row align-items-center mt-0">
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

      <div style={{ height: "400px", overflowY: "auto" }} className="border rounded">

        <Table striped bordered hover>
        <thead className="table-dark overflow-Y-hidden sticky-top">
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
                                {modelOptions.map((model) => (
                                    <option key={model} value={model}>
                                        {model}
                                    </option>
                                ))}
                            </Form.Select>
                        </th>
                        <th>
                            <Form.Select
                                size="sm"
                                className="mt-0"
                                value={lossesFilter}
                                onChange={(e) => setLossesFilter(e.target.value)}
                            >
                                <option value="">All  Losses</option>
                                {lossesOptions.map((loss) => (
                                    <option key={loss} value={loss}>
                                        {loss}
                                    </option>
                                ))}
                            </Form.Select>
                        </th>
                        <th>Shift</th>
                        <th>Minutes</th>
                        <th>Department</th>
                        <th>Line</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Remark</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEntries.map((entry, index) => (
                        <tr key={entry._id}>
                            <td>{index + 1}</td>
                            <td>{entry.model}</td>
                            <td>{entry.losses}</td>
                            <td>{entry.shift}</td>
                            <td>{entry.minutes}min</td>
                            <td>{entry.department}</td>
                            <td>{entry.line}</td>
                            <td>{new Date(entry.createdAt).toLocaleString()}</td>
                            <td>{new Date(entry.updatedAt).toLocaleString()}</td>
                            <td>{entry.remark}</td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => navigate(`/losses-data-entry/edit/${entry._id}`)}
                                >
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(entry._id)}>
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

export default LossesDataEntryTable;
