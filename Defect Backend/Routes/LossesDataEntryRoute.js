const express = require('express');
const router = express.Router();
const lossesDataEntryController = require('../Controller/LossesDataEntryController');

// Create a new Losses Data Entry
router.post('/create', lossesDataEntryController.createLossesDataEntry);

// Get all Losses Data Entries
router.get('/getall', lossesDataEntryController.getAllLossesDataEntries);

// Get a single Losses Data Entry by ID
router.get('/get/:id', lossesDataEntryController.getLossesDataEntryById);

// Update a Losses Data Entry by ID
router.put('/edit/:id', lossesDataEntryController.updateLossesDataEntry);

// Delete a Losses Data Entry by ID
router.delete('/delete/:id', lossesDataEntryController.deleteLossesDataEntry);

module.exports = router;
