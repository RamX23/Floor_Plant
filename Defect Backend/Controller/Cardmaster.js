const CardMaster = require("../Model/Cardmaster");

// ✅ Get All CardMasters
exports.getAllCardMasters = async (req, res) => {
    try {
        const cardMasters = await CardMaster.find({});
        res.status(200).json(cardMasters);
    } catch (error) {
        res.status(500).json({ error: "Error fetching card master data" });
    }
};

// ✅ Get CardMaster by ID
exports.getCardMasterById = async (req, res) => {
    try {
        const cardMaster = await CardMaster.findById(req.params.id);
        if (!cardMaster) return res.status(404).json({ error: "Card Master not found" });
        res.json(cardMaster);
    } catch (error) {
        res.status(500).json({ error: "Error fetching card master" });
    }
};

// ✅ Create a New CardMaster
exports.createCardMaster = async (req, res) => {
    try {
        const newCardMaster = new CardMaster(req.body);
        await newCardMaster.save();
        res.status(201).json(newCardMaster);
    } catch (error) {
        res.status(500).json({ error: "Error creating card master" });
    }
};

// ✅ Update CardMaster by ID
exports.updateCardMaster = async (req, res) => {
    try {
        const updatedCardMaster = await CardMaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCardMaster) return res.status(404).json({ error: "Card Master not found" });
        res.json(updatedCardMaster);
    } catch (error) {
        res.status(500).json({ error: "Error updating card master" });
    }
};

exports.deleteCardMaster = async (req, res) => {
    try {
        const deletedCardMaster = await CardMaster.findByIdAndDelete(req.params.id);
        if (!deletedCardMaster) return res.status(404).json({ error: "Card Master not found" });
        res.json({ message: "Card Master deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting card master" });
    }
};

