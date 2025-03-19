// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//     Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
// } from "chart.js";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Register Chart.js components
// Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const DefectDataChart = () => {
//     const [chartData, setChartData] = useState(null);
//     const [selectedMonth, setSelectedMonth] = useState(null);
//     const [dailyChartData, setDailyChartData] = useState(null);

//     useEffect(() => {
//         fetchMonthlyData();
//     }, []);

//     const fetchMonthlyData = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/defect-data-entry/getall");
//             const monthlyData = processMonthlyData(response.data);
//             setChartData(monthlyData);
//         } catch (error) {
//             console.error("Error fetching defect data:", error);
//         }
//     };

//     const processMonthlyData = (data) => {
//         const months = [
//             "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//             "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//         ];

//         let monthCounts = Array(12).fill(0);

//         data.forEach(entry => {
//             const monthIndex = new Date(entry.createdAt).getMonth();
//             monthCounts[monthIndex]++;
//         });

//         return {
//             labels: months,
//             datasets: [
//                 {
//                     label: "Defects Count",
//                     data: monthCounts,
//                     backgroundColor: "rgba(255, 99, 132, 0.6)",
//                     borderColor: "rgba(255, 99, 132, 1)",
//                     borderWidth: 1,
//                 }
//             ],
//         };
//     };

//     const handleMonthClick = async (month) => {
//         setSelectedMonth(month);
//         try {
//             const response = await axios.get(`http://localhost:5000/api/defect-data-entry/monthly?month=${month}`);
//             const dailyData = processDailyData(response.data);
//             setDailyChartData(dailyData);
//         } catch (error) {
//             console.error("Error fetching daily shift data:", error);
//         }
//     };

//     const processDailyData = (data) => {
//         const days = Array.from({ length: 31 }, (_, i) => i + 1);
//         let shift1Counts = Array(31).fill(0);
//         let shift2Counts = Array(31).fill(0);
//         let shift3Counts = Array(31).fill(0);

//         data.forEach(entry => {
//             const dayIndex = new Date(entry.createdAt).getDate() - 1;
//             if (entry.shift === "Shift 1") shift1Counts[dayIndex]++;
//             if (entry.shift === "Shift 2") shift2Counts[dayIndex]++;
//             if (entry.shift === "Shift 3") shift3Counts[dayIndex]++;
//         });

//         return {
//             labels: days,
//             datasets: [
//                 {
//                     label: "Shift 1",
//                     data: shift1Counts,
//                     backgroundColor: "rgba(255, 99, 132, 0.6)",
//                     borderColor: "rgba(255, 99, 132, 1)",
//                     borderWidth: 1,
//                 },
//                 {
//                     label: "Shift 2",
//                     data: shift2Counts,
//                     backgroundColor: "rgba(54, 162, 235, 0.6)",
//                     borderColor: "rgba(54, 162, 235, 1)",
//                     borderWidth: 1,
//                 },
//                 {
//                     label: "Shift 3",
//                     data: shift3Counts,
//                     backgroundColor: "rgba(75, 192, 192, 0.6)",
//                     borderColor: "rgba(75, 192, 192, 1)",
//                     borderWidth: 1,
//                 }
//             ],
//         };
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4">Monthly Defect Data</h2>
//             <div className="row">
//                 <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-12">
//                     {chartData ? (
//                         <Bar
//                             data={chartData}
//                             options={{
//                                 responsive: true,
//                                 onClick: (event, elements) => {
//                                     if (elements.length > 0) {
//                                         const index = elements[0].index;
//                                         const month = chartData.labels[index];
//                                         handleMonthClick(month);
//                                     }
//                                 },
//                                 plugins: {
//                                     legend: { position: "top" },
//                                     title: { display: true, text: "Monthly Defect Count" }
//                                 },
//                                 scales: {
//                                     y: { beginAtZero: true },
//                                     x: { title: { display: true, text: "Months" } }
//                                 }
//                             }}
//                         />
//                     ) : (
//                         <p className="text-center">Loading chart...</p>
//                     )}
//                 </div>
//             </div>

//             {selectedMonth && (
//                 <div className="mt-5">
//                     <h3 className="text-center">Daily Shift-wise Data for {selectedMonth}</h3>
//                     <div className="row">
//                         <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-12">
//                             {dailyChartData ? (
//                                 <Bar
//                                     data={dailyChartData}
//                                     options={{
//                                         responsive: true,
//                                         plugins: {
//                                             legend: { position: "top" },
//                                             title: { display: true, text: `Shift-wise Defect Count for ${selectedMonth}` }
//                                         },
//                                         scales: {
//                                             y: { beginAtZero: true },
//                                             x: { title: { display: true, text: "Days of the Month" } }
//                                         }
//                                     }}
//                                 />
//                             ) : (
//                                 <p className="text-center">Loading shift-wise data...</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DefectDataChart;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const DefectChart = () => {
//   const [defectData, setDefectData] = useState([]);
//   const [monthlyData, setMonthlyData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [dailyData, setDailyData] = useState({});

//   useEffect(() => {
//     fetchDefectData();
//   }, []);

//   const fetchDefectData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/defect-data-entry/getall"
//       );
//       processDefectData(response.data);
//     } catch (error) {
//       console.error("Error fetching defect data:", error);
//     }
//   };

//   const processDefectData = (data) => {
//     const monthlyCounts = {};
//     const dailyCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const year = date.getFullYear();
//       const month = date.getMonth(); // 0 = Jan, 1 = Feb, ...
//       const day = date.getDate();

//       // Initialize if not exists
//       if (!monthlyCounts[month]) {
//         monthlyCounts[month] = 0;
//       }
//       monthlyCounts[month] += 1;

//       // Store daily counts per month
//       if (!dailyCounts[month]) {
//         dailyCounts[month] = {};
//       }
//       if (!dailyCounts[month][day]) {
//         dailyCounts[month][day] = 0;
//       }
//       dailyCounts[month][day] += 1;
//     });

//     setMonthlyData(monthlyCounts);
//     setDailyData(dailyCounts);
//   };

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Defect Count",
//         data: months.map((_, index) => monthlyData[index] || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const dailyChartData = {
//     labels: selectedMonth
//       ? Object.keys(dailyData[selectedMonth]).map((day) => `Day ${day}`)
//       : [],
//     datasets: [
//       {
//         label: "Defect Count",
//         data: selectedMonth
//           ? Object.values(dailyData[selectedMonth])
//           : [],
//         backgroundColor: "rgba(54, 162, 235, 0.6)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col>
//           <h3 className="text-center">Monthly Defect Data</h3>
//           <Bar data={monthlyChartData} />
//         </Col>
//       </Row>

//       <Row className="mt-3">
//         {months.map((month, index) => (
//           <Col xs={6} sm={4} md={3} lg={2} className="mb-2 text-center" key={index}>
//             <Button
//               variant="primary"
//               className="w-100"
//               onClick={() => setSelectedMonth(index)}
//             >
//               {month}
//             </Button>
//           </Col>
//         ))}
//       </Row>

