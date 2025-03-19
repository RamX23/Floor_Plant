const mongoose = require('mongoose');

// Define the Losses Data Entry schema
const LossesDataEntrySchema = new mongoose.Schema(
    {
        model: { type: String, required: true },
        losses: { type: String, required: true },
        minutes: { type: Number, required: true },
        shift: { type: String,  required: true },
        department: { type: String,},
        line: { type: String, },
        remark: { type: String },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model('LossesDataEntry', LossesDataEntrySchema);
