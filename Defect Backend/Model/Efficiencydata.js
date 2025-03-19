
// Define Mongoose schema and model for saving efficiency data
const efficiencySchema = new mongoose.Schema({
    productionQty: Number,
    defectQty: Number,
    plannedQty: Number,
    actualOutput: Number,
    efficiency: Number,
    createdAt: { type: Date, default: Date.now },
});

const EfficiencyData = mongoose.model('EfficiencyData', efficiencySchema);