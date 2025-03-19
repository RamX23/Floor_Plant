



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

// const LossesChart = () => {
//   const [monthlyData, setMonthlyData] = useState({});
//   const [shiftData, setShiftData] = useState({});
//   const [lossTypeData, setLossTypeData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   useEffect(() => {
//     fetchLossesData();
//   }, []);

//   const fetchLossesData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/losses-data-entry/getall");
//       processLossesData(response.data);
//     } catch (error) {
//       console.error("Error fetching losses data:", error);
//     }
//   };

//   const processLossesData = (data) => {
//     const monthlyCounts = {};
//     const shiftCounts = {};
//     const lossTypeCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const month = date.getMonth();
//       const day = date.getDate();
//       const shift = entry.shift || "Unknown";
//       const lossType = entry.losses || "Unknown Loss";

//       // Count losses per month
//       monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

//       // Initialize daily shift counts
//       if (!shiftCounts[month]) shiftCounts[month] = {};
//       if (!shiftCounts[month][day]) shiftCounts[month][day] = { Shift1: 0, Shift2: 0, Shift3: 0 };

//       // Increment losses based on the shift
//       if (shift === "Shift 1") shiftCounts[month][day].Shift1++;
//       if (shift === "Shift 2") shiftCounts[month][day].Shift2++;
//       if (shift === "Shift 3") shiftCounts[month][day].Shift3++;

//       // Count losses by type for the selected month
//       if (!lossTypeCounts[month]) lossTypeCounts[month] = {};
//       lossTypeCounts[month][lossType] = (lossTypeCounts[month][lossType] || 0) + 1;
//     });

//     setMonthlyData(monthlyCounts);
//     setShiftData(shiftCounts);
//     setLossTypeData(lossTypeCounts);
//   };

//   const months = [
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ];

//   const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10);

//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Total Losses",
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
//               borderWidth: 1,
//             },
//             {
//               label: "Shift 2",
//               data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift2),
//               backgroundColor: "rgba(255, 206, 86, 0.6)",
//               borderWidth: 1,
//             },
//             {
//               label: "Shift 3",
//               data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift3),
//               backgroundColor: "rgba(75, 192, 192, 0.6)",
//               borderWidth: 1,
//             },
//           ],
//         }
//       : null;

//   const pieChartData =
//     selectedMonth !== null && lossTypeData[selectedMonth]
//       ? {
//           labels: Object.keys(lossTypeData[selectedMonth]),
//           datasets: [
//             {
//               data: Object.values(lossTypeData[selectedMonth]),
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
//                 "#E53935", "#1E88E5", "#D81B60", "#43A047", "#FF9800"
//               ],
//             },
//           ],
//         }
//       : null;

//   const pieChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: "right",
//         labels: {
//           font: {
//             size: 14,
//             weight: "bold",
//           },
//         },
//       },
//       tooltip: {
//         enabled: true,
//       },
//       datalabels: {
//         color: "#fff",
//         font: {
//           size: 14,
//           weight: "bold",
//         },
//         formatter: (value, context) => {
//           return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
//         },
//       },
//     },
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         min: 0, // Set minimum value on Y-axis
//         max: 35, // Set maximum value on Y-axis
//         ticks: {
//           stepSize: 1, // Steps between ticks
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
//         formatter: (value) => (value === 0 ? null : value),
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
//         <Col lg={7} className="border">
//           <h3 className="text-center">
//             {selectedMonth === null ? "Monthly Loss Data" : `Daily Loss Data - ${months[selectedMonth]}`}
//           </h3>
//           <div style={{ height: "400px" }}>
//             <Bar
//               data={selectedMonth === null ? monthlyChartData : dailyShiftChartData}
//               options={chartOptions}
//             />
//           </div>
//         </Col>

//         {selectedMonth !== null && pieChartData && (
//           <Col lg={5}>
//             <Card className="p-3">
//               <h3 className="text-center">Loss Type Breakdown - {months[selectedMonth]}</h3>
//               <div style={{ height: "400px" }}>
//                 <Pie data={pieChartData} options={pieChartOptions} />
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

// export default LossesChart;


// full working 
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

// const LossesChart = () => {
//   const [monthlyData, setMonthlyData] = useState({});
//   const [shiftData, setShiftData] = useState({});
//   const [lossTypeData, setLossTypeData] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   useEffect(() => {
//     fetchLossesData();
//   }, []);

