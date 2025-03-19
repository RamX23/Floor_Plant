const ProductionMaster = require('../Model/ProductionMaster');

// Create a new ProductionMaster entry
exports.createProductionMaster = async (req, res) => {
    try {
        const { modelName, shift, plannedQuantity, actualQuantity, department, line, remark } = req.body;

        if (!modelName || !shift || !plannedQuantity || !actualQuantity || !department || !line) {
            return res.status(400).json({ message: 'Model Name, Shift, planned Quantity, actual Quantity, department, line and Quantity are required.' });
        }

        const newEntry = new ProductionMaster({ modelName, shift, plannedQuantity, actualQuantity, department, line, remark });
        const savedEntry = await newEntry.save();

        res.status(201).json(savedEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all ProductionMaster entries
exports.getAllProductionMasters = async (req, res) => {
    try {
        const entries = await ProductionMaster.find();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





// Get a ProductionMaster entry by ID
exports.getProductionMasterById = async (req, res) => {
    try {
        const entry = await ProductionMaster.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: 'Production Master entry not found.' });
        }

        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a ProductionMaster entry
exports.updateProductionMaster = async (req, res) => {
    try {
        const { modelName, shift, plannedQuantity, actualQuantity, department, line, remark } = req.body;

        const updatedEntry = await ProductionMaster.findByIdAndUpdate(
            req.params.id,
            { modelName, shift, plannedQuantity, actualQuantity, department, line, remark },
            { new: true, runValidators: true } // Return the updated document and validate input
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Production Master entry not found.' });
        }

        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a ProductionMaster entry
exports.deleteProductionMaster = async (req, res) => {
    try {
        const deletedEntry = await ProductionMaster.findByIdAndDelete(req.params.id);

        if (!deletedEntry) {
            return res.status(404).json({ message: 'Production Master entry not found.' });
        }

        res.status(200).json({ message: 'Production Master entry deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getTodaysData = async (req, res) => {
    try {
        // Calculate today's start and end date/time
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Retrieve production records created today
        const todaysProduction = await ProductionMaster.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        // Retrieve defect records created today
        // const todaysDefects = await DefectDataEntry.find({
        //     createdAt: { $gte: startOfDay, $lte: endOfDay }
        // });

        res.status(200).json({
            production: todaysProduction,
            // defects: todaysDefects
        });
    } catch (error) {
        console.error("Error in getTodaysData:", error.message);
        res.status(500).json({ error: error.message });
    }
};