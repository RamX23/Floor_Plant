// controllers/DefectDataEntryController.js
const DefectDataEntry = require('../Model/DefectDataEntry');

// Create a new defect data entry
exports.createDefectDataEntry = async (req, res) => {
    try {
        const { model, defect, shift, quantity, department, line, remark,timestamp } = req.body;
        // console.log(timestamp);

        if (!model || !defect || !quantity || !department || !shift || !timestamp) {
            return res.status(400).json({ message: 'Model, Defect, shift,departmanet, line and Quantity are required.' });
        }

        const newEntry = new DefectDataEntry({ model, defect, shift, quantity, department, line, remark, timestamp});
        const savedEntry = await newEntry.save();

        res.status(201).json(savedEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// exports.createDefectDataEntry = async (req, res) => {
//     try {
//         const newEntry = new DefectDataEntry(req.body);
//         await newEntry.save();
//         res.status(201).json(newEntry);
//     } catch (error) {
//         console.error("Error in createCategory:", error); // Log error
//         res.status(500).json({ error: "Error creating category" });
//     }
// };

// Get all defect data entries
exports.getAllDefectDataEntries = async (req, res) => {
    try {
        const entries = await DefectDataEntry.find();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Get all defect data grouped by month and year with all fields
// exports.getMonthlyDefectDataWithDetails = async (req, res) => {
//     try {
//         const monthlyDefects = await DefectDataEntry.aggregate([
//             {
//                 $group: {
//                     _id: {
//                         month: { $month: "$createdAt" },
//                         year: { $year: "$createdAt" }
//                     },
//                     totalDefects: { $sum: "$quantity" },  // Sum total defects for each month
//                     entries: {
//                         $push: {
//                             model: "$model",
//                             defect: "$defect",
//                             quantity: "$quantity",
//                             shift: "$shift",
//                             remark: "$remark",
//                             createdAt: "$createdAt"
//                         }
//                     }
//                 }
//             },
//             { $sort: { "_id.year": 1, "_id.month": 1 } }
//         ]);

//         // Format the response to return year, month, total defects, and entry details
//         const formattedData = monthlyDefects.map(item => ({
//             year: item._id.year,
//             month: item._id.month,
//             totalDefects: item.totalDefects,
//             entries: item.entries
//         }));

//         res.status(200).json({ success: true, data: formattedData });
//     } catch (error) {
//         console.error('Error fetching monthly defect data:', error.message);
//         res.status(500).json({ success: false, message: 'An error occurred while fetching monthly defect data.' });
//     }
// };

// exports.getMonthlyDefectDataWithDetails = async (req, res) => {
//     try {
//         // Aggregating monthly defect data
//         const monthlyDefects  = await DefectDataEntry.find();
//         ([
//             {
//                 $group: {
//                     _id: {
//                         month: { $month: "$createdAt" },
//                         year: { $year: "$createdAt" }
//                     },
//                     totalDefects: { $sum: "$quantity" },  // Summing defect quantities
//                     entries: {
//                         $push: {
//                             model: "$model",
//                             defect: "$defect",
//                             quantity: "$quantity",
//                             shift: "$shift",
//                             remark: "$remark",
//                             createdAt: "$createdAt"
//                         }
//                     }
//                 }
//             },
//             { $sort: { "_id.year": 1, "_id.month": 1 } }
//         ]);

//         if (!monthlyDefects || monthlyDefects.length === 0) {
//             return res.status(404).json({ success: false, message: 'No monthly defect data found.' });
//         }

//         // Formatting the data
//         const formattedData = monthlyDefects.map(item => ({
//             year: item._id.year,
//             month: item._id.month,
//             totalDefects: item.totalDefects,
//             entries: item.entries
//         }));

//         res.status(200).json({ success: true, data: formattedData });
//     } catch (error) {
//         console.error('Error fetching monthly defect data:', error.message);
//         res.status(500).json({ success: false, message: 'An error occurred while fetching monthly defect data.' });
//     }
// };




// Get a single defect data entry by ID
exports.getDefectDataEntryById = async (req, res) => {
    try {
        const entry = await DefectDataEntry.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: 'Defect Data Entry not found.' });
        }

        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a defect data entry by ID
exports.updateDefectDataEntry = async (req, res) => {
    try {
        const { model, defect, quantity, department, line, remark } = req.body;

        const updatedEntry = await DefectDataEntry.findByIdAndUpdate(
            req.params.id,
            { model, defect, quantity, department, line, remark },
            { new: true } // Return the updated document
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Defect Data Entry not found.' });
        }

        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a defect data entry by ID
exports.deleteDefectDataEntry = async (req, res) => {
    try {
        const deletedEntry = await DefectDataEntry.findByIdAndDelete(req.params.id);

        if (!deletedEntry) {
            return res.status(404).json({ message: 'Defect Data Entry not found.' });
        }

        res.status(200).json({ message: 'Defect Data Entry deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get defect data entries for a specific day
exports.getDefectQuantityByDay = async (req, res) => {
    try {
        // Get the date from the request query (e.g., ?date=2025-01-22)
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: "Date parameter is required." });
        }

        // Calculate the start and end of the day
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0); // 00:00:00
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999); // 23:59:59

        // Query to find all defects within the given day
        const entries = await DefectDataEntry.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfDay, $lte: endOfDay }
                }
            },
            {
                $group: {
                    _id: "$defectName", // Group by defect name
                    totalQuantity: { $sum: "$quantity" } // Sum the quantity
                }
            }
        ]);

        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get defect data entries for today
exports.getTodaysData = async (req, res) => {
    try {
        // Get the current date and set the time to the start of the day
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // Set the current date's time to the end of the day
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Query to find all defects created today
        const todaysEntries = await DefectDataEntry.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        res.status(200).json(todaysEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
