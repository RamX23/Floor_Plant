const ModelMaster = require('../Model/Modelmaster');

// Create a new model master entry

exports.createModelMaster = async (req, res) => {
    try {
        const modelmaster = new ModelMaster(req.body);
        const savedModelmaster = await modelmaster.save();
        res.status(201).json(savedModelmaster);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message});
    }
};


// Fetch all model master entries
exports.getAllModelMasters = async (req, res) => {
    try {
        const models = await ModelMaster.find();
        res.status(200).json(models);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a single model master entry by ID
exports.getModelMasterById = async (req, res) => {
    try {
        const model = await ModelMaster.findById(req.params.id);

        if (!model) {
            return res.status(404).json({ message: 'Model Master not found' });
        }

        res.status(200).json(model);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a model master entry by ID
exports.updateModelMaster = async (req, res) => {
    try {
        const { modelName, modelSKU } = req.body;

        const updatedModel = await ModelMaster.findByIdAndUpdate(
            req.params.id,
            { modelName, modelSKU },
            { new: true } // Return the updated document
        );

        if (!updatedModel) {
            return res.status(404).json({ message: 'Model Master not found' });
        }

        res.status(200).json(updatedModel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a model master entry by ID
exports.deleteModelMaster = async (req, res) => {
    try {
        const deletedModel = await ModelMaster.findByIdAndDelete(req.params.id);

        if (!deletedModel) {
            return res.status(404).json({ message: 'Model Master not found' });
        }

        res.status(200).json({ message: 'Model Master deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
