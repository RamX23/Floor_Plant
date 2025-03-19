const express = require('express');
const router = express.Router();
const LossesMasterController = require('../Controller/LossesMasterController');

// Create a new Losses Master entry
router.post('/', LossesMasterController.createLossesMaster);

// Get all Losses Master entries
router.get('/getall', LossesMasterController.getAllLossesMasters);

// Get a single Losses Master entry by ID
router.get('/get/:id', LossesMasterController.getLossesMasterById);

// Update a Losses Master entry by ID
router.put('/edit/:id', LossesMasterController.updateLossesMaster);

// Delete a Losses Master entry by ID
router.delete('/delete/:id', LossesMasterController.deleteLossesMaster);

module.exports = router;
