const mongoose = require("mongoose");

// Define Schema
const cardMasterSchema = new mongoose.Schema(
    {
        numbers: { type: Number, required: true },
        defects: {type:Number, required: true},
        date: { type: Date, required: true },
        shift: { type: String, required: true },
        line: { type: String, required: true },
    },
    { timestamps: true } // Adds createdAt & updatedAt fields
);

// Export Model
module.exports = mongoose.model("CardMaster", cardMasterSchema);
