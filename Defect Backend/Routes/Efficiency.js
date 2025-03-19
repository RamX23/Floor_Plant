


// run 
// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// // Function to calculate efficiency
// router.get('/calculate-efficiency', async (req, res) => {
//     try {
//         // Fetch plannedQuantity and actualQuantity from production API
//         const productionResponse = await axios.get('http://localhost:5000/api/production-master/today');
//         console.log('Production Response:', productionResponse.data);
//         const productionData = productionResponse.data.production;

//         // Fetch defect quantity from defect API
//         const defectResponse = await axios.get('http://localhost:5000/api/defect-data-entry/today');
//         console.log('Defect Response:', defectResponse.data);
//         const defectData = defectResponse.data;

//         if (!Array.isArray(productionData) || !Array.isArray(defectData)) {
//             return res.status(404).json({ success: false, message: 'Invalid data structure from APIs' });
//         }

//         // Initialize calculated results array
//         const calculatedResults = [];

//         // Iterate through production data and calculate values
//         for (const prod of productionData) {
//             const plannedQty = prod.plannedQuantity || 0;
//             const actualQty = prod.actualQuantity || 0;

//             // Calculate total defect quantity for the model
//             const totalDefectQty = defectData
//                 .filter(defect => defect.model === prod.modelName && defect.shift === prod.shift) // Match defects by model and shift
//                 .reduce((sum, defect) => sum + (defect.quantity || 0), 0);

//             // Calculate adjusted actual quantity
//             const adjustedActualQty = actualQty - totalDefectQty;

//             // Calculate efficiency
//             const efficiency = plannedQty > 0
//                 ? (adjustedActualQty / plannedQty) * 100
//                 : 0;

//             // Add result to array
//             calculatedResults.push({
//                 modelName: prod.modelName,
//                 shift: prod.shift,
//                 plannedQty,
//                 actualQty,
//                 totalDefectQty,
//                 adjustedActualQty,
//                 efficiency: efficiency.toFixed(2) // Round to 2 decimal places
//             });
//         }

//         // Return calculated results
//         res.status(200).json({ success: true, data: calculatedResults });
//     } catch (error) {
//         console.error('Error calculating efficiency:', error.message);
//         console.error('Full error:', error);
//         res.status(500).json({ success: false, message: 'An error occurred while calculating efficiency.' });
//     }
// });



// // API to trigger save efficiency manually
// router.post('/save-efficiency', async (req, res) => {
//     try {
//         // Trigger calculation and save immediately
//         await calculateAndSaveEfficiency();

//         // Schedule cron to ensure this runs daily at midnight
//         cron.schedule('0 0 * * *', calculateAndSaveEfficiency);

//         res.status(200).json({ success: true, message: 'Efficiency data calculated, saved successfully, and cron scheduled.' });
//     } catch (error) {
//         console.error('Error saving efficiency data manually:', error.message);
//         res.status(500).json({ success: false, message: 'An error occurred while saving efficiency data.' });
//     }
// });


// module.exports = router;


// c 
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to calculate monthly efficiency
// router.get('/monthly-efficiency', async (req, res) => {
//     try {
//         const productionResponse = await axios.get('http://localhost:5000/api/production-master/getall');
//         const productionData = productionResponse.data;

//         // Group by month
//         const monthlyData = {};

//         productionData.forEach(entry => {
//             const date = new Date(entry.date);
//             const month = date.toLocaleString('default', { month: 'long' });

//             if (!monthlyData[month]) {
//                 monthlyData[month] = { planned: 0, actual: 0, defects: 0 };
//             }

//             monthlyData[month].planned += entry.plannedQuantity || 0;
//             monthlyData[month].actual += entry.actualQuantity || 0;
//             monthlyData[month].defects += entry.defectQuantity || 0;
//         });

//         // Calculate efficiency
//         const efficiencyResults = Object.keys(monthlyData).map(month => {
//             const { planned, actual, defects } = monthlyData[month];
//             const adjustedActual = actual - defects;
//             const efficiency = planned > 0 ? (adjustedActual / planned) * 100 : 0;

//             return {
//                 month,
//                 plannedQuantity: planned,
//                 actualQuantity: actual,
//                 defectQuantity: defects,
//                 efficiency: efficiency.toFixed(2)
//             };
//         });

