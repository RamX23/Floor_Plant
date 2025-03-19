
// const DefectDataEntry = require('../Model/DefectDataEntry');
// const ProductionMaster = require('../Model/ProductionMaster');


// // Calculate Production/Defect Ratio

// exports.calculateProductionDefectRatio = async (req, res) => {
//     try {
//         // Fetch production and defect data
//         const productionData = await ProductionMaster.find({}, { date: 1, productionQuantity: 1 });
//         const defectData = await DefectDataEntry.find({}, { date: 1, defectQuantity: 1 });

//         // Combine data based on the date
//         const combinedData = productionData.map((prod) => {
//             const defect = defectData.find((def) => def.date === prod.date);
//             const defectQuantity = defect ? defect.defectQuantity : 0;
//             const ratio = defectQuantity > 0 ? prod.productionQuantity / defectQuantity : 0; // Avoid division by zero

//             return {
//                 date: prod.date,
//                 productionQuantity: prod.productionQuantity,
//                 defectQuantity: defectQuantity,
//                 ratio: ratio.toFixed(2),
//             };
//         });

//         res.status(200).json(combinedData);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// const ProductionMaster = require('../Model/ProductionMaster');
// const DefectDataEntry = require('../Model/DefectDataEntry');

// exports.calculateProductionDefectRatio = async (req, res) => {
//     try {
//         // Fetch production and defect data
//         const productionData = await ProductionMaster.find({}, { productionQuantity: 1, date: 1 });
//         const defectData = await DefectDataEntry.find({}, { defectQuantity: 1, date: 1 });

//         console.log("Production Data:", productionData);
//         console.log("Defect Data:", defectData);

//         // Combine data based on the date
//         const combinedData = productionData.map((prod) => {
//             const defect = defectData.find((def) => def.date === prod.date);
//             const defectQuantity = defect ? defect.defectQuantity : 0;
//             const ratio = defectQuantity > 0 ? prod.productionQuantity / defectQuantity : 0;

//             return {
//                 date: prod.date,
//                 productionQuantity: prod.productionQuantity,
//                 defectQuantity: defectQuantity,
//                 ratio: defectQuantity > 0 ? ratio.toFixed(2) : "N/A", // Handle division by zero
//             };
//         });

//         res.status(200).json(combinedData);
//     } catch (error) {
//         console.error("Error calculating production/defect ratio:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// };



const ProductionMaster = require('../Model/ProductionMaster');
const DefectDataEntry = require('../Model/DefectDataEntry');
// Get all ProductionMaster entries
exports.getAllProductionMasters = async (req, res) => {
    try {
        const entries = await ProductionMaster.find();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all defect data entries
exports.getAllDefectDataEntries = async (req, res) => {
    try {
        const entries = await DefectDataEntry.find();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.calculateProductionDefectRatio = async (req, res) => {
    try {
      const productionData = await ProductionMaster.find();
      const defectData = await DefectDataEntry.find();
  
      const normalizeDate = (date) => {
        try {
          const validDate = new Date(date);
          if (isNaN(validDate.getTime())) throw new Error("Invalid date");
          return validDate.toISOString().split('T')[0];
        } catch (err) {
          console.error("Invalid time value for date:", date);
          return null;
        }
      };
  
      // Create an aggregated map for defects by date
      const aggregatedDefects = {};
      defectData.forEach((def) => {
        const defDate = normalizeDate(def.createdAt);
        if (!defDate) return;
        if (!aggregatedDefects[defDate]) {
          aggregatedDefects[defDate] = 0;
        }
        aggregatedDefects[defDate] += def.defectQuantity;
      });
  
      const combinedData = productionData.map((prod) => {
        const prodDate = normalizeDate(prod.createdAt);
        if (!prodDate) return null;
  
        // Get the aggregated defect quantity for that date (or 0 if none)
        const defectQuantity = aggregatedDefects[prodDate] || 0;
        const ratio = defectQuantity > 0 ? prod.productionQuantity / defectQuantity : 0;
  
        console.log(`Date: ${prodDate}, Aggregated Defect Quantity: ${defectQuantity}`);
  
        return {
          ...prod._doc,
          defectQuantity,
          ratio: defectQuantity > 0 ? ratio.toFixed(2) : "N/A",
        };
      }).filter((entry) => entry !== null);
  
      res.status(200).json(combinedData);
    } catch (error) {
      console.error("Error in calculateProductionDefectRatio:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

