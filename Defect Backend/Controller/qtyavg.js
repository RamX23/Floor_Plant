const express = require('express');
const router = express.Router();
const cron = require('node-cron'); // Import node-cron
const EfficiencyData = require('../Model/AverageData'); // Import the model
const axios = require('axios');

// Function to fetch data and calculate efficiency
const fetchAndCalculateEfficiency = async () => {
    try {
        const [prodData, defectData] = await Promise.all([
            axios.get('http://localhost:5000/api/production-master/today'),
            axios.get('http://localhost:5000/api/defect-data-entry/today'),
            // axios.get('http://localhost:5000/api/planned-output/today'),
        ]);

        console.log("Production API Response:", prodData.data);
        console.log("Defect API Response:", defectData.data);
        console.log("Planned Output API Response:", plannedData.data);

        const productionArray = prodData.data.production || [];
        const productionQty = productionArray.reduce((total, item) => total + (item.quantity || 0), 0);

        const defectArray = defectData.data || [];
        const defectQty = defectArray.reduce((total, item) => total + (item.quantity || 0), 0);

        const plannedArray = prodData.data.planned || [];
        const plannedQty = plannedArray.reduce((total, item) => total + (item.quantity || 0), 0);

        if (plannedQty === 0 || productionQty === 0) {
            console.log("Planned or production quantity is zero, cannot calculate efficiency.");
            return null;
        }

        const actualOutput = productionQty - defectQty;
        const efficiency = (actualOutput / plannedQty) * 100;

        const efficiencyData = new EfficiencyData({
            productionQty,
            defectQty,
            plannedQty,
            actualOutput,
            efficiency,
        });

        await efficiencyData.save();
        console.log("Efficiency data saved successfully:", {
            productionQty,
            defectQty,
            plannedQty,
            actualOutput,
            efficiency,
        });

        return {
            productionQty,
            defectQty,
            plannedQty,
            actualOutput,
            efficiency,
        };
    } catch (error) {
        console.error("Error fetching data or calculating efficiency:", error.message);
        throw error;
    }
};

// API to fetch saved efficiency data
router.get('/efficiency-data', async (req, res) => {
    try {
        const efficiencyData = await Efficiency.find();
        res.status(200).json({ success: true, data: efficiencyData });
    } catch (error) {
        console.error('Error fetching efficiency data:', error.message);
        res.status(500).json({ success: false, message: 'An error occurred while fetching efficiency data.' });
    }
});


// Route to trigger calculation and show the calculated efficiency
router.post('/calculate', async (req, res) => {
    try {
        const result = await fetchAndCalculateEfficiency();
        if (!result) {
            return res.status(400).json({
                message: "Planned or production quantity is zero, calculation skipped.",
            });
        }
        res.status(200).json({
            message: "Efficiency calculated successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error calculating efficiency",
            error: error.message,
        });
    }
});

// Cron job to calculate and save efficiency data daily at 11:59 PM
cron.schedule('47 11 * * *', async () => {
    console.log("Running scheduled task to calculate efficiency...");
    try {
        const result = await fetchAndCalculateEfficiency();
        if (result) {
            console.log("Scheduled efficiency calculation completed successfully:", result);
        } else {
            console.log("Efficiency calculation skipped due to zero production or planned quantity.");
        }
    } catch (error) {
        console.error("Error during scheduled efficiency calculation:", error.message);
    }
});

// Route to fetch and show the latest efficiency data from the database
router.get('/latest', async (req, res) => {
    try {
        const latestData = await EfficiencyData.findOne().sort({ createdAt: -1 });
        if (!latestData) {
            return res.status(404).json({ message: "No efficiency data found" });
        }
        res.status(200).json(latestData);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching latest efficiency data",
            error: error.message,
        });
    }
});

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const EfficiencyData = require('../Model/AverageData');

// // **Monthly Efficiency Data API**
// router.get('/efficiency/monthly', async (req, res) => {
//     try {
//         const monthlyData = await EfficiencyData.aggregate([
//             {
//                 $group: {
//                     _id: { month: { $month: '$createdAt' } },
//                     totalPlannedQty: { $sum: '$plannedQty' },
//                     totalActualQty: { $sum: '$actualOutput' },
//                     averageEfficiency: { $avg: '$efficiency' }
//                 }
//             },
//             { $sort: { "_id.month": 1 } }
//         ]);

//         const formattedData = monthlyData.map((item) => ({
//             month: item._id.month,
//             totalPlannedQty: item.totalPlannedQty,
//             totalActualQty: item.totalActualQty,
//             averageEfficiency: item.averageEfficiency.toFixed(2),
//         }));

//         res.status(200).json({ success: true, data: formattedData });
//     } catch (error) {
//         console.error('Error fetching monthly efficiency data:', error.message);
//         res.status(500).json({ success: false, message: 'An error occurred while fetching monthly efficiency data.' });
//     }
// });

// // **Daily Efficiency Data API**
// router.get('/efficiency/:month', async (req, res) => {
//     try {
//         const month = parseInt(req.params.month);
//         const startDate = new Date(`2023-${month}-01`);
//         const endDate = new Date(`2023-${month + 1}-01`);

//         const dailyData = await EfficiencyData.aggregate([
//             {
//                 $match: { createdAt: { $gte: startDate, $lt: endDate } }
//             },
//             {
//                 $group: {
//                     _id: { day: { $dayOfMonth: '$createdAt' } },
//                     plannedQty: { $sum: '$plannedQty' },
//                     actualQty: { $sum: '$actualOutput' },
//                     averageEfficiency: { $avg: '$efficiency' }
//                 }
//             },
//             { $sort: { "_id.day": 1 } }
//         ]);

//         const formattedData = dailyData.map((item) => ({
//             day: item._id.day,
//             plannedQty: item.plannedQty,
//             actualQty: item.actualQty,
//             efficiency: item.averageEfficiency.toFixed(2),
//         }));

//         res.status(200).json({ success: true, data: formattedData });
//     } catch (error) {
//         console.error('Error fetching daily efficiency data:', error.message);
//         res.status(500).json({ success: false, message: 'An error occurred while fetching daily efficiency data.' });
//     }
// });

// module.exports = router;
