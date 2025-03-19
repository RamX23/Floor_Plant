const mongoose = require("mongoose");

const averageDataSchema = new mongoose.Schema({
    productionQty: Number,
    defectQty: Number,
    plannedQty: Number,
    actualOutput: Number,
    efficiency: Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AverageData", averageDataSchema);
