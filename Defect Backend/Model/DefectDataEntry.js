// models/DefectDataEntry.js
const mongoose = require('mongoose');

// Define the schema
const DefectDataEntrySchema = new mongoose.Schema(
    {
        model: { type: String, required: true },
        defect: { type: String, required: true },
        quantity: { type: Number, required: true },
        timestamp: {type: Date , required: true},
        shift: { type: String, required: true },
        department: { type: String,},
        line: { type: String, },
        remark: { type: String },
    },
    // { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model('DefectDataEntry', DefectDataEntrySchema);
