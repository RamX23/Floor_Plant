// routes/DefectDataEntryRoute.js
const express = require('express');
const router = express.Router();
const defectDataEntry = require('../Controller/DefectDataEntry');


// Define routes for Defect Data Entry
router.post('/create', defectDataEntry.createDefectDataEntry); // Create a new entry
router.get('/getall', defectDataEntry.getAllDefectDataEntries); // Get all entries
router.get('/get/:id', defectDataEntry.getDefectDataEntryById); // Get a single entry by ID
router.put('/edit/:id', defectDataEntry.updateDefectDataEntry); // Update an entry by ID
router.delete('/delete/:id', defectDataEntry.deleteDefectDataEntry); // Delete an entry by ID

// Route to get monthly defect data
// router.get('/defect-data/monthly', defectDataEntry.getMonthlyDefectDataWithDetails);
// router.get('/monthly', defectDataEntry.)
// Get Monthly Defect Data (Daily Shift-Wise)
// router.get("/monthly", async (req, res) => {
//     try {
//         const { month } = req.query;
//         if (!month) {
//             return res.status(400).json({ error: "Month parameter is required" });
//         }

//         // Convert month name to month index (0 for Jan, 11 for Dec)
//         const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//         const monthIndex = months.indexOf(month);

//         if (monthIndex === -1) {
//             return res.status(400).json({ error: "Invalid month name" });
//         }

//         // Get current year
//         const year = new Date().getFullYear();

//         // Create start and end date for the month
//         const startDate = new Date(year, monthIndex, 1);
//         const endDate = new Date(year, monthIndex + 1, 0, 23, 59, 59); // Last day of the month

//         // Fetch defect data for the selected month
//         const defects = await DefectDataEntry.find({
//             createdAt: { $gte: startDate, $lte: endDate }
//         });

//         res.status(200).json(defects);
//     } catch (error) {
//         console.error("Error fetching monthly defect data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// Route to get today's defect data entries
router.get('/today', defectDataEntry.getTodaysData);

module.exports = router;
