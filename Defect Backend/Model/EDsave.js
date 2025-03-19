// Define Mongoose Schema and Model
const EfficiencySchema = new mongoose.Schema({
    modelName: String,
    shift: String,
    plannedQty: Number,
    actualQty: Number,
    totalDefectQty: Number,
    adjustedActualQty: Number,
    efficiency: String,
    createdAt: { type: Date, default: Date.now }
});

const Efficiency = mongoose.model('Efficiency', EfficiencySchema);