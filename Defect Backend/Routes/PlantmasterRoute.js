const express = require('express');
const router = express.Router();
const { createPlantmaster, getAllPlantmaster, updatePlantmaster, deletePlantmaster, getPlantmasterById } = require('../Controller/Plantmaster');

// Use the category routes
router.post("/plantmaster", createPlantmaster);
router.get("/plantm", getAllPlantmaster);
router.put("/update/:id", updatePlantmaster);
router.delete("/deleteplan/:id", deletePlantmaster);
router.get("/plantm/:id", getPlantmasterById);


module.exports = router;