



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './App.css';
// import ModelMasterForm from './ModelMasterForm';
// import ModelmasterTable from './ModelmasterTable'; // Assuming you've created this component
// import Editmodelmaster from "./Editmodelmaster";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         {/* Navigation Menu */}


//         {/* Routes */}
//         <Routes>
//           {/* <Route path="/" element={<h1>Welcome to Model Master Management</h1>} /> */}
//           <Route path="/" element={<ModelMasterForm />} />
//           <Route path="/view" element={<ModelmasterTable />} />
//           <Route path="/edit/:id" element={<Editmodelmaster />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import ModelMasterForm from './ModelMasterForm';
// import ModelmasterTable from './ModelmasterTable';
// import Editmodelmaster from './Editmodelmaster';
// import DefectMasterForm from './DefectMasterForm'; // Import DefectMasterForm
// import DefectMasterTable from './DefectmasterTable'; // Import DefectMasterTable

// import DefectDataEntry from './DefectDataEntry';
// import DefectDataEntryTable from './DefectDataEntryTable';

// import LossesMasterForm from './LossesMasterForm';
// import LossesMasterTable from './LossesMasterTable';


// import LossesDataEntryForm from './LossesDataentryForm';
// import LossesDataEntryTable from './LossesDataEntryTable';

// function App() {
//   return (
//     <Router>
//       {/* <div className="App"> */}
//         {/* Routes */}
//         <Routes>
//           {/* Model Master Routes */}
//           {/* <Route path="/" element={<ModelMasterForm />} />
//           <Route path="/view" element={<ModelmasterTable />} />
//           <Route path="/edit/:id" element={<Editmodelmaster />} /> */}

//           {/* Defect Master Routes */}
//           {/* <Route path="/defect-master/add" element={<DefectMasterForm />} />
//           <Route path="/defect-master/edit/:id" element={<DefectMasterForm />} />
//           <Route path="/defect-master/view" element={<DefectMasterTable />} /> */}


//           {/* <Route path="/defect-data-entry/add" element={<DefectDataEntry />} />
//                 <Route path="/defect-data-entry/edit/:id" element={<DefectDataEntry />} />
//                 <Route path="/defect-data-entry/view" element={<DefectDataEntryTable />} />
//         </Routes> */}

// {/* losses master  */}
//         <Route path="/losses-master/add" element={<LossesMasterForm />} />
//                 <Route path="/losses-master/edit/:id" element={<LossesMasterForm />} />
//                 <Route path="/losses-master/view" element={<LossesMasterTable />} />
//       {/* </div> */}


//       {/* <Route path="/losses-data-entry/add" element={<LossesDataEntryForm />} />
//                 <Route path="/losses-data-entry/edit/:id" element={<LossesDataEntryForm />} />
//                 <Route path="/losses-data-entry/view" element={<LossesDataEntryTable />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// current 
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';

// // Import Components
// import ModelMasterForm from './ModelMasterForm';
// import ModelmasterTable from './ModelmasterTable';
// import Editmodelmaster from './Editmodelmaster';

// import DefectMasterForm from './DefectMasterForm';
// import DefectMasterTable from './DefectmasterTable';

// import DefectDataEntry from './DefectDataEntry';
// import DefectDataEntryTable from './DefectDataEntryTable';

// import LossesMasterForm from './LossesMasterForm';
// import LossesMasterTable from './LossesMasterTable';

// import LossesDataEntryForm from './LossesDataentryForm';
// import LossesDataEntryTable from './LossesDataEntryTable';

// import Productionmaster from './Productionmaster';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         {/* Define Routes */}
//         <Routes>
//           {/* Model Master Routes */}
//           <Route path="/" element={<ModelMasterForm />} />
//           <Route path="/view" element={<ModelmasterTable />} />
//           <Route path="/edit/:id" element={<Editmodelmaster />} />

//           {/* Defect Master Routes */}
//           <Route path="/defect-master/add" element={<DefectMasterForm />} />
//           <Route path="/defect-master/edit/:id" element={<DefectMasterForm />} />
//           <Route path="/defect-master/view" element={<DefectMasterTable />} />

