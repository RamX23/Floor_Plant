const express = require('express');
const router = express.Router();
const { calculateProductionDefectRatio } = require('../Controller/ProductionDefectCalculate');

// Define the route for calculating the production/defect ratio
router.get('/', calculateProductionDefectRatio);
// Route for today's production totals, defect totals, and ratio calculation
// router.get('/today/ratio', getTodaysProductionDefectRatio);



module.exports = router;