//   const fetchLossesData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/losses-data-entry/getall");
//       processLossesData(response.data);
//     } catch (error) {
//       console.error("Error fetching losses data:", error);
//     }
//   };

//   const processLossesData = (data) => {
//     const monthlyCounts = {};
//     const shiftCounts = {};
//     const lossTypeCounts = {};

//     data.forEach((entry) => {
//       const date = new Date(entry.createdAt);
//       const month = date.getMonth();
//       const day = date.getDate();
//       const shift = entry.shift || "Unknown";
//       const lossType = entry.losses || "Unknown Loss";

//       // Count losses per month
//       monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

//       // Initialize daily shift counts
//       if (!shiftCounts[month]) shiftCounts[month] = {};
//       if (!shiftCounts[month][day]) shiftCounts[month][day] = { Shift1: 0, Shift2: 0, Shift3: 0 };

//       // Increment losses based on the shift
//       if (shift === "Shift 1") shiftCounts[month][day].Shift1++;
//       if (shift === "Shift 2") shiftCounts[month][day].Shift2++;
//       if (shift === "Shift 3") shiftCounts[month][day].Shift3++;

//       // Count losses by type for the selected month
//       if (!lossTypeCounts[month]) lossTypeCounts[month] = {};
//       lossTypeCounts[month][lossType] = (lossTypeCounts[month][lossType] || 0) + 1;
//     });

//     setMonthlyData(monthlyCounts);
//     setShiftData(shiftCounts);
//     setLossTypeData(lossTypeCounts);
//   };

//   const months = [
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ];

//   const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10);

//   const monthlyChartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Total Losses",
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
//               borderWidth: 1,
//             },
//             {
//               label: "Shift 2",
//               data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift2),
//               backgroundColor: "rgba(255, 206, 86, 0.6)",
//               borderWidth: 1,
//             },
//             {
//               label: "Shift 3",
//               data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift3),
//               backgroundColor: "rgba(75, 192, 192, 0.6)",
//               borderWidth: 1,
//             },
//           ],
//         }
//       : null;

//   const pieChartData =
//     selectedMonth !== null && lossTypeData[selectedMonth]
//       ? {
//           labels: Object.keys(lossTypeData[selectedMonth]),
//           datasets: [
//             {
//               data: Object.values(lossTypeData[selectedMonth]),
//               backgroundColor: [
//                 "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
//                 "#E53935", "#1E88E5", "#D81B60", "#43A047", "#FF9800"
//               ],
//             },
//           ],
//         }
//       : null;

//   const pieChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: "right",
//         labels: {
//           font: {
//             size: 14,
//             weight: "bold",
//           },
//         },
//       },
//       tooltip: {
//         enabled: true,
//       },
//       datalabels: {
//         color: "#fff",
//         font: {
//           size: 14,
//           weight: "bold",
//         },
//         formatter: (value, context) => {
//           return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
//         },
//       },
//     },
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         min: 0,
//         max: Math.max(maxMonthlyValue, 35),
//         ticks: {
//           stepSize: 1,
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
//         formatter: (value) => (value === 0 ? null : value),
//         font: {
//           weight: "bold",
//           size: 12,
//         },
//       },
//     },
//     onClick: (event, elements) => {
//       if (elements.length > 0 && selectedMonth === null) {
//         const index = elements[0].index;
//         setSelectedMonth(index);
//       }
//     },
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col lg={7} className="border">
//           <h3 className="text-center">
//             {selectedMonth === null ? "Monthly Loss Data" : `Daily Loss Data - ${months[selectedMonth]}`}
//           </h3>
//           <div style={{ height: "400px" }}>
//             <Bar
//               data={selectedMonth === null ? monthlyChartData : dailyShiftChartData}
//               options={chartOptions}
//             />
//           </div>
//         </Col>

//         {selectedMonth !== null && pieChartData && (
//           <Col lg={5}>
//             <Card className="p-3">
//               <h3 className="text-center">Loss Type Breakdown - {months[selectedMonth]}</h3>
//               <div style={{ height: "400px" }}>
//                 <Pie data={pieChartData} options={pieChartOptions} />
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

// export default LossesChart;



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

