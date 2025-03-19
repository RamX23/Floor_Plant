const mongoose = require('mongoose');

// Define the ProductionMaster schema
const ProductionMasterSchema = new mongoose.Schema(
    {
        modelName: { type: String, required: true },
        shift: { type: String, required: true },
        plannedQuantity: { type: Number, required: true },
        actualQuantity: { type: Number, required: true },
        department: { type: String,},
        line: { type: String, },
        remark: { type: String },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model('ProductionMaster', ProductionMasterSchema);
