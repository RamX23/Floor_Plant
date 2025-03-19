// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Table, Container, Button } from "react-bootstrap";

// function CategoryList() {
//     const [categories, setCategories] = useState([]);

//     // Fetch categories from API
//     useEffect(() => {
//         axios.get("http://localhost:5000/api/category")
//             .then(response => setCategories(response.data))
//             .catch(error => console.error("Error fetching categories:", error));
//     }, []);

//     // Delete category
//     const deleteCategory = (id) => {
//         axios.delete(`http://localhost:5000/api/delete/${id}`)
//             .then(() => setCategories(categories.filter(category => category._id !== id)))
//             .catch(error => console.error("Error deleting category:", error));
//     };

    

//     return (
//         <Container className="mt-4">
//             <h3 className="text-center">Category List</h3>
//             {/* <Link to="/create" className="btn btn-success mb-3">Add Category</Link> */}
//             <Table striped bordered hover responsive>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Category Name</th>
//                         <th>Description</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {categories.length > 0 ? (
//                         categories.map((category, index) => (
//                             <tr key={category._id}>
//                                 <td>{index + 1}</td>
//                                 <td>{category.categoryName}</td>
//                                 <td>{category.description}</td>
//                                 <td>
//                                     <Link to={`/update/${category._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
//                                     <Button variant="danger" size="sm" onClick={() => deleteCategory(category._id)}>Delete</Button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4" className="text-center">No categories found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// }

// export default CategoryList;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Categorymaster from '../Category/Categorymaster';

function CategoryList() {
    const [categories, setCategories] = useState([]);
     const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/category")
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    const deleteCategory = (id) => {
        axios.delete(`http://localhost:5000/api/delete/${id}`)
            .then(() => setCategories(categories.filter(category => category._id !== id)))
            .catch(error => console.error("Error deleting category:", error));
    };

    const handleEdit = (id) => {
        navigate(`/category-master/edit/${id}`);
    };

    const handleRefresh = () => {
        // Refresh the page
        window.location.reload();
      };

    return (
        <Container className="mt-4">
            <Categorymaster />
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
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>{category.categoryName}</td>
                                <td>{category.description}</td>
                                <td>
                                    {/* <Link to={`/category-master/edit/${category._id}`} className="btn btn-warning btn-sm me-2">Edit</Link> */}
                                    <Button
                                                                                variant="warning"
                                                                                size="sm"
                                                                                className="me-2"
                                                                                onClick={() => handleEdit(category._id)}
                                                                            >
                                                                                ✏️ Edit
                                                                            </Button>
                                    <Button variant="danger" size="sm" onClick={() => deleteCategory(category._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No categories found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default CategoryList;
