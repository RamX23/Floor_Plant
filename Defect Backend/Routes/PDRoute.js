// const express = require('express');
// const router = express.Router();
// const ProductionMaster = require('../Models/ProductionMaster');
// const DefectDataEntry = require('../Models/DefectDataEntry');

// // API endpoint for production/defect ratio calculation
// router.get('/', async (req, res) => {
//     try {
//         console.log("Fetching production data...");
//         const productionData = await ProductionMaster.find({}, { date: 1, productionQuantity: 1 });
//         console.log("Production Data:", productionData);

//         console.log("Fetching defect data...");
//         const defectData = await DefectDataEntry.find({}, { date: 1, defectQuantity: 1 });
//         console.log("Defect Data:", defectData);

//         const combinedData = productionData.map((prod) => {
//             const defect = defectData.find((def) => def.date === prod.date);
//             const defectQuantity = defect ? defect.defectQuantity : 0;
//             const ratio = defectQuantity > 0 ? prod.productionQuantity / defectQuantity : 0;

//             return {
//                 date: prod.date,
//                 productionQuantity: prod.productionQuantity,
//                 defectQuantity: defectQuantity,
//                 ratio: ratio.toFixed(2),
//             };
//         });

//         res.status(200).json(combinedData);
//     } catch (error) {
//         console.error("Error in calculating production/defect ratio:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;