//       {selectedMonth !== null && (
//         <Row className="mt-4">
//           <Col>
//             <h3 className="text-center">{months[selectedMonth]} Daily Defect Data</h3>
//             <Bar data={dailyChartData} />
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default DefectChart;


// perfect two charts 
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const DefectChart = () => {
//   const [defectData, setDefectData] = useState([]);
//   const [monthlyData, setMonthlyData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [dailyData, setDailyData] = useState({});

//   useEffect(() => {
//     fetchDefectData();
//   }, []);

//   const fetchDefectData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/defect-data-entry/getall"
//       );
//       console.log("Fetched Data:", response.data); // Debugging
//       processDefectData(response.data);
//     } catch (error) {
//       console.error("Error fetching defect data:", error);
//     }
//   };

//   const processDefectData = (data) => {
//     const monthlyCounts = {};
//     const dailyCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const month = date.getMonth(); // 0 = Jan, 1 = Feb, etc.
//       const day = date.getDate();

//       // Count defects per month
//       if (!monthlyCounts[month]) {
//         monthlyCounts[month] = 0;
//       }
//       monthlyCounts[month] += 1;

//       // Count defects per day for each month
//       if (!dailyCounts[month]) {
//         dailyCounts[month] = {};
//       }
//       if (!dailyCounts[month][day]) {
//         dailyCounts[month][day] = 0;
//       }
//       dailyCounts[month][day] += 1;
//     });

//     console.log("Monthly Data:", monthlyCounts); // Debugging
//     console.log("Daily Data:", dailyCounts); // Debugging

//     setMonthlyData(monthlyCounts);
//     setDailyData(dailyCounts);
//   };

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   // Monthly Chart Data
//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Defect Count",
//         data: months.map((_, index) => monthlyData[index] || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Daily Chart Data
//   const dailyChartData = {
//     labels: selectedMonth !== null && dailyData[selectedMonth]
//       ? Object.keys(dailyData[selectedMonth]).map((day) => `Day ${day}`)
//       : [],
//     datasets: [
//       {
//         label: "Defect Count",
//         data: selectedMonth !== null && dailyData[selectedMonth]
//           ? Object.values(dailyData[selectedMonth])
//           : [],
//         backgroundColor: "rgba(54, 162, 235, 0.6)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col>
//           <h3 className="text-center">Monthly Defect Data</h3>
//           <Bar data={monthlyChartData} />
//         </Col>
//       </Row>

//       <Row className="mt-3">
//         {months.map((month, index) => (
//           <Col xs={6} sm={4} md={3} lg={2} className="mb-2 text-center" key={index}>
//             <Button
//               variant="primary"
//               className="w-100"
//               onClick={() => {
//                 setSelectedMonth(index);
//                 console.log("Selected Month:", months[index], "Data:", dailyData[index]); // Debugging
//               }}
//             >
//               {month}
//             </Button>
//           </Col>
//         ))}
//       </Row>

//       {selectedMonth !== null && dailyData[selectedMonth] && Object.keys(dailyData[selectedMonth]).length > 0 ? (
//         <Row className="mt-4">
//           <Col>
//             <h3 className="text-center">{months[selectedMonth]} Daily Defect Data</h3>
//             <Bar data={dailyChartData} />
//           </Col>
//         </Row>
//       ) : selectedMonth !== null ? (
//         <Row className="mt-4">
//           <Col>
//             <h4 className="text-center text-danger">
//               No Defect Data Available for {months[selectedMonth]}
//             </h4>
//           </Col>
//         </Row>
//       ) : null}
//     </Container>
//   );
// };

// export default DefectChart;






// superb 
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const DefectChart = () => {
//   const [monthlyData, setMonthlyData] = useState({});
//   const [dailyData, setDailyData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   useEffect(() => {
//     fetchDefectData();
//   }, []);

//   const fetchDefectData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/defect-data-entry/getall");
//       processDefectData(response.data);
//     } catch (error) {
//       console.error("Error fetching defect data:", error);
//     }
//   };

//   const processDefectData = (data) => {
//     const monthlyCounts = {};
//     const dailyCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const month = date.getMonth(); // 0 = Jan, 1 = Feb, etc.
//       const day = date.getDate();

//       // Count defects per month
//       if (!monthlyCounts[month]) {
//         monthlyCounts[month] = 0;
//       }
//       monthlyCounts[month] += 1;

//       // Count defects per day for each month
//       if (!dailyCounts[month]) {
//         dailyCounts[month] = {};
//       }
//       if (!dailyCounts[month][day]) {
//         dailyCounts[month][day] = 0;
//       }
//       dailyCounts[month][day] += 1;
//     });

//     setMonthlyData(monthlyCounts);
//     setDailyData(dailyCounts);
//   };

//   const months = [
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ];

//   // Get max value to fix Y-axis range dynamically
//   const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10); // Ensure a minimum range of 10
//   const maxDailyValue = selectedMonth !== null && dailyData[selectedMonth]
//     ? Math.max(...Object.values(dailyData[selectedMonth]), 10)
//     : 10;

//   // Monthly Chart Data
//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Defect Count",
//         data: months.map((_, index) => monthlyData[index] || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Daily Chart Data
//   const dailyChartData = selectedMonth !== null && dailyData[selectedMonth]
//     ? {
//         labels: Object.keys(dailyData[selectedMonth]).map((day) => `Day ${day}`),
//         datasets: [
//           {
//             label: `${months[selectedMonth]} Daily Defect Count`,
//             data: Object.values(dailyData[selectedMonth]),
//             backgroundColor: "rgba(54, 162, 235, 0.6)",
//             borderColor: "rgba(54, 162, 235, 1)",
//             borderWidth: 1,
//           },
//         ],
//       }
//     : null;

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: selectedMonth === null ? maxMonthlyValue : maxDailyValue, // Set max dynamically
//         ticks: {
//           stepSize: Math.ceil((selectedMonth === null ? maxMonthlyValue : maxDailyValue) / 5), // Better spacing
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//     },
//     onClick: (event, elements) => {
//       if (elements.length > 0) {
//         const index = elements[0].index;
//         if (selectedMonth === null) {
//           setSelectedMonth(index); // Open daily chart when clicking on month bar
//         }
//       }
//     },
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col>
//           <h3 className="text-center">
//             {selectedMonth === null ? "Monthly Defect Data" : `${months[selectedMonth]} Daily Defect Data`}
//           </h3>
//           <div style={{ height: "400px" }}> {/* Fix chart height to prevent stretch */}
//             <Bar
//               data={selectedMonth === null ? monthlyChartData : dailyChartData}
//               options={chartOptions}
//             />
//           </div>
//         </Col>
//       </Row>

//       <Row className="mt-3 text-center">
//         {selectedMonth !== null && (
//           <Col>
//             <Button variant="secondary" onClick={() => setSelectedMonth(null)}>
//               Back to Monthly Chart
//             </Button>
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default DefectChart;



// shift wise 
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const DefectChart = () => {
//   const [monthlyData, setMonthlyData] = useState({});
//   const [dailyData, setDailyData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   useEffect(() => {
//     fetchDefectData();
//   }, []);

//   const fetchDefectData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/defect-data-entry/getall");
//       processDefectData(response.data);
//     } catch (error) {
//       console.error("Error fetching defect data:", error);
//     }
//   };

//   const processDefectData = (data) => {
//     const monthlyCounts = {};
//     const dailyCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const month = date.getMonth(); // 0 = Jan, 1 = Feb, etc.
//       const day = date.getDate();
//       const shift = entry.shift || "Shift 1"; // Default Shift 1 if not provided

//       // Count defects per month
//       if (!monthlyCounts[month]) {
//         monthlyCounts[month] = 0;
//       }
//       monthlyCounts[month] += 1;

//       // Count defects per day and shift
//       if (!dailyCounts[month]) {
//         dailyCounts[month] = {};
//       }
//       if (!dailyCounts[month][day]) {
//         dailyCounts[month][day] = { "Shift 1": 0, "Shift 2": 0, "Shift 3": 0 };
//       }
//       dailyCounts[month][day][shift] += 1;
//     });

//     setMonthlyData(monthlyCounts);
//     setDailyData(dailyCounts);
//   };

//   const months = [
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ];

//   const shiftColors = {
//     "Shift 1": "rgba(255, 99, 132, 0.6)", // Red
//     "Shift 2": "rgba(54, 162, 235, 0.6)", // Blue
//     "Shift 3": "rgba(75, 192, 192, 0.6)", // Green
//   };

//   const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10);
//   const maxDailyValue = selectedMonth !== null && dailyData[selectedMonth]
//     ? Math.max(...Object.values(dailyData[selectedMonth]).flatMap(day => Object.values(day)), 10)
//     : 10;

//   // Monthly Chart Data
//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Defect Count",
//         data: months.map((_, index) => monthlyData[index] || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Daily Shift-Wise Chart Data
//   const dailyChartData = selectedMonth !== null && dailyData[selectedMonth]
//     ? {
//         labels: Object.keys(dailyData[selectedMonth]).map((day) => `Day ${day}`),
//         datasets: ["Shift 1", "Shift 2", "Shift 3"].map((shift) => ({
//           label: shift,
//           data: Object.keys(dailyData[selectedMonth]).map(
//             (day) => dailyData[selectedMonth][day][shift] || 0
//           ),
//           backgroundColor: shiftColors[shift],
//           borderColor: shiftColors[shift].replace("0.6", "1"), // Darker border
//           borderWidth: 1,
//         })),
//       }
//     : null;

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: selectedMonth === null ? maxMonthlyValue : maxDailyValue,
//         ticks: {
//           stepSize: Math.ceil((selectedMonth === null ? maxMonthlyValue : maxDailyValue) / 5),
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//     },
//     onClick: (event, elements) => {
//       if (elements.length > 0) {
//         const index = elements[0].index;
//         if (selectedMonth === null) {
//           setSelectedMonth(index);
//         }
//       }
//     },
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col>
//           <h3 className="text-center">
//             {selectedMonth === null ? "Monthly Defect Data" : `${months[selectedMonth]} Shift-Wise Defect Data`}
//           </h3>
//           <div style={{ height: "400px" }}>
//             <Bar
//               data={selectedMonth === null ? monthlyChartData : dailyChartData}
//               options={chartOptions}
//             />
//           </div>
//         </Col>
//       </Row>

//       <Row className="mt-3 text-center">
//         {selectedMonth !== null && (
//           <Col>
//             <Button variant="secondary" onClick={() => setSelectedMonth(null)}>
//               Back to Monthly Chart
//             </Button>
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default DefectChart;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar, Pie } from "react-chartjs-2";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// const DefectChart = () => {
//   const [monthlyData, setMonthlyData] = useState({});
//   const [dailyData, setDailyData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [defectTypes, setDefectTypes] = useState({});