//           {/* Defect Data Entry Routes */}
//           <Route path="/defect-data-entry/add" element={<DefectDataEntry />} />
//           <Route path="/defect-data-entry/edit/:id" element={<DefectDataEntry />} />
//           <Route path="/defect-data-entry/view" element={<DefectDataEntryTable />} />

//           {/* Losses Master Routes */}
//           <Route path="/losses-master/add" element={<LossesMasterForm />} />
//           <Route path="/losses-master/edit/:id" element={<LossesMasterForm />} />
//           <Route path="/losses-master/view" element={<LossesMasterTable />} />

//           {/* Losses Data Entry Routes */}
//           {/* <Route path="/losses-data-entry/add" element={<LossesDataEntryForm />} />
//           <Route path="/losses-data-entry/edit/:id" element={<LossesDataEntryForm />} />
//           <Route path="/losses-data-entry/view" element={<LossesDataEntryTable />} /> */}
//           <Route path="/losses-data-entry/view" element={<LossesDataEntryTable />} />
//                 <Route path="/losses-data-entry/add" element={<LossesDataEntryForm />} />
//                 <Route path="/losses-data-entry/edit/:id" element={<LossesDataEntryForm />} />


//                 <Route path='/productionmaster' element={<Productionmaster />} />
//         </Routes>

        
//       </div>
//     </Router>
//   );
// }

// export default App;



// all work 
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';

// // Import Components
// // import ModelMasterForm from './ModelMasterForm';
// import ModelmasterTable from './ModelmasterTable';
// import Editmodelmaster from './Editmodelmaster';

// import DefectMasterForm from './DefectMasterForm';
// import DefectMasterTable from './DefectmasterTable';

// import DefectDataEntry from './DefectDataEntry';
// import DefectDataEntryTable from './DefectDataEntryTable';

// import LossesMasterForm from './LossesMasterForm';
// import LossesMasterTable from './LossesMasterTable';

// import LossesDataEntryForm from './LossesDataentryForm';
// import LossesDataEntryTable from './LossesDataEntryTable';

// import Productionmaster from './Productionmaster';
// import Efficiency from "./Efficiency";
// import DefectMonthdchart from "./DefectMonthdchart";
// import LossesMDchart from "./LossesMDchart";
// import Report from "./Report";
// import Footer from "../src/Footer";
// import Header from "../src/Header";

// // Sidebar Component
// import Sidebar from './Sidebar';

// function App() {
//   return (
//     <Router>
//       <Header />
//       <div className="App d-flex">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content */}
//         <div className="main-content flex-grow-1 p-2 overflow-y-hidden">
//           <Routes>
//             {/* Model Master Routes */}
//             {/* <Route path="/" element={<ModelMasterForm />} /> */}
//             <Route path="/" element={<ModelmasterTable />} />
//             <Route path="/edit/:id" element={<Editmodelmaster />} />

//             {/* Defect Master Routes */}
//             {/* <Route path="/defect-master/add" element={<DefectMasterForm />} /> */}
//             <Route path="/defect-master/edit/:id" element={<DefectMasterForm />} />
//             <Route path="/defect-master" element={<DefectMasterTable />} />

//             {/* Defect Data Entry Routes */}
//             {/* <Route path="/defect-data-entry/add" element={<DefectDataEntry />} /> */}
//             <Route path="/defect-data-entry/edit/:id" element={<DefectDataEntry />} />
//             <Route path="/defect-data-entry/view" element={<DefectDataEntryTable />} />

//             {/* Losses Master Routes */}
//             {/* <Route path="/losses-master/add" element={<LossesMasterForm />} /> */}
//             <Route path="/losses-master/edit/:id" element={<LossesMasterForm />} />
//             <Route path="/losses-master/view" element={<LossesMasterTable />} />

//             {/* Losses Data Entry Routes */}
//             <Route path="/losses-data-entry/view" element={<LossesDataEntryTable />} />
//             {/* <Route path="/losses-data-entry/add" element={<LossesDataEntryForm />} /> */}
//             <Route path="/losses-data-entry/edit/:id" element={<LossesDataEntryForm />} />

