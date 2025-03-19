const express = require('express');
const cors = require('cors'); // Import cors
const mongoose = require('mongoose');
const efficiencyRoutes = require('./Controller/qtyavg'); // Import the router

const app = express();

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:9850196991@login.ovc0xx7.mongodb.net/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Import routes
const ModelmasterRoute = require('./Routes/Modelmasterroute');
const DefectMasterRoute = require('./Routes/DefectMasterRoute');
const DefectDataEntryRoute = require('./Routes/DefectDataEntryRoute');
const LossesMasterRoute = require('./Routes/LossesMasterRoute');
const lossesDataEntryRoute = require('./Routes/LossesDataEntryRoute');
const QtyAvg = require('./Controller/qtyavg');
const categoryRoutes = require('./Routes/CategoryRoute');

// const ProductionMaster = require('./Model/ProductionMaster');
const ProductionMasterRoute = require('./Routes/ProductionMasterRoute');

// const Calculate = require('./Routes/Calculate');
// const ProductionDefectCalculateRoute = require('./Routes/Calculate');
// app.use('/api/calculate', ProductionDefectCalculateRoute);

// Import routes
const CalculateRoute = require('./Routes/Calculate');
const Efficiency = require('./Routes/Efficiency');
const PlantmasterRoute = require('./Routes/PlantmasterRoute');
const CardmasterRoute = require("./Routes/CardmasterRoute");

// Mount routes
app.use('/api/calculate', CalculateRoute);
app.use('/api/avg', QtyAvg);

app.use('/api', categoryRoutes);
// app.use('/category', categoryRoutes);
app.use('/api', PlantmasterRoute);

app.use('/api/cardmaster', CardmasterRoute);

app.use('/api/model-master', ModelmasterRoute);
app.use('/api/getall', ModelmasterRoute);
app.use('/api/update', ModelmasterRoute);
app.use('/api/delete', ModelmasterRoute);
app.use('/api/getmodelbyid', ModelmasterRoute);


app.use('/api/defect-master', DefectMasterRoute);
app.use('/api/getall', DefectMasterRoute);


app.use('/api/defect-data-entry', DefectDataEntryRoute);
app.use('/api/getall', DefectDataEntryRoute);

app.use('/api/losses-master', LossesMasterRoute);
app.use('/api/getall', LossesMasterRoute);

app.use('/api/losses-data-entry', lossesDataEntryRoute);
app.use('/api/getall', lossesDataEntryRoute);



app.use('/api/production-master', ProductionMasterRoute);
app.use('/api', Efficiency);

// Use the routes from qtyavg.js
// app.use("/api", efficiencyRoutes);

// app.use("/api/production-defect-calculate", Calculate);



// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

