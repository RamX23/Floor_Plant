// const mongoose = require('mongoose');

// // Define the schema
// const ModelMasterSchema = new mongoose.Schema({
//     modelName: { type: String, required: true },
//     modelSKU: { type: String, required: true },
// }, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// // Export the model
// module.exports = mongoose.model('ModelMaster', ModelMasterSchema);


const mongoose = require('mongoose');

// Define the schema
const ModelMasterSchema = new mongoose.Schema(
    {
        modelName: { type: String, required: true },
        modelSKU: { type: String, required: true },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model('ModelMaster', ModelMasterSchema);