//         res.status(200).json({ success: true, data: efficiencyResults });
//     } catch (error) {
//         console.error('Error calculating monthly efficiency:', error);
//         res.status(500).json({ success: false, message: 'An error occurred while fetching monthly efficiency data.' });
//     }
// });

// Route to calculate average efficiency for each month
router.get('/monthly-efficiency', async (req, res) => {
    try {
        // Fetch production data from the API
        const productionResponse = await axios.get('http://localhost:5000/api/production-master/getall');
        const productionData = productionResponse.data;

        const monthlyEfficiencyData = {};

        // Group data by month and calculate efficiency for each entry
        productionData.forEach(entry => {
            const date = new Date(entry.createdAt);
            const month = date.toLocaleString('default', { month: 'long' });

            const efficiency = entry.plannedQuantity > 0
                ? (entry.actualQuantity / entry.plannedQuantity) * 100
                : 0;

            if (!monthlyEfficiencyData[month]) {
                monthlyEfficiencyData[month] = { totalEfficiency: 0, count: 0 };
            }

            monthlyEfficiencyData[month].totalEfficiency += efficiency;
            monthlyEfficiencyData[month].count += 1;
        });

        // Calculate average efficiency for each month
        const averageEfficiencyResults = Object.keys(monthlyEfficiencyData).map(month => {
            const { totalEfficiency, count } = monthlyEfficiencyData[month];
            const averageEfficiency = totalEfficiency / count;

            return {
                month,
                averageEfficiency: averageEfficiency.toFixed(2) // Round to 2 decimal places
            };
        });

        res.status(200).json({ success: true, data: averageEfficiencyResults });
    } catch (error) {
        console.error('Error calculating average monthly efficiency:', error);
        res.status(500).json({ success: false, message: 'An error occurred while calculating average monthly efficiency.' });
    }
});


// Route to calculate average efficiency for each month and provide daily efficiencies
router.get('/daily-efficiency', async (req, res) => {
    try {
        // Fetch production data from the API
        const productionResponse = await axios.get('http://localhost:5000/api/production-master/getall');
        const productionData = productionResponse.data;

        const monthlyEfficiencyData = {};
        const dailyEfficiencyData = {};

        // Group data by month and date, and calculate efficiencies
        productionData.forEach(entry => {
            const dateObj = new Date(entry.createdAt);
            const month = dateObj.toLocaleString('default', { month: 'long' });
            const date = dateObj.toLocaleDateString();  // Format as 'MM/DD/YYYY' or similar

            const efficiency = entry.plannedQuantity > 0
                ? (entry.actualQuantity / entry.plannedQuantity) * 100
                : 0;

            // Monthly efficiency grouping
            if (!monthlyEfficiencyData[month]) {
                monthlyEfficiencyData[month] = { totalEfficiency: 0, count: 0 };
            }
            monthlyEfficiencyData[month].totalEfficiency += efficiency;
            monthlyEfficiencyData[month].count += 1;

            // Daily efficiency grouping
            if (!dailyEfficiencyData[month]) {
                dailyEfficiencyData[month] = [];
            }
            dailyEfficiencyData[month].push({
                date,
                modelName: entry.modelName,
                plannedQuantity: entry.plannedQuantity,
                actualQuantity: entry.actualQuantity,
                efficiency: efficiency.toFixed(2)  // Round to 2 decimal places
            });
        });

        // Calculate average efficiency for each month
        const averageEfficiencyResults = Object.keys(monthlyEfficiencyData).map(month => {
            const { totalEfficiency, count } = monthlyEfficiencyData[month];
            const averageEfficiency = totalEfficiency / count;

            return {
                month,
                averageEfficiency: averageEfficiency.toFixed(2) // Round to 2 decimal places
            };
        });

        res.status(200).json({
            success: true,
            monthlyData: averageEfficiencyResults,
            dailyData: dailyEfficiencyData
        });
    } catch (error) {
        console.error('Error calculating average monthly efficiency:', error);
        res.status(500).json({ success: false, message: 'An error occurred while calculating average monthly efficiency.' });
    }
});


module.exports = router;




