const LossesMaster = require('../Model/LossesMaster');

// Create a new Losses Master entry
exports.createLossesMaster = async (req, res) => {
    try {
        const { lossesName, lossesType } = req.body;

        if (!lossesName || !lossesType) {
            return res.status(400).json({ message: 'Losses Name and Type are required.' });
        }

        const newLoss = new LossesMaster({ lossesName, lossesType });
        const savedLoss = await newLoss.save();

        res.status(201).json(savedLoss);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Losses Master entries
exports.getAllLossesMasters = async (req, res) => {
    try {
        const losses = await LossesMaster.find();
        res.status(200).json(losses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single Losses Master entry by ID
exports.getLossesMasterById = async (req, res) => {
    try {
        const loss = await LossesMaster.findById(req.params.id);

        if (!loss) {
            return res.status(404).json({ message: 'Losses Master not found.' });
        }

        res.status(200).json(loss);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Losses Master entry by ID
exports.updateLossesMaster = async (req, res) => {
    try {
        const { lossesName, lossesType } = req.body;

        const updatedLoss = await LossesMaster.findByIdAndUpdate(
            req.params.id,
            { lossesName, lossesType },
            { new: true } // Return the updated document
        );

        if (!updatedLoss) {
            return res.status(404).json({ message: 'Losses Master not found.' });
        }

        res.status(200).json(updatedLoss);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Losses Master entry by ID
exports.deleteLossesMaster = async (req, res) => {
    try {
        const deletedLoss = await LossesMaster.findByIdAndDelete(req.params.id);

        if (!deletedLoss) {
            return res.status(404).json({ message: 'Losses Master not found.' });
        }

        res.status(200).json({ message: 'Losses Master deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
