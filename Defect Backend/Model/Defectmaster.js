// models/DefectMaster.js
const mongoose = require('mongoose');

// Define the Defect Master schema
const DefectMasterSchema = new mongoose.Schema(
    {
        defectName: { type: String, required: true },
        defectType: { type: String, required: true },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model('DefectMaster', DefectMasterSchema);