//   useEffect(() => {
//     fetchDefectData();
//   }, []);

//   const fetchDefectData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/defect-data-entry/getall");
//       processDefectData(response.data);
//     } catch (error) {
//       console.error("Error fetching defect data:", error);
//     }
//   };

//   const processDefectData = (data) => {
//     const monthlyCounts = {};
//     const dailyCounts = {};
//     const defectTypeCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const month = date.getMonth(); // 0 = Jan, 1 = Feb, etc.
//       const day = date.getDate();
//       const shift = entry.shift || "Shift 1"; // Default to Shift 1 if not provided
//       const defectType = entry.defectType || "Unknown"; // Default defect type

//       // Count defects per month
//       if (!monthlyCounts[month]) {
//         monthlyCounts[month] = 0;
//       }
//       monthlyCounts[month] += 1;

//       // Count defects per day and shift
//       if (!dailyCounts[month]) {
//         dailyCounts[month] = {};
//       }
//       if (!dailyCounts[month][day]) {
//         dailyCounts[month][day] = { "Shift 1": 0, "Shift 2": 0, "Shift 3": 0 };
//       }
//       dailyCounts[month][day][shift] += 1;

//       // Count defect types
//       if (!defectTypeCounts[defectType]) {
//         defectTypeCounts[defectType] = 0;
//       }
//       defectTypeCounts[defectType] += 1;
//     });

//     setMonthlyData(monthlyCounts);
//     setDailyData(dailyCounts);
//     setDefectTypes(defectTypeCounts);
//   };

//   const months = [
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ];

//   const shiftColors = {
//     "Shift 1": "rgba(255, 99, 132, 0.6)", // Red
//     "Shift 2": "rgba(54, 162, 235, 0.6)", // Blue
//     "Shift 3": "rgba(75, 192, 192, 0.6)", // Green
//   };

//   const pieColors = [
//     "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
//     "#FF9F40", "#8D99AE", "#2B2D42", "#D90429", "#EF233C"
//   ];

//   const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10);
//   const maxDailyValue = selectedMonth !== null && dailyData[selectedMonth]
//     ? Math.max(...Object.values(dailyData[selectedMonth]).flatMap(day => Object.values(day)), 10)
//     : 10;

//   // Monthly Chart Data
//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Defect Count",
//         data: months.map((_, index) => monthlyData[index] || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Daily Shift-Wise Chart Data
//   const dailyChartData = selectedMonth !== null && dailyData[selectedMonth]
//     ? {
//         labels: Object.keys(dailyData[selectedMonth]).map((day) => `Day ${day}`),
//         datasets: ["Shift 1", "Shift 2", "Shift 3"].map((shift) => ({
//           label: shift,
//           data: Object.keys(dailyData[selectedMonth]).map(
//             (day) => dailyData[selectedMonth][day][shift] || 0
//           ),
//           backgroundColor: shiftColors[shift],
//           borderColor: shiftColors[shift].replace("0.6", "1"), // Darker border
//           borderWidth: 1,
//         })),
//       }
//     : null;

