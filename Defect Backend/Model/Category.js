// const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema({
//     categoryName: { type: String, required: true },
//     description: { type: String, required: true }
// });

// module.exports = mongoose.model("Category", categorySchema);





const mongoose = require('mongoose');

// Define the schema
const categorySchema = new mongoose.Schema(
    {
    categoryName: { type: String, required: true },
    description: { type: String, required: true },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model('Category', categorySchema);
