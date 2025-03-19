// controllers/DefectMasterController.js
const DefectMaster = require('../Model/Defectmaster');

// Create a new defect entry
exports.createDefectMaster = async (req, res) => {
    try {
        const { defectName, defectType } = req.body;

        if (!defectName || !defectType) {
            return res.status(400).json({ message: 'Defect Name and Type are required' });
        }

        const newDefect = new DefectMaster({ defectName, defectType });
        const savedDefect = await newDefect.save();

        res.status(201).json(savedDefect);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all defect entries
exports.getAllDefectMasters = async (req, res) => {
    try {
        const defects = await DefectMaster.find();
        res.status(200).json(defects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single defect entry by ID
exports.getDefectMasterById = async (req, res) => {
    try {
        const defect = await DefectMaster.findById(req.params.id);

        if (!defect) {
            return res.status(404).json({ message: 'Defect Master not found' });
        }

        res.status(200).json(defect);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a defect entry by ID
exports.updateDefectMaster = async (req, res) => {
    try {
        const { defectName, defectType } = req.body;

        const updatedDefect = await DefectMaster.findByIdAndUpdate(
            req.params.id,
            { defectName, defectType },
            { new: true } // Return the updated document
        );

        if (!updatedDefect) {
            return res.status(404).json({ message: 'Defect Master not found' });
        }

        res.status(200).json(updatedDefect);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a defect entry by ID
exports.deleteDefectMaster = async (req, res) => {
    try {
        const deletedDefect = await DefectMaster.findByIdAndDelete(req.params.id);

        if (!deletedDefect) {
            return res.status(404).json({ message: 'Defect Master not found' });
        }

        res.status(200).json({ message: 'Defect Master deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