//             {/* Production Master Route */}
//             <Route path="/productionmaster" element={<Productionmaster />} />

//             <Route path='/report' element={<Report />} />
//             <Route path='/efficiency' element={<Efficiency />} />
//             <Route path='/defectmonthdchart' element={<DefectMonthdchart />} />
//             <Route path='lossesmdchart' element={<LossesMDchart />} />
//           </Routes>
//         </div>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;





import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefectDetails from './DefectDetails';
import './App.css';

// Import Components
import ModelmasterTable from './ModelmasterTable';
import Editmodelmaster from './Editmodelmaster';
import DefectMasterForm from './DefectMasterForm';
import DefectMasterTable from './DefectmasterTable';
import DefectDataEntry from './DefectDataEntry';
import DefectDataEntryTable from './DefectDataEntryTable';
import LossesMasterForm from './LossesMasterForm';
import LossesMasterTable from './LossesMasterTable';
import LossesDataEntryForm from './LossesDataentryForm';
import LossesDataEntryTable from './LossesDataEntryTable';
import Productionmaster from './Productionmaster';
import Efficiency from "./Efficiency";
import DefectMonthdchart from "./DefectMonthdchart";
import LossesMDchart from "./LossesMDchart";
import Categorymaster from "./Category/Categorymaster";
import Categorytable from "./Category/Categorytable";
import Plantmasterform from "./Plantmaster/Plantmasterform";
import Report from "./Report";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from './Sidebar';
import CardMaster from './cardmaster/Cardmaster';
import AnalyticsView from './AnalyticsView';

function App() {
  return (
    <Router>
      {/* Fixed Header */}
      <Header />

      <div className="App d-flex">
        {/* Fixed Sidebar */}
        <Sidebar className="sidebar" />

        {/* Main Content (Scrollable) */}
        <div className="main-content flex-grow-1 p-2">
          <Routes>
            <Route path="/" element={<ModelmasterTable />} />
            <Route path="/edit/:id" element={<Editmodelmaster />} />

            {/* Defect Master Routes */}
            <Route path="/defect-master/edit/:id" element={<DefectMasterForm />} />
            <Route path="/defect-master" element={<DefectMasterTable />} />

      

            {/* Defect Data Entry Routes */}
            <Route path="/defect-data-entry/edit/:id" element={<DefectDataEntry />} />
            <Route path="/defect-data-entry/view" element={<DefectDataEntryTable />} />

            {/* Losses Master Routes */}
            <Route path="/losses-master/edit/:id" element={<LossesMasterForm />} />
            <Route path="/losses-master/view" element={<LossesMasterTable />} />

            {/* Losses Data Entry Routes */}
            <Route path="/losses-data-entry/view" element={<LossesDataEntryTable />} />
            <Route path="/losses-data-entry/edit/:id" element={<LossesDataEntryForm />} />

            {/* Production Master Route */}
            <Route path="/productionmaster" element={<Productionmaster />} />

            <Route path='/report' element={<Report />} />
            <Route path='/efficiency' element={<Efficiency />} />
            <Route path='/defectmonthdchart' element={<DefectMonthdchart />} />
            <Route path='lossesmdchart' element={<LossesMDchart />} />

         {/* category  */}
            {/* <Route path='categorymaster' element={<Categorymaster />} /> */}
            <Route path='/category-master/categorytable' element={<Categorytable />} />
            <Route path="/category-master/create" element={<Categorytable />} />
            <Route path="/category-master/edit/:id" element={<Categorymaster />} />

            {/* plantmaster  */}
            <Route path='/plant-master' element={<Plantmasterform />} />
            <Route path="/plant-master/create" element={<Plantmasterform />} />
            <Route path="/plant-master/edit/:id" element={<Plantmasterform />} />

            {/* cardmaster  */}
            <Route path='/card-master' element={<CardMaster />} />
            <Route path="/card-master/create" element={<CardMaster />} />
            <Route path="/card-master/edit/:id" element={<CardMaster />} />


                        {/* Analytics routes */}
             <Route path="/analytics" element={<AnalyticsView/>}/>
             <Route path="/department/:id" element={<DefectDetails />} />

          </Routes>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
