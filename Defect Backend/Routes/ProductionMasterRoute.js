const express = require('express');
const router = express.Router();
const controller = require('../Controller/ProductionMasterController');
const getAnalytics=require('../Controller/GetAnalytics')

// Create a new ProductionMaster entry
router.post('/create', controller.createProductionMaster);

// Get all ProductionMaster entries
router.get('/getall', controller.getAllProductionMasters);

// Get a specific ProductionMaster entry by ID
router.get('/get/:id', controller.getProductionMasterById);

// Update a specific ProductionMaster entry
router.put('/update/:id', controller.updateProductionMaster);

// Delete a specific ProductionMaster entry
router.delete('/delete/:id', controller.deleteProductionMaster);

router.get('/today', controller.getTodaysData);

router.get('/total-production',getAnalytics.getTotalProduction);

// Define the route
// router.get('/production-data/monthly', controller.getMonthlyProductionData);

module.exports = router;
