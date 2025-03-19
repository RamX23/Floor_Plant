const LossesDataEntry = require('../Model/LossesDataEntry');

// Create a new Losses Data Entry
// exports.createLossesDataEntry = async (req, res) => {
//     try {
//         const { model, losses, quantity, remark } = req.body;

//         if (!model || !losses || !quantity) {
//             return res.status(400).json({ message: 'Model, Losses, and Quantity are required.' });
//         }

//         const newEntry = new LossesDataEntry({ model, losses, quantity, remark });
//         const savedEntry = await newEntry.save();

//         res.status(201).json(savedEntry);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

exports.createLossesDataEntry = async (req, res) => {
    try {
        const { model, losses, minutes, shift, department, line, remark } = req.body;

        if (!model || !losses || !minutes || !department || !line || !shift) {
            return res.status(400).json({ message: 'Model, Losses, shift, department, line and Minutes are required.' });
        }

        const newEntry = new LossesDataEntry({ model, losses, minutes, shift, department, line, remark });
        const savedEntry = await newEntry.save();
console.log(savedEntry, newEntry.shift)
        res.status(201).json(savedEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all Losses Data Entries
exports.getAllLossesDataEntries = async (req, res) => {
    try {
        const entries = await LossesDataEntry.find();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single Losses Data Entry by ID
exports.getLossesDataEntryById = async (req, res) => {
    try {
        const entry = await LossesDataEntry.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: 'Losses Data Entry not found.' });
        }

        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Losses Data Entry by ID
exports.updateLossesDataEntry = async (req, res) => {
    try {
        const { model, losses, minutes, shift, remark } = req.body;

        const updatedEntry = await LossesDataEntry.findByIdAndUpdate(
            req.params.id,
            { model, losses, minutes, shift, department, line, remark },
            { new: true } // Return the updated document
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Losses Data Entry not found.' });
        }

        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Losses Data Entry by ID
exports.deleteLossesDataEntry = async (req, res) => {
    try {
        const deletedEntry = await LossesDataEntry.findByIdAndDelete(req.params.id);

        if (!deletedEntry) {
            return res.status(404).json({ message: 'Losses Data Entry not found.' });
        }

        res.status(200).json({ message: 'Losses Data Entry deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
