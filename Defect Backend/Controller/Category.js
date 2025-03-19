const Category = require("../Model/Category");

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error in createCategory:", error); // Log error
        res.status(500).json({ error: "Error creating category" });
    }
};

// Get all categories
// exports.getAllCategories = async (req, res) => {
//     try {
//         const categories = await Category.find();
//         res.json(categories);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching categories" });
//     }
// };

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}, { _id: 1, categoryName: 1, description: 1 });
        // console.log("Categories Data:", categories);
        res.json(categories);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Error fetching categories" });
    }
};


// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: "Error fetching category" });
    }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) return res.status(404).json({ error: "Category not found" });
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: "Error updating category" });
    }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ error: "Category not found" });
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting category" });
    }
};