//   // Defect Type Pie Chart Data
//   const pieChartData = {
//     labels: Object.keys(defectTypes),
//     datasets: [
//       {
//         label: "Defect Count",
//         data: Object.values(defectTypes),
//         backgroundColor: pieColors.slice(0, Object.keys(defectTypes).length),
//         borderColor: "#FFFFFF",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: selectedMonth === null ? maxMonthlyValue : maxDailyValue,
//         ticks: {
//           stepSize: Math.ceil((selectedMonth === null ? maxMonthlyValue : maxDailyValue) / 5),
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//     },
//     onClick: (event, elements) => {
//       if (elements.length > 0) {
//         const index = elements[0].index;
//         if (selectedMonth === null) {
//           setSelectedMonth(index);
//         }
//       }
//     },
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col md={8}>
//           <h3 className="text-center">
//             {selectedMonth === null ? "Monthly Defect Data" : `${months[selectedMonth]} Shift-Wise Defect Data`}
//           </h3>
//           <div style={{ height: "400px" }}>
//             <Bar
//               data={selectedMonth === null ? monthlyChartData : dailyChartData}
//               options={chartOptions}
//             />
//           </div>
//         </Col>
//         <Col md={4}>
//           <h3 className="text-center">Defect Types</h3>
//           <div style={{ height: "350px" }}>
//             <Pie data={pieChartData} />
//           </div>
//         </Col>
//       </Row>

//       <Row className="mt-3 text-center">
//         {selectedMonth !== null && (
//           <Col>
//             <Button variant="secondary" onClick={() => setSelectedMonth(null)}>
//               Back to Monthly Chart
//             </Button>
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default DefectChart;


// click on bar daily pie 
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar, Pie } from "react-chartjs-2";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const DefectChart = () => {
//   const [monthlyData, setMonthlyData] = useState({});
//   const [dailyData, setDailyData] = useState({});
//   const [defectTypeData, setDefectTypeData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [selectedDay, setSelectedDay] = useState(null);

//   useEffect(() => {
//     fetchDefectData();
//   }, []);

//   const fetchDefectData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/defect-data-entry/getall");
//       processDefectData(response.data);
//     } catch (error) {
//       console.error("Error fetching defect data:", error);
//     }
//   };

//   const processDefectData = (data) => {
//     const monthlyCounts = {};
//     const dailyCounts = {};
//     const defectTypeCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const month = date.getMonth();
//       const day = date.getDate();
//       const shift = entry.shift || "Shift 1";
//       const defectType = entry.defect || "Unknown";
//       const quantity = entry.quantity || 0;

//       // Count defects per month
//       monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

//       // Count defects per day and shift
//       if (!dailyCounts[month]) dailyCounts[month] = {};
//       if (!dailyCounts[month][day]) {
//         dailyCounts[month][day] = { "Shift 1": 0, "Shift 2": 0, "Shift 3": 0 };
//       }
//       dailyCounts[month][day][shift] += 1;

//       // Count defects by type for the selected day
//       if (!defectTypeCounts[month]) defectTypeCounts[month] = {};
//       if (!defectTypeCounts[month][day]) defectTypeCounts[month][day] = {};
//       defectTypeCounts[month][day][defectType] = (defectTypeCounts[month][day][defectType] || 0) + quantity;
//     });

//     setMonthlyData(monthlyCounts);
//     setDailyData(dailyCounts);
//     setDefectTypeData(defectTypeCounts);
//   };

//   const months = [
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ];

//   const shiftColors = {
//     "Shift 1": "rgba(255, 99, 132, 0.6)",
//     "Shift 2": "rgba(54, 162, 235, 0.6)",
//     "Shift 3": "rgba(75, 192, 192, 0.6)",
//   };

//   const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10);
//   const maxDailyValue = selectedMonth !== null && dailyData[selectedMonth]
//     ? Math.max(...Object.values(dailyData[selectedMonth]).flatMap(day => Object.values(day)), 10)
//     : 10;

//   // Monthly Chart Data
//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Defect Count",
//         data: months.map((_, index) => monthlyData[index] || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Daily Shift-Wise Chart Data
//   const dailyChartData = selectedMonth !== null && dailyData[selectedMonth]
//     ? {
//         labels: Object.keys(dailyData[selectedMonth]).map((day) => `Day ${day}`),
//         datasets: ["Shift 1", "Shift 2", "Shift 3"].map((shift) => ({
//           label: shift,
//           data: Object.keys(dailyData[selectedMonth]).map(
//             (day) => dailyData[selectedMonth][day][shift] || 0
//           ),
//           backgroundColor: shiftColors[shift],
//           borderColor: shiftColors[shift].replace("0.6", "1"),
//           borderWidth: 1,
//         })),
//       }
//     : null;

//   // Fix: Ensure Pie Chart data is available before rendering
//   const dailyPieChartData =
//     selectedMonth !== null &&
//     selectedDay !== null &&
//     defectTypeData[selectedMonth] &&
//     defectTypeData[selectedMonth][selectedDay]
//       ? {
//           labels: Object.keys(defectTypeData[selectedMonth][selectedDay]),
//           datasets: [
//             {
//               data: Object.values(defectTypeData[selectedMonth][selectedDay]),
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
//                 "#E53935", "#1E88E5", "#D81B60", "#43A047", "#FF9800"
//               ],
//             },
//           ],
//         }
//       : null;

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: selectedMonth === null ? maxMonthlyValue : maxDailyValue,
//         ticks: {
//           stepSize: Math.ceil((selectedMonth === null ? maxMonthlyValue : maxDailyValue) / 5),
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//     },
//     onClick: (event, elements) => {
//       if (elements.length > 0) {
//         const index = elements[0].index;
//         if (selectedMonth === null) {
//           setSelectedMonth(index);
//         } else if (selectedMonth !== null && selectedDay === null) {
//           const days = Object.keys(dailyData[selectedMonth]);
//           if (days[index]) setSelectedDay(days[index]); // Select the clicked day
//         }
//       }
//     },
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col lg={6}>
//           <h3 className="text-center">
//             {selectedMonth === null
//               ? "Monthly Defect Data"
//               : `${months[selectedMonth]} Shift-Wise Defect Data`}
//           </h3>
//           <div style={{ height: "400px" }}>
//             <Bar
//               data={selectedMonth === null ? monthlyChartData : dailyChartData}
//               options={chartOptions}
//             />
//           </div>
//         </Col>

//         {selectedDay !== null && dailyPieChartData && (
//           <Col lg={6}>
//             <Card className="shadow p-3">
//               <h3 className="text-center">Defect Type Breakdown (Day {selectedDay})</h3>
//               <div style={{ height: "400px" }}>
//                 <Pie data={dailyPieChartData} options={{ responsive: true }} />
//               </div>
//             </Card>
//           </Col>
//         )}
//       </Row>

//       <Row className="mt-3 text-center">
//         {selectedMonth !== null && (
//           <Col>
//             <Button variant="secondary" onClick={() => setSelectedMonth(null)}>
//               Back to Monthly Chart
//             </Button>
//           </Col>
//         )}
//         {selectedDay !== null && (
//           <Col>
//             <Button variant="secondary" onClick={() => setSelectedDay(null)}>
//               Back to Shift Data
//             </Button>
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default DefectChart;


