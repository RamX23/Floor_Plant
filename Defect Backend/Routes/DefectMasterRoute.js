// routes/DefectMasterRoute.js
const express = require('express');
const router = express.Router();
const defectMasterController = require('../Controller/DefectMasterController');
const defectAnalytics=require('../Controller/GetAnalytics')


// Define routes for Defect Master
router.post('/', defectMasterController.createDefectMaster); // Create a new defect entry
router.get('/getall', defectMasterController.getAllDefectMasters); // Get all defect entries
router.get('/get/:id', defectMasterController.getDefectMasterById); // Get a single defect by ID
router.put('/edit/:id', defectMasterController.updateDefectMaster); // Update a defect by ID
router.delete('/delete/:id', defectMasterController.deleteDefectMaster); // Delete a defect by ID
router.get('/analytics',defectAnalytics.getDefectSummary);
router.get('/defect-details/:department', defectAnalytics.getDefectDetailsByDepartment);



module.exports = router;
