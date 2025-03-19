
const mongoose = require('mongoose');

// Define the schema
const plantmasterSchema = new mongoose.Schema(
    {
    plantmasterName: { type: String, required: true },
    department: { type: String, required: true },
    line: { type: String, required: true },
    dataentry: { type: String, required: true },

    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model('plantmaster', plantmasterSchema);