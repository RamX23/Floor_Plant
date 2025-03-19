// const Category = require("../Routes/");




const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, updateCategory, deleteCategory, getCategoryById } = require('../Controller/Category');

// Use the category routes
router.post("/categories", createCategory);
router.get("/category", getAllCategories);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/category/:id", getCategoryById);


module.exports = router;