// pie chart 
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar, Pie } from "react-chartjs-2";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const DefectChart = () => {
//   const [monthlyData, setMonthlyData] = useState({});
//   const [dailyData, setDailyData] = useState({});
//   const [defectTypeData, setDefectTypeData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   useEffect(() => {
//     fetchDefectData();
//   }, []);

//   const fetchDefectData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/defect-data-entry/getall");
//       processDefectData(response.data);
//     } catch (error) {
//       console.error("Error fetching defect data:", error);
//     }
//   };

//   const processDefectData = (data) => {
//     const monthlyCounts = {};
//     const dailyCounts = {};
//     const defectTypeCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const month = date.getMonth();
//       const defectType = entry.defect || "Unknown";
//       const quantity = entry.quantity || 0;

//       // Count defects per month
//       monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

//       // Count defects by type for the selected month
//       if (!defectTypeCounts[month]) defectTypeCounts[month] = {};
//       defectTypeCounts[month][defectType] = (defectTypeCounts[month][defectType] || 0) + quantity;
//     });

//     setMonthlyData(monthlyCounts);
//     setDefectTypeData(defectTypeCounts);
//   };

//   const months = [
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ];

//   const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10);

//   // Monthly Chart Data
//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Defect Count",
//         data: months.map((_, index) => monthlyData[index] || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Pie Chart Data for the selected month
//   const pieChartData =
//     selectedMonth !== null && defectTypeData[selectedMonth]
//       ? {
//           labels: Object.keys(defectTypeData[selectedMonth]),
//           datasets: [
//             {
//               data: Object.values(defectTypeData[selectedMonth]),
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
//                 "#E53935", "#1E88E5", "#D81B60", "#43A047", "#FF9800"
//               ],
//             },
//           ],
//         }
//       : null;

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: maxMonthlyValue,
//         ticks: {
//           stepSize: Math.ceil(maxMonthlyValue / 5),
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//     },
//     onClick: (event, elements) => {
//       if (elements.length > 0) {
//         const index = elements[0].index;
//         setSelectedMonth(index);
//       }
//     },
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col lg={6}>
//           <h3 className="text-center">
//             {selectedMonth === null ? "Monthly Defect Data" : `${months[selectedMonth]} Defect Breakdown`}
//           </h3>
//           <div style={{ height: "400px" }}>
//             <Bar data={monthlyChartData} options={chartOptions} />
//           </div>
//         </Col>

//         {selectedMonth !== null && pieChartData && (
//           <Col lg={6}>
//             <Card className="shadow p-3">
//               <h3 className="text-center">Defect Type Breakdown - {months[selectedMonth]}</h3>
//               <div style={{ height: "400px" }}>
//                 <Pie data={pieChartData} options={{ responsive: true }} />
//               </div>
//             </Card>
//           </Col>
//         )}
//       </Row>

//       <Row className="mt-3 text-center">
//         {selectedMonth !== null && (
//           <Col>
//             <Button variant="secondary" onClick={() => setSelectedMonth(null)}>
//               Back to Monthly Chart
//             </Button>
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default DefectChart;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar, Pie } from "react-chartjs-2";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const DefectChart = () => {
//   const [monthlyData, setMonthlyData] = useState({});
//   const [dailyData, setDailyData] = useState({});
//   const [defectTypeData, setDefectTypeData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   useEffect(() => {
//     fetchDefectData();
//   }, []);

//   const fetchDefectData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/defect-data-entry/getall");
//       processDefectData(response.data);
//     } catch (error) {
//       console.error("Error fetching defect data:", error);
//     }
//   };

//   const processDefectData = (data) => {
//     const monthlyCounts = {};
//     const dailyCounts = {};
//     const defectTypeCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const month = date.getMonth();
//       const day = date.getDate();
//       const defectType = entry.defect || "Unknown";
//       const quantity = entry.quantity || 0;

//       // Count defects per month
//       monthlyCounts[month] = (monthlyCounts[month] || 0) + quantity;

//       // Count defects per day
//       if (!dailyCounts[month]) dailyCounts[month] = {};
//       dailyCounts[month][day] = (dailyCounts[month][day] || 0) + quantity;

//       // Count defects by type for the selected month
//       if (!defectTypeCounts[month]) defectTypeCounts[month] = {};
//       defectTypeCounts[month][defectType] = (defectTypeCounts[month][defectType] || 0) + quantity;
//     });

//     setMonthlyData(monthlyCounts);
//     setDailyData(dailyCounts);
//     setDefectTypeData(defectTypeCounts);
//   };

//   const months = [
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ];

//   const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10);
//   const maxDailyValue =
//     selectedMonth !== null && dailyData[selectedMonth]
//       ? Math.max(...Object.values(dailyData[selectedMonth]), 10)
//       : 10;

//   // Monthly Chart Data
//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Total Defects",
//         data: months.map((_, index) => monthlyData[index] || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Daily Chart Data (Shows when a month is clicked)
//   const dailyChartData =
//     selectedMonth !== null && dailyData[selectedMonth]
//       ? {
//           labels: Object.keys(dailyData[selectedMonth]).map((day) => `Day ${day}`),
//           datasets: [
//             {
//               label: `Daily Defects in ${months[selectedMonth]}`,
//               data: Object.values(dailyData[selectedMonth]),
//               backgroundColor: "rgba(54, 162, 235, 0.6)",
//               borderColor: "rgba(54, 162, 235, 1)",
//               borderWidth: 1,
//             },
//           ],
//         }
//       : null;

//   // Pie Chart Data for the selected month
//   const pieChartData =
//     selectedMonth !== null && defectTypeData[selectedMonth]
//       ? {
//           labels: Object.keys(defectTypeData[selectedMonth]),
//           datasets: [
//             {
//               data: Object.values(defectTypeData[selectedMonth]),
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
//                 "#E53935", "#1E88E5", "#D81B60", "#43A047", "#FF9800"
//               ],
//             },
//           ],
//         }
//       : null;

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: selectedMonth === null ? maxMonthlyValue : maxDailyValue,
//         ticks: {
//           stepSize: Math.ceil((selectedMonth === null ? maxMonthlyValue : maxDailyValue) / 5),
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//     },
//     onClick: (event, elements) => {
//       if (elements.length > 0) {
//         const index = elements[0].index;
//         setSelectedMonth(index);
//       }
//     },
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col lg={6}>
//           <h3 className="text-center">
//             {selectedMonth === null ? "Monthly Defect Data" : `Daily Defect Data - ${months[selectedMonth]}`}
//           </h3>
//           <div style={{ height: "400px" }}>
//             <Bar data={selectedMonth === null ? monthlyChartData : dailyChartData} options={chartOptions} />
//           </div>
//         </Col>

//         {selectedMonth !== null && pieChartData && (
//           <Col lg={6}>
//             <Card className="shadow p-3">
//               <h3 className="text-center">Defect Type Breakdown - {months[selectedMonth]}</h3>
//               <div style={{ height: "400px" }}>
//                 <Pie data={pieChartData} options={{ responsive: true }} />
//               </div>
//             </Card>
//           </Col>
//         )}
//       </Row>

