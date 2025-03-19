const DefectDataEntry = require('../Model/DefectDataEntry.js');
const cardMasterSchema = require('../Model/Cardmaster.js');
const productionSchema = require('../Model/ProductionMaster.js');
const DefectMasterSchema = require('../Model/Defectmaster.js');

async function getDefectSummary(req, res) {
    try {
        const result = await DefectDataEntry.aggregate([
            {
                $group: {
                    _id: {
                        department: "$department",
                        month: { $dateToString: { format: "%Y-%m", date: "$timestamp" } },
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }
                    },
                    totalDefects: { $sum: 1 }
                }
            },
            { $sort: { "_id.date": 1 } },
            {
                $group: {
                    _id: {
                        department: "$_id.department",
                        month: "$_id.month"
                    },
                    defectsByDate: {
                        $push: {
                            date: "$_id.date",
                            totalDefects: "$totalDefects"
                        }
                    },
                    totalDefectsInMonth: { $sum: "$totalDefects" }
                }
            },
            {
                $group: {
                    _id: "$_id.department",
                    defectsByMonth: {
                        $push: {
                            month: "$_id.month",
                            totalDefectsInMonth: "$totalDefectsInMonth",
                            defectsByDate: "$defectsByDate"
                        }
                    }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching defect summary:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getDefectDetailsByDepartment(req, res) {
    try {
        const { department } = req.params;
        console.log("Fetching summary by dept", department);

        const defects = await DefectDataEntry.find({ department })
            .select('defect model remark timestamp')
            .lean();

        if (!defects || defects.length === 0) {
            return res.status(404).json({ message: 'No defects found for this department' });
        }

        const defectNames = defects.map(d => d.defect);

        const defectTypes = await DefectMasterSchema.find({ defectName: { $in: defectNames } }).lean();

        const defectTypeMap = defectTypes.reduce((acc, dt) => {
            acc[dt.defectName] = dt.defectType;
            return acc;
        }, {});

        const formattedDefects = defects.map(defect => ({
            ...defect,
            defectType: defectTypeMap[defect.defect] || "Unknown",
            timestamp: new Date(defect.timestamp).toISOString().split('T')[0],
        }));

        console.log("Defect summary fetched:", formattedDefects);
        res.status(200).json(formattedDefects);
    } catch (error) {
        console.error("Error fetching defect details:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getTotalCards(req, res) {
    try {
        const result = await cardMasterSchema.aggregate([
            {
                $group: {
                    _id: {
                        month: { $dateToString: { format: "%Y-%m", date: "$date" } },
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
                    },
                    totalCards: { $sum: 1 }
                }
            },
            { $sort: { "_id.date": 1 } },
            {
                $group: {
                    _id: "$_id.month",
                    cardsByDate: {
                        $push: {
                            date: "$_id.date",
                            totalCards: "$totalCards"
                        }
                    },
                    totalCardsInMonth: { $sum: "$totalCards" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching total cards by month:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function getTotalProduction(req, res) {
    try {
        const result = await productionSchema.aggregate([
            {
                $group: {
                    _id: {
                        month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                    },
                    totalProduction: { $sum: "$actualQuantity" }
                }
            },
            { $sort: { "_id.date": 1 } },
            {
                $group: {
                    _id: "$_id.month",
                    productionByDate: {
                        $push: {
                            date: "$_id.date",
                            totalProduction: "$totalProduction"
                        }
                    },
                    totalProductionInMonth: { $sum: "$totalProduction" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching total production by month:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function getZeroDefectCards(req, res) {
    try {
        const zeroDefectCards = await cardMasterSchema.find({ defects: 0 });
        const val = zeroDefectCards.length;
        res.status(200).json({ totalZeroDefectCards: val });
    } catch (err) {
        console.error("Error occurred while getting count of zero defect cards", err);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = { 
    getDefectSummary, 
    getDefectDetailsByDepartment, 
    getTotalCards, 
    getTotalProduction,
    getZeroDefectCards 
};
