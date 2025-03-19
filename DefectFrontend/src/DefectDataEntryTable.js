// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Button, Table, Container, Form } from 'react-bootstrap';
// import DefectDataEntry from "./DefectDataEntry";

// const DefectDataEntryTable = () => {
//     const [entries, setEntries] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const [modelFilter, setModelFilter] = useState('');
//     const [filteredEntries, setFilteredEntries] = useState(entries);


//       // Populate unique model options for the dropdown
//     const modelOptions = [...new Set(entries.map((entry) => entry.model))];

//     // Filter entries based on the selected model
//     useEffect(() => {
//         if (modelFilter) {
//             setFilteredEntries(entries.filter((entry) => entry.model === modelFilter));
//         } else {
//             setFilteredEntries(entries);
//         }
//     }, [modelFilter, entries]);



//     useEffect(() => {
//         const fetchEntries = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/defect-data-entry/getall');
//                 setEntries(response.data);
//             } catch (err) {
//                 setError('Failed to fetch defect data. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEntries();
//     }, []);

//     const handleEdit = (id) => {
//         navigate(`/defect-data-entry/edit/${id}`);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this entry?')) {
//             try {
//                 await axios.delete(`http://localhost:5000/api/defect-data-entry/delete/${id}`);
//                 setEntries(entries.filter((entry) => entry._id !== id)); // Update table after deletion
//             } catch (err) {
//                 setError('Failed to delete defect data. Please try again.');
//             }
//         }
//     };

//     return (
//         <Container className="mt-5">
//             <DefectDataEntry />
//             <div className="d-flex justify-content-center align-items-center mb-2 mt-2">
//                 <h2>Defect Data Entries</h2>
//                 {/* <Button variant="primary" onClick={() => navigate('/defect-data-entry/add')}>
//                     ➕ Add New Entry
//                 </Button> */}
//             </div>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <div className="alert alert-danger">{error}</div>
//             ) : (
//                 <Table striped bordered hover responsive>
//                     <thead className="table-dark">
//                         <tr>
//                             <th>#</th>
//                             {/* <th>Model</th> */}
//                             <th>
//                                 Model
//                                 <Form.Select
//                                     size="sm"
//                                     className="mt-2"
//                                     value={modelFilter}
//                                     onChange={(e) => setModelFilter(e.target.value)}
//                                 >
//                                     <option value="">All</option>
//                                     {modelOptions.map((model) => (
//                                         <option key={model} value={model}>
//                                             {model}
//                                         </option>
//                                     ))}
//                                 </Form.Select>
//                             </th>
//                             <th>Defect</th>
//                             <th>Quantity</th>
//                             <th>Remark</th>
//                             <th>Created At</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {entries.length > 0 ? (
//                             entries.map((entry, index) => (
//                                 <tr key={entry._id}>
//                                     <td>{index + 1}</td>
//                                     <td>{entry.model}</td>
//                                     <td>{entry.defect}</td>
//                                     <td>{entry.quantity}</td>
//                                     <td>{entry.remark || 'N/A'}</td>
//                                     <td>{new Date(entry.createdAt).toLocaleString()}</td>
//                                     <td>
//                                         <Button
//                                             variant="warning"
//                                             size="sm"
//                                             className="me-2"
//                                             onClick={() => handleEdit(entry._id)}
//                                         >
//                                             ✏️ Edit
//                                         </Button>
//                                         <Button
//                                             variant="danger"
//                                             size="sm"
//                                             onClick={() => handleDelete(entry._id)}
//                                         >
//                                             🗑️ Delete
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="7" className="text-center">
//                                     No entries found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </Table>
//             )}
//         </Container>
//     );
// };

// export default DefectDataEntryTable;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Container, Form } from 'react-bootstrap';
import DefectDataEntry from "./DefectDataEntry";

const DefectDataEntryTable = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [modelFilter, setModelFilter] = useState('');
    const [filteredEntries, setFilteredEntries] = useState([]);

    // Populate unique model options for the dropdown
    const modelOptions = [...new Set(entries.map((entry) => entry.model))];

    // Filter entries based on the selected model
    useEffect(() => {
        if (modelFilter) {
            setFilteredEntries(entries.filter((entry) => entry.model === modelFilter));
        } else {
            setFilteredEntries(entries);
        }
    }, [modelFilter, entries]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/defect-data-entry/getall');
                setEntries(response.data);
                setFilteredEntries(response.data); // Initialize filtered entries
            } catch (err) {
                setError('Failed to fetch defect data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, []);

    const handleEdit = (id) => {
        navigate(`/defect-data-entry/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            try {
                await axios.delete(`http://localhost:5000/api/defect-data-entry/delete/${id}`);
                const updatedEntries = entries.filter((entry) => entry._id !== id);
                setEntries(updatedEntries); // Update all entries
                setFilteredEntries(updatedEntries); // Update filtered entries
            } catch (err) {
                setError('Failed to delete defect data. Please try again.');
            }
        }
    };

    const handleRefresh = () => {
        // Refresh the page
        window.location.reload();
      };

    return (
        <Container className="mt-2">
            <DefectDataEntry />
            {/* <div className="d-flex justify-content-center align-items-center mb-2 mt-2">
                <h2>Defect Data Entries</h2>
                </div> */}
                {/* <Button variant="primary" onClick={() => navigate('/defect-data-entry/add')}>
                    ➕ Add New Entry
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
          <h2 className="mb-2 mt-2 ">Defect Data Entries</h2>
        </div>
       
      </div>
           
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <div style={{ height: "400px", overflowY: "auto" }} className="border rounded">

                <Table striped bordered hover responsive>
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
                                    {modelOptions.map((model) => (
                                        <option key={model} value={model}>
                                            {model}
                                        </option>
                                    ))}
                                </Form.Select>
                            </th>
                            <th>Defect</th>
                            <th>Quantity</th>
                            <th>Shift</th>
                            <th>Department</th>
                            <th>Line</th>
                            <th>Remark</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEntries.length > 0 ? (
                            filteredEntries.map((entry, index) => (
                                <tr key={entry._id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.model}</td>
                                    <td>{entry.defect}</td>
                                    <td>{entry.quantity}</td>
                                    <td>{entry.shift}</td>
                                    <td>{entry.department}</td>
                                    <td>{entry.line}</td>
                                    <td>{entry.remark || 'N/A'}</td>
                                    <td>{new Date(entry.timestamp).toLocaleDateString()}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEdit(entry._id)}
                                        >
                                            ✏️ Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(entry._id)}
                                        >
                                            🗑️ Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No entries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                </div>
            )}
        </Container>
    );
};

export default DefectDataEntryTable;
