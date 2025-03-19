// import React, { useEffect, useState } from "react";
// import { Bar, Line } from "react-chartjs-2";
// import axios from "axios";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//   } from "chart.js";
  
//   // Register the required components
//   ChartJS.register(
//     CategoryScale, // For the x-axis categories
//     LinearScale,   // For the y-axis scale
//     BarElement,    // For bar charts
//     LineElement,   // For line charts
//     Title,
//     Tooltip,
//     Legend
//   );
  

// const ProductionDefectCharts = () => {
//   const [productionData, setProductionData] = useState([]);
//   const [defectData, setDefectData] = useState([]);

//   useEffect(() => {
//     // Fetch production data
//     const fetchProductionData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/productionmasters"); // Replace with your API endpoint
//         setProductionData(response.data);
//       } catch (error) {
//         console.error("Error fetching production data:", error);
//       }
//     };

//     // Fetch defect data
//     const fetchDefectData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/defectmasters"); // Replace with your API endpoint
//         setDefectData(response.data);
//       } catch (error) {
//         console.error("Error fetching defect data:", error);
//       }
//     };

//     fetchProductionData();
//     fetchDefectData();
//   }, []);

//   // Prepare production chart data
//   const productionChartData = {
//     labels: productionData.map((entry) => entry.modelName), // Use model names as labels
//     datasets: [
//       {
//         label: "Production Quantity",
//         data: productionData.map((entry) => entry.quantity), // Use quantity for chart data
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Prepare defect chart data
//   const defectChartData = {
//     labels: defectData.map((entry) => entry.defectName), // Use defect names as labels
//     datasets: [
//       {
//         label: "Defect Count",
//         data: defectData.map((entry) => entry.count), // Replace 'count' with the actual field for defect quantity
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="container">
//       <h2 className="text-center">Production Quantity vs Defects</h2>
      
//       {/* Production Chart */}
//       <div className="my-4">
//         <h3>Production Quantity</h3>
//         <Bar data={productionChartData} />
//       </div>

//       {/* Defect Chart */}
//       <div className="my-4">
//         <h3>Defect Count</h3>
//         <Line data={defectChartData} />
//       </div>
//     </div>
//   );
// };

// export default ProductionDefectCharts;

// PD 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ProductionDefectChart = () => {
//   const [chartData, setChartData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productionRes, defectRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/production-master/getall"), // Update with your actual API URL
//           axios.get("http://localhost:5000/api/defect-data-entry/getall"), // Update with your actual API URL
//         ]);

//         const productionData = productionRes.data;
//         const defectData = defectRes.data;

//         // Combine data based on the date
//         const combinedData = productionData.map((prod) => {
//           const defect = defectData.find((def) => def.date === prod.date);
//           return {
//             date: prod.date,
//             productionQuantity: prod.productionQuantity,
//             defectQuantity: defect ? defect.defectQuantity : 0,
//           };
//         });

//         // Calculate the ratio for each date
//         const labels = combinedData.map((entry) => entry.date);
//         const data = combinedData.map(
//           (entry) =>
//             (entry.productionQuantity / entry.defectQuantity || 0).toFixed(2) // Avoid division by zero
//         );

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: "Production/Defect Ratio",
//               data,
//               backgroundColor: "rgba(75, 192, 192, 0.6)",
//               borderColor: "rgba(75, 192, 192, 1)",
//               borderWidth: 1,
//             },
//           ],
//         });

//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Production vs Defect Ratio Chart</h2>
//       <div className="row">
//         <div className="col-md-12">
//           {chartData ? (
//             <Bar
//               data={chartData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: { display: true, position: "top" },
//                   tooltip: { mode: "index", intersect: false },
//                 },
//               }}
//             />
//           ) : (
//             <p>No data available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductionDefectChart;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ProductionDefectChart = () => {
//   const [chartData, setChartData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/calculate");
//         const data = response.data;

//         // Prepare data for the chart
//         const labels = data.map((entry) => entry.date);
//         const ratios = data.map((entry) => parseFloat(entry.ratio));

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: "Production/Defect Ratio",
//               data: ratios,
//               backgroundColor: "rgba(75, 192, 192, 0.6)",
//               borderColor: "rgba(75, 192, 192, 1)",
//               borderWidth: 1,
//             },
//           ],
//         });
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Production vs Defect Ratio Chart</h2>
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           {chartData ? (
//             <Bar
//               data={chartData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: { display: true, position: "top" },
//                   tooltip: { mode: "index", intersect: false },
//                 },
//                 scales: {
//                   x: {
//                     title: {
//                       display: true,
//                       text: "Date",
//                     },
//                   },
//                   y: {
//                     title: {
//                       display: true,
//                       text: "Ratio",
//                     },
//                   },
//                 },
//               }}
//             />
//           ) : (
//             <p>No data available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductionDefectChart;


// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import axios from "axios";

// // Import Chart.js components
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const AverageChart = () => {
//   const [chartData, setChartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/avg");
//         const { productionQty, defectQty, averageQty } = response.data;

//         setChartData({
//           labels: ["Production Quantity", "Defect Quantity", "Average Quantity"],
//           datasets: [
//             {
//               label: "Quantities",
//               data: [productionQty, defectQty, averageQty],
//               backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
//               borderWidth: 1,
//             },
//           ],
//         });

//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load chart data.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div style={{ width: "600px", margin: "0 auto" }}>
//       <h2>Average Data Chart</h2>
//       <Bar
//         data={chartData}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: {
//               position: "top",
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default AverageChart;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DisplayAverage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/avg/avg-data");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const chartData = {
    labels: ["Production Quantity", "Defect Quantity", "Average Quantity"],
    datasets: [
      {
        label: "Quantities",
        data: [data.productionQty, data.defectQty, data.averageQty],
        backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5px", width: '90%', height: '70%' }}>
      <h1>Average Data Chart</h1>
      <Bar data={chartData} options={{ responsive: true }} />
      <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default DisplayAverage;