const LossesChart = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [shiftData, setShiftData] = useState({});
  const [lossTypeData, setLossTypeData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    fetchLossesData();
  }, []);

  const fetchLossesData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/losses-data-entry/getall");
      processLossesData(response.data);
    } catch (error) {
      console.error("Error fetching losses data:", error);
    }
  };

  const processLossesData = (data) => {
    const monthlyCounts = {};
    const shiftCounts = {};
    const lossTypeCounts = {};

    data.forEach((entry) => {
      const date = new Date(entry.createdAt);
      const month = date.getMonth();
      const day = date.getDate();
      const shift = entry.shift || "Unknown";
      const lossType = entry.losses || "Unknown Loss";

      // Count losses per month
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

      // Initialize daily shift counts
      if (!shiftCounts[month]) shiftCounts[month] = {};
      if (!shiftCounts[month][day]) shiftCounts[month][day] = { Shift1: 0, Shift2: 0, Shift3: 0 };

      // Increment losses based on the shift
      if (shift === "Shift 1") shiftCounts[month][day].Shift1++;
      if (shift === "Shift 2") shiftCounts[month][day].Shift2++;
      if (shift === "Shift 3") shiftCounts[month][day].Shift3++;

      // Count losses by type for the selected month
      if (!lossTypeCounts[month]) lossTypeCounts[month] = {};
      lossTypeCounts[month][lossType] = (lossTypeCounts[month][lossType] || 0) + 1;
    });

    setMonthlyData(monthlyCounts);
    setShiftData(shiftCounts);
    setLossTypeData(lossTypeCounts);
  };

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const maxMonthlyValue = Math.max(...Object.values(monthlyData), 10);

  const monthlyChartData = {
    labels: months,
    datasets: [
      {
        label: "Total Losses",
        data: months.map((_, index) => monthlyData[index] || 0),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
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
              barThickness: 30, // Increased bar thickness
              borderWidth: 1,
            },
            {
              label: "Shift 2",
              data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift2),
              backgroundColor: "rgba(255, 206, 86, 0.6)",
              barThickness: 30, // Increased bar thickness
              borderWidth: 1,
            },
            {
              label: "Shift 3",
              data: Object.values(shiftData[selectedMonth]).map((shifts) => shifts.Shift3),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              barThickness: 30, // Increased bar thickness
              borderWidth: 1,
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
        min: 0,
        max: Math.max(maxMonthlyValue, 35),
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          autoSkip: false, // Ensure all labels are shown without skipping
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
        formatter: (value) => (value === 0 ? null : value),
        font: {
          weight: "bold",
          size: 12,
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0 && selectedMonth === null) {
        const index = elements[0].index;
        setSelectedMonth(index);
      }
    },
  };

  const pieChartData =
  selectedMonth !== null && lossTypeData[selectedMonth]
    ? {
        labels: Object.keys(lossTypeData[selectedMonth]),
        datasets: [
          {
            data: Object.values(lossTypeData[selectedMonth]),
            backgroundColor: [
              "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
              "#E53935", "#1E88E5", "#D81B60", "#43A047", "#FF9800"
            ],
          },
        ],
      }
    : null;

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "right",
      labels: {
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    tooltip: {
      enabled: true,
    },
    datalabels: {
      color: "#fff",
      font: {
        size: 14,
        weight: "bold",
      },
      formatter: (value, context) => {
        return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
      },
    },
  },
};

  return (
    <Container className="mt-4">
      <Row>
        <Col lg={8} className="border">
          <h3 className="text-center">
            {selectedMonth === null ? "Monthly Loss Data" : `Daily Loss Data - ${months[selectedMonth]}`}
          </h3>
          <div
            style={{
              height: "450px", // Increased chart height
              overflowX: "auto", // Enable horizontal scrolling
              overflowY: "hidden",
            }}
          >
            <div style={{ Width: "1200px", height: "400px" }}>
              <Bar
                data={selectedMonth === null ? monthlyChartData : dailyShiftChartData}
                options={chartOptions}
              />
            </div>
          </div>
        </Col>

        {selectedMonth !== null && pieChartData && (
          <Col lg={4}>
            <Card className="p-3">
              <h3 className="text-center">Loss Type Breakdown - {months[selectedMonth]}</h3>
              <div style={{ height: "400px" }}>
                <Pie data={pieChartData} options={chartOptions} />
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

export default LossesChart;