//       <Row className="mt-3 text-center">
//         {selectedMonth !== null && (
//           <Col>
//             <Button variant="secondary" onClick={() => setSelectedMonth(null)}>
//               Back to Monthly Chart
//             </Button>
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default DefectChart;



// all working 
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar, Pie } from "react-chartjs-2";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartDataLabels
// );

// const DefectChart = () => {
//   const [monthlyData, setMonthlyData] = useState({});
//   const [dailyData, setDailyData] = useState({});
//   const [defectTypeData, setDefectTypeData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   useEffect(() => {
//     fetchDefectData();
//   }, []);

//   const fetchDefectData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/defect-data-entry/getall");
//       processDefectData(response.data);
//     } catch (error) {
//       console.error("Error fetching defect data:", error);
//     }
//   };

//   const processDefectData = (data) => {
//     const monthlyCounts = {};
//     const dailyCounts = {};
//     const defectTypeCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const month = date.getMonth();
//       const day = date.getDate();
//       const defectType = entry.defect || "Unknown";

//       // Count defects per month
//       monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

//       // Count defects per day (count occurrences, not quantity)
//       if (!dailyCounts[month]) dailyCounts[month] = {};
//       dailyCounts[month][day] = (dailyCounts[month][day] || 0) + 1; // Increment defect count per day

//       // Count defects by type for the selected month
//       if (!defectTypeCounts[month]) defectTypeCounts[month] = {};
//       defectTypeCounts[month][defectType] = (defectTypeCounts[month][defectType] || 0) + 1;
//     });

//     setMonthlyData(monthlyCounts);
//     setDailyData(dailyCounts);
//     setDefectTypeData(defectTypeCounts);
//   };

//   const months = [
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ];

//   const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10);
//   const maxDailyValue =
//     selectedMonth !== null && dailyData[selectedMonth]
//       ? Math.max(...Object.values(dailyData[selectedMonth]), 10)
//       : 10;

//   // Monthly Chart Data
//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Total Defects",
//         data: months.map((_, index) => monthlyData[index] || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Daily Chart Data (Shows when a month is clicked)
//   const dailyChartData =
//     selectedMonth !== null && dailyData[selectedMonth]
//       ? {
//           labels: Object.keys(dailyData[selectedMonth]).map((day) => `Day ${day}`),
//           datasets: [
//             {
//               label: `Total Defects per Day in ${months[selectedMonth]}`,
//               data: Object.values(dailyData[selectedMonth]),
//               backgroundColor: "rgba(54, 162, 235, 0.6)",
//               borderColor: "rgba(54, 162, 235, 1)",
//               borderWidth: 1,
//             },
//           ],
//         }
//       : null;

//   // Pie Chart Data for the selected month
//   const pieChartData =
//     selectedMonth !== null && defectTypeData[selectedMonth]
//       ? {
//           labels: Object.keys(defectTypeData[selectedMonth]),
//           datasets: [
//             {
//               data: Object.values(defectTypeData[selectedMonth]),
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
//                 "#E53935", "#1E88E5", "#D81B60", "#43A047", "#FF9800"
//               ],
//             },
//           ],
//         }
//       : null;

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: selectedMonth === null ? maxMonthlyValue : maxDailyValue,
//         ticks: {
//           stepSize: Math.ceil((selectedMonth === null ? maxMonthlyValue : maxDailyValue) / 5),
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//       datalabels: {
//         anchor: "end",
//         align: "top",
//         formatter: (value) => value, // Show actual defect count
//         font: {
//           weight: "bold",
//           size: 12,
//         },
//       },
//     },
//     onClick: (event, elements) => {
//       if (elements.length > 0) {
//         const index = elements[0].index;
//         setSelectedMonth(index);
//       }
//     },
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col lg={8} className="border">
//           <h3 className="text-center">
//             {selectedMonth === null ? "Monthly Defect Data" : `Daily Defect Data - ${months[selectedMonth]}`}
//           </h3>
//           <div style={{ height: "400px" }}>
//             <Bar
//               data={selectedMonth === null ? monthlyChartData : dailyChartData}
//               options={chartOptions}
//             />
//           </div>
//         </Col>

//         {selectedMonth !== null && pieChartData && (
//           <Col lg={4}>
//             <Card className=" p-3">
//               <h3 className="text-center">Defect Type Breakdown - {months[selectedMonth]}</h3>
//               <div style={{ height: "400px" }}>
//                 <Pie data={pieChartData} options={{ responsive: true }} />
//               </div>
//             </Card>
//           </Col>
//         )}
//       </Row>

//       <Row className="mt-3 text-center">
//         {selectedMonth !== null && (
//           <Col>
//             <Button variant="secondary" onClick={() => setSelectedMonth(null)}>
//               Back to Monthly Chart
//             </Button>
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default DefectChart;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar, Pie } from "react-chartjs-2";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartDataLabels
// );

// const DefectChart = () => {
//   const [monthlyData, setMonthlyData] = useState({});
//   const [dailyData, setDailyData] = useState({});
//   const [shiftData, setShiftData] = useState({});
//   const [defectTypeData, setDefectTypeData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   useEffect(() => {
//     fetchDefectData();
//   }, []);

//   const fetchDefectData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/defect-data-entry/getall");
//       processDefectData(response.data);
//     } catch (error) {
//       console.error("Error fetching defect data:", error);
//     }
//   };

//   const processDefectData = (data) => {
//     const monthlyCounts = {};
//     const dailyCounts = {};
//     const shiftCounts = {}; // For shift-wise defect data
//     const defectTypeCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const month = date.getMonth();
//       const day = date.getDate();
//       const shift = entry.shift || "Unknown"; // Assuming shift field is present
//       const defectType = entry.defect || "Unknown";

//       // Count defects per month
//       monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

//       // Initialize daily and shift counts if not already present
//       if (!dailyCounts[month]) dailyCounts[month] = {};
//       if (!dailyCounts[month][day]) dailyCounts[month][day] = 0;
//       if (!shiftCounts[month]) shiftCounts[month] = {};
//       if (!shiftCounts[month][day]) shiftCounts[month][day] = { Shift1: 0, Shift2: 0, Shift3: 0 };

//       // Increment daily and shift-wise counts
//       dailyCounts[month][day]++;
//       if (shift === "Shift 1") shiftCounts[month][day].Shift1++;
//       if (shift === "Shift 2") shiftCounts[month][day].Shift2++;
//       if (shift === "Shift 3") shiftCounts[month][day].Shift3++;

//       // Count defects by type for the selected month
//       if (!defectTypeCounts[month]) defectTypeCounts[month] = {};
//       defectTypeCounts[month][defectType] = (defectTypeCounts[month][defectType] || 0) + 1;
//     });

//     setMonthlyData(monthlyCounts);
//     setDailyData(dailyCounts);
//     setShiftData(shiftCounts);
//     setDefectTypeData(defectTypeCounts);
//   };

//   const months = [
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ];

