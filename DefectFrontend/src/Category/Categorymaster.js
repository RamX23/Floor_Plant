// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import Categorytable from "./Categorytable";

// function CreateCategory() {
//     const [data, setData] = useState({ categoryName: "", description: "" });
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post("http://localhost:5000/api/categories", data)
//             // .then(() => navigate("/"))
//             .catch(error => console.error(error));
//             console.log('')
//     };



//     return (
//         <Container className="mt-4">
//             <h3 className="text-center">Create Category</h3>
//             <Form onSubmit={handleSubmit}>
//                 <Row className="mb-3">
//                     <Col md={3}>
//                         <Form.Group>
//                             <Form.Label>Category Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={data.categoryName}
//                                 onChange={(e) => setData({ ...data, categoryName: e.target.value })}
//                                 required
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={3}>
//                         <Form.Group>
//                             <Form.Label>Description</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 value={data.description}
//                                 onChange={(e) => setData({ ...data, description: e.target.value })}
//                                 required
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Button variant="success" type="submit">Create</Button>
//             </Form>
//             <Categorytable />
//         </Container>
//     );
// }

// export default CreateCategory;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Row, Col, Container } from "react-bootstrap";

const CategoryForm = () => {
    const { id } = useParams(); // Get category ID from URL
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/category/${id}`)
                .then(response => {
                    const { categoryName, description } = response.data;
                    setCategoryName(categoryName);
                    setDescription(description);
                })
                .catch(error => setMessage('Error fetching category data.'));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (id) {
                await axios.put(`http://localhost:5000/api/update/${id}`, {
                    categoryName,
                    description,
                });
                setMessage('Category updated successfully!');
            } else {
                await axios.post("http://localhost:5000/api/categories", {
                    categoryName,
                    description,
                });
                setMessage('Category added successfully!');
                setCategoryName('');
                setDescription('');
            }
            navigate("/category-master/categorytable"); // Redirect to the category list
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'An unexpected error occurred';
            setMessage(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-2">
            <div className="shadow-sm p-4 bg-light rounded">
                <h4 className="mb-4 text-start">{id ? 'Edit Category Master' : 'Category Master'}</h4>
                {message && <div className="alert alert-info">{message}</div>}

                {/* Form */}
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="categoryName">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    placeholder="Enter Category Name"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter Description"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Buttons */}
                    <Row className="mt-4">
                        <Col md={2}>
                            <Button type="submit" variant="primary" disabled={loading} className="w-100">
                                {id ? 'Update' : 'Add Category'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>
    );
};

export default CategoryForm;

