const mongoose = require('mongoose');

// Define the Losses Master schema
const LossesMasterSchema = new mongoose.Schema(
    {
        lossesName: { type: String, required: true },
        lossesType: { type: String, required: true },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model('LossesMaster', LossesMasterSchema);