//   const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10);
//   const maxDailyValue =
//     selectedMonth !== null && dailyData[selectedMonth]
//       ? Math.max(...Object.values(dailyData[selectedMonth]), 10)
//       : 10;

//   // Monthly Chart Data
//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Total Defects",
//         data: months.map((_, index) => monthlyData[index] || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Shift-wise daily chart data
//   const dailyShiftChartData =
//     selectedMonth !== null && shiftData[selectedMonth]
//       ? {
//           labels: Object.keys(shiftData[selectedMonth]).map((day) => `Day ${day}`),
//           datasets: [
//             {
//               label: "Shift 1",
//               data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift1),
//               backgroundColor: "rgba(54, 162, 235, 0.6)",
//             },
//             {
//               label: "Shift 2",
//               data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift2),
//               backgroundColor: "rgba(255, 206, 86, 0.6)",
//             },
//             {
//               label: "Shift 3",
//               data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift3),
//               backgroundColor: "rgba(75, 192, 192, 0.6)",
//             },
//           ],
//         }
//       : null;

//   // Pie Chart Data for the selected month
//   const pieChartData =
//     selectedMonth !== null && defectTypeData[selectedMonth]
//       ? {
//           labels: Object.keys(defectTypeData[selectedMonth]),
//           datasets: [
//             {
//               data: Object.values(defectTypeData[selectedMonth]),
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
//                 "#E53935", "#1E88E5", "#D81B60", "#43A047", "#FF9800"
//               ],
//             },
//           ],
//         }
//       : null;

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: selectedMonth === null ? maxMonthlyValue : maxDailyValue,
//         ticks: {
//           stepSize: Math.ceil((selectedMonth === null ? maxMonthlyValue : maxDailyValue) / 5),
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//       datalabels: {
//         anchor: "end",
//         align: "top",
//         formatter: (value) => value,
//         font: {
//           weight: "bold",
//           size: 12,
//         },
//       },
//     },
//     onClick: (event, elements) => {
//       if (elements.length > 0) {
//         const index = elements[0].index;
//         setSelectedMonth(index);
//       }
//     },
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col lg={8} className="border">
//           <h3 className="text-center">
//             {selectedMonth === null ? "Monthly Defect Data" : `Daily Defect Data - ${months[selectedMonth]}`}
//           </h3>
//           <div style={{ height: "400px" }}>
//             <Bar
//               data={selectedMonth === null ? monthlyChartData : dailyShiftChartData}
//               options={chartOptions}
//             />
//           </div>
//         </Col>

//         {selectedMonth !== null && pieChartData && (
//           <Col lg={4}>
//             <Card className="p-3">
//               <h3 className="text-center">Defect Type Breakdown - {months[selectedMonth]}</h3>
//               <div style={{ height: "400px" }}>
//                 <Pie data={pieChartData} options={{ responsive: true }} />
//               </div>
//             </Card>
//           </Col>
//         )}
//       </Row>

//       <Row className="mt-3 text-center">
//         {selectedMonth !== null && (
//           <Col>
//             <Button variant="secondary" onClick={() => setSelectedMonth(null)}>
//               Back to Monthly Chart
//             </Button>
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default DefectChart;

// run 
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar, Pie } from "react-chartjs-2";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartDataLabels
// );

// const DefectChart = () => {
//   const [monthlyData, setMonthlyData] = useState({});
//   const [dailyData, setDailyData] = useState({});
//   const [shiftData, setShiftData] = useState({});
//   const [defectTypeData, setDefectTypeData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   useEffect(() => {
//     fetchDefectData();
//   }, []);

//   const fetchDefectData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/defect-data-entry/getall");
//       processDefectData(response.data);
//     } catch (error) {
//       console.error("Error fetching defect data:", error);
//     }
//   };

//   const processDefectData = (data) => {
//     const monthlyCounts = {};
//     const dailyCounts = {};
//     const shiftCounts = {};
//     const defectTypeCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const month = date.getMonth();
//       const day = date.getDate();
//       const shift = entry.shift || "Unknown";
//       const defectType = entry.defect || "Unknown";

//       monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

//       if (!dailyCounts[month]) dailyCounts[month] = {};
//       if (!dailyCounts[month][day]) dailyCounts[month][day] = 0;
//       if (!shiftCounts[month]) shiftCounts[month] = {};
//       if (!shiftCounts[month][day]) shiftCounts[month][day] = { Shift1: 0, Shift2: 0, Shift3: 0 };

//       dailyCounts[month][day]++;
//       if (shift === "Shift 1") shiftCounts[month][day].Shift1++;
//       if (shift === "Shift 2") shiftCounts[month][day].Shift2++;
//       if (shift === "Shift 3") shiftCounts[month][day].Shift3++;

//       if (!defectTypeCounts[month]) defectTypeCounts[month] = {};
//       defectTypeCounts[month][defectType] = (defectTypeCounts[month][defectType] || 0) + 1;
//     });

//     setMonthlyData(monthlyCounts);
//     setDailyData(dailyCounts);
//     setShiftData(shiftCounts);
//     setDefectTypeData(defectTypeCounts);
//   };

//   const months = [
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ];

//   const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10);
//   const maxDailyValue =
//     selectedMonth !== null && dailyData[selectedMonth]
//       ? Math.max(...Object.values(dailyData[selectedMonth]), 10)
//       : 10;

//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Total Defects",
//         data: months.map((_, index) => monthlyData[index] || 0),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const dailyShiftChartData =
//     selectedMonth !== null && shiftData[selectedMonth]
//       ? {
//           labels: Object.keys(shiftData[selectedMonth]).map((day) => `Day ${day}`),
//           datasets: [
//             {
//               label: "Shift 1",
//               data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift1),
//               backgroundColor: "rgba(54, 162, 235, 0.6)",
//             },
//             {
//               label: "Shift 2",
//               data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift2),
//               backgroundColor: "rgba(255, 206, 86, 0.6)",
//             },
//             {
//               label: "Shift 3",
//               data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift3),
//               backgroundColor: "rgba(75, 192, 192, 0.6)",
//             },
//           ],
//         }
//       : null;

//   const pieChartData =
//     selectedMonth !== null && defectTypeData[selectedMonth]
//       ? {
//           labels: Object.keys(defectTypeData[selectedMonth]),
//           datasets: [
//             {
//               data: Object.values(defectTypeData[selectedMonth]),
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
//                 "#E53935", "#1E88E5", "#D81B60", "#43A047", "#FF9800"
//               ],
//             },
//           ],
//         }
//       : null;

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: selectedMonth === null ? maxMonthlyValue : maxDailyValue,
//         ticks: {
//           stepSize: Math.ceil((selectedMonth === null ? maxMonthlyValue : maxDailyValue) / 5),
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//       datalabels: {
//         anchor: "end",
//         align: "top",
//         formatter: (value) => (value === 0 ? null : value), // Hide 0 values
//         font: {
//           weight: "bold",
//           size: 12,
//         },
//       },
//     },
//     onClick: (event, elements) => {
//       if (elements.length > 0) {
//         const index = elements[0].index;
//         setSelectedMonth(index);
//       }
//     },
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col lg={8} className="border">
//           <h3 className="text-center">
//             {selectedMonth === null ? "Monthly Defect Data" : `Daily Defect Data - ${months[selectedMonth]}`}
//           </h3>
//           <div style={{ height: "400px" }}>
//             <Bar
//               data={selectedMonth === null ? monthlyChartData : dailyShiftChartData}
//               options={chartOptions}
//             />
//           </div>
//         </Col>

