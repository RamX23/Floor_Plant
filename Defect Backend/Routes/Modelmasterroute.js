const express = require('express');
const router = express.Router();
const modelMasterController = require('../Controller/ModelmasterController');

// Routes for Model Master
router.post('/', modelMasterController.createModelMaster); // Create a new model
router.get('/', modelMasterController.getAllModelMasters); // Fetch all models
router.get('/:id', modelMasterController.getModelMasterById); // Fetch a single model by ID
router.put('/:id', modelMasterController.updateModelMaster); // Update a model by ID
router.delete('/:id', modelMasterController.deleteModelMaster); // Delete a model by ID



module.exports = router;
