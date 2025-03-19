const Plantmaster = require("../Model/Plantmaster");

// Create a new category
exports.createPlantmaster = async (req, res) => {
    try {
        const newPlantmaster = new Plantmaster(req.body);
        await newPlantmaster.save();
        res.status(201).json(newPlantmaster);
    } catch (error) {
        console.error("Error in createPlantmaster:", error); // Log error
        res.status(500).json({ error: "Error creating category" });
    }
};



// Get all Plantmaster records
exports.getAllPlantmaster = async (req, res) => {
    try {
        const plantmasters = await Plantmaster.find({}, { 
            _id: 1, 
            plantmasterName: 1, 
            department: 1, 
            line: 1, 
            dataentry: 1, 
            createdAt: 1, 
            updatedAt: 1
        });

        console.log("Fetched Plantmaster Data:", plantmasters);
        res.status(200).json(plantmasters);
    } catch (error) {
        console.error("Error fetching Plantmaster:", error);
        res.status(500).json({ error: "Error fetching plantmaster" });
    }
};


// Get a single category by ID
exports.getPlantmasterById = async (req, res) => {
    try {
        const plantmaster = await Plantmaster.findById(req.params.id);
        if (!plantmaster) return res.status(404).json({ error: "plantmaster not found" });
        res.json(plantmaster);
    } catch (error) {
        res.status(500).json({ error: "Error fetching plantmaster" });
    }
};



// ✅ Update Plantmaster by ID
exports.updatePlantmaster = async (req, res) => {
    try {
           const plan = await Plantmaster.findById(req.params.id);
           if (!plan) return res.status(404).json({ error: "Category not found" });
           res.json(plan);
        //    console.log(plan)
       } catch (error) {
           res.status(500).json({ error: "Error fetching category" });
       }
};



// Delete a category by ID
exports.deletePlantmaster = async (req, res) => {
    try {
        const deletePlantmaster = await Plantmaster.findByIdAndDelete(req.params.id);
        if (!deletePlantmaster) return res.status(404).json({ error: "Plantmaster not found" });
        res.json({ message: "Plantmaster deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting Plantmaster" });
    }
};