//         {selectedMonth !== null && pieChartData && (
//           <Col lg={4}>
//             <Card className="p-3">
//               <h3 className="text-center">Defect Type Breakdown - {months[selectedMonth]}</h3>
//               <div style={{ height: "400px" }}>
//                 <Pie data={pieChartData} options={{ responsive: true }} />
//               </div>
//             </Card>
//           </Col>
//         )}
//       </Row>

//       <Row className="mt-3 text-center">
//         {selectedMonth !== null && (
//           <Col>
//             <Button variant="secondary" onClick={() => setSelectedMonth(null)}>
//               Back to Monthly Chart
//             </Button>
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default DefectChart;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const DefectChart = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [dailyData, setDailyData] = useState({});
  const [shiftData, setShiftData] = useState({});
  const [defectTypeData, setDefectTypeData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    fetchDefectData();
  }, []);

  const fetchDefectData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/defect-data-entry/getall");
      processDefectData(response.data);
    } catch (error) {
      console.error("Error fetching defect data:", error);
    }
  };

  const processDefectData = (data) => {
    const monthlyCounts = {};
    const dailyCounts = {};
    const shiftCounts = {};
    const defectTypeCounts = {};

    data.forEach((entry) => {
      const date = new Date(entry.timestamp);
      const month = date.getMonth();
      const day = date.getDate();
      const shift = entry.shift || "Unknown";
      const defectType = entry.defect || "Unknown";

      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

      if (!dailyCounts[month]) dailyCounts[month] = {};
      if (!dailyCounts[month][day]) dailyCounts[month][day] = 0;
      if (!shiftCounts[month]) shiftCounts[month] = {};
      if (!shiftCounts[month][day]) shiftCounts[month][day] = { Shift1: 0, Shift2: 0, Shift3: 0 };

      dailyCounts[month][day]++;
      if (shift === "Shift 1") shiftCounts[month][day].Shift1++;
      if (shift === "Shift 2") shiftCounts[month][day].Shift2++;
      if (shift === "Shift 3") shiftCounts[month][day].Shift3++;

      if (!defectTypeCounts[month]) defectTypeCounts[month] = {};
      defectTypeCounts[month][defectType] = (defectTypeCounts[month][defectType] || 0) + 1;
    });

    setMonthlyData(monthlyCounts);
    setDailyData(dailyCounts);
    setShiftData(shiftCounts);
    setDefectTypeData(defectTypeCounts);
  };

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10);
  const maxDailyValue =
    selectedMonth !== null && dailyData[selectedMonth]
      ? Math.max(...Object.values(dailyData[selectedMonth]), 10)
      : 10;

  const monthlyChartData = {
    labels: months,
    datasets: [
      {
        label: "Total Defects",
        data: months.map((_, index) => monthlyData[index] || 0),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        // barThickness: 30, // Increase bar thickness here
      },
    ],
  };

  const dailyShiftChartData =
    selectedMonth !== null && shiftData[selectedMonth]
      ? {
          labels: Object.keys(shiftData[selectedMonth]).map((day) => `Day ${day}`),
          datasets: [
            {
              label: "Shift 1",
              data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift1),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              barThickness: 20, // Increase bar thickness here
            },
            {
              label: "Shift 2",
              data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift2),
              backgroundColor: "rgba(255, 206, 86, 0.6)",
              barThickness: 20, // Increase bar thickness here
            },
            {
              label: "Shift 3",
              data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift3),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              barThickness: 20, // Increase bar thickness here
            },
          ],
        }
      : null;

  const pieChartData =
    selectedMonth !== null && defectTypeData[selectedMonth]
      ? {
          labels: Object.keys(defectTypeData[selectedMonth]),
          datasets: [
            {
              data: Object.values(defectTypeData[selectedMonth]),
              backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
                "#E53935", "#1E88E5", "#D81B60", "#43A047", "#FF9800"
              ],
            },
          ],
        }
      : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: selectedMonth === null ? maxMonthlyValue : maxDailyValue,
        ticks: {
          stepSize: Math.ceil((selectedMonth === null ? maxMonthlyValue : maxDailyValue) / 5),
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value) => (value === 0 ? null : value), // Hide 0 values
        font: {
          weight: "bold",
          size: 12,
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        if (selectedMonth === null) {
          setSelectedMonth(index);
        } else {
          setSelectedDay(index);
        }
      }
    },
  };

  return (
    <Container className="mt-4">
      {/* <Row>
        <Col lg={8} className="border">
          <h3 className="text-center">
            {selectedMonth === null
              ? "Monthly Defect Data"
              : `Daily Defect Data - ${months[selectedMonth]}`}
          </h3>
          <div style={{ height: "400px", overflow: "auto"}}>
            <Bar
              data={selectedMonth === null ? monthlyChartData : dailyShiftChartData}
              options={chartOptions}
            />
          </div>
        </Col>

        {selectedMonth !== null && pieChartData && (
          <Col lg={4}>
            <Card className="p-3">
              <h3 className="text-center">Defect Type Breakdown - {months[selectedMonth]}</h3>
              <div style={{ height: "400px" }}>
                <Pie data={pieChartData} options={{ responsive: true }} />
              </div>
            </Card>
          </Col>
        )}
      </Row> */}

<Row>
  <Col lg={8} className="border">
    <h3 className="text-center">
      {selectedMonth === null
        ? "Monthly Defect Data"
        : `Daily Defect Data - ${months[selectedMonth]}`}
    </h3>
    <div
      style={{
        height: "450px",
        overflowX: "auto", // Enable horizontal scrolling
        overflowY: "hidden", // Disable vertical scrolling
      }}
    >
      <div style={{ Width: "1200px", height: "400px" }}> {/* Adjust the minWidth as needed */}
        <Bar
          data={selectedMonth === null ? monthlyChartData : dailyShiftChartData}
          options={{
            ...chartOptions,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                  autoSkip: false, // Ensure all labels are shown without skipping
                },
              },
            },
          }}
        />
      </div>
    </div>
  </Col>

  {selectedMonth !== null && pieChartData && (
    <Col lg={4}>
      <Card className="p-3 d-flex justify-content-center align-items-center">
        <h3 className="text-center">Defect Type Breakdown - {months[selectedMonth]}</h3>
        <div style={{ height: "400px", overflow: "auto" }}>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </Card>
    </Col>
  )}
</Row>



      <Row className="mt-3 text-center">
        {selectedMonth !== null && (
          <Col>
            <Button variant="secondary" onClick={() => setSelectedMonth(null)}>
              Back to Monthly Chart
            </Button>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default DefectChart;

