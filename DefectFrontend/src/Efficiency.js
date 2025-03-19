// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import { Container, Row, Col } from "react-bootstrap";
// import "chart.js/auto"; // Automatically register chart.js components

// const EfficiencyChart = () => {
//   const [chartData, setChartData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch efficiency data from the API
//     const fetchEfficiencyData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/calculate-efficiency");
//         if (response.data.success) {
//           prepareChartData(response.data.data);
//           setIsLoading(false);
//         } else {
//           setError("Failed to fetch efficiency data.");
//           setIsLoading(false);
//         }
//       } catch (err) {
//         setError("An error occurred while fetching efficiency data.");
//         console.error(err);
//         setIsLoading(false);
//       }
//     };

//     fetchEfficiencyData();
//   }, []);

//   // Prepare chart data for the bar chart
//   const prepareChartData = (data) => {
//     const labels = data.map((item) => `${item.modelName} (Shift ${item.shift})`);
//     const plannedQty = data.map((item) => item.plannedQty);
//     const actualQty = data.map((item) => item.actualQty);
//     const adjustedActualQty = data.map((item) => item.adjustedActualQty);
//     const efficiency = data.map((item) => item.efficiency);

//     setChartData({
//       labels,
//       datasets: [
//         {
//           label: "Planned Quantity",
//           data: plannedQty,
//           backgroundColor: "rgba(75, 192, 192, 0.6)",
//         },
//         {
//           label: "Actual Quantity",
//           data: actualQty,
//           backgroundColor: "rgba(54, 162, 235, 0.6)",
//         },
//         {
//           label: "Adjusted Actual Quantity",
//           data: adjustedActualQty,
//           backgroundColor: "rgba(255, 206, 86, 0.6)",
//         },
//         {
//           label: "Efficiency (%)",
//           data: efficiency,
//           backgroundColor: "rgba(153, 102, 255, 0.6)",
//         },
//       ],
//     });
//   };

//   return (
//     <Container className="mt-4">
//       <h1 className="text-center mb-4">Efficiency Chart</h1>
//       {isLoading ? (
//         <p className="text-center">Loading...</p>
//       ) : error ? (
//         <p className="text-center text-danger">{error}</p>
//       ) : (
//         <Row className="justify-content-center">
//           <Col lg={8} md={10} sm={12}>
//             <div className="chart-container shadow p-4 bg-white rounded">
//               <Bar
//                 data={chartData}
//                 options={{
//                   responsive: true,
//                   plugins: {
//                     legend: { display: true, position: "top" },
//                     tooltip: { mode: "index", intersect: false },
//                   },
//                   scales: {
//                     x: { title: { display: true, text: "Models & Shifts" } },
//                     y: { title: { display: true, text: "Values" } },
//                   },
//                 }}
//               />
//             </div>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default EfficiencyChart;








import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const EfficiencyCharts = () => {
    const [monthlyEfficiencyData, setMonthlyEfficiencyData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [isDailyView, setIsDailyView] = useState(false); // Toggle between monthly and daily views

    // Fetch the monthly efficiency data
    useEffect(() => {
        axios.get('http://localhost:5000/api/monthly-efficiency')
            .then(response => {
                if (response.data.success) {
                    setMonthlyEfficiencyData(response.data.data);
                }
            })
            .catch(error => console.error('Error fetching monthly efficiency data:', error));
    }, []);

    // Fetch daily production data for the selected month
    const fetchDailyDataForMonth = (month) => {
        axios.get('http://localhost:5000/api/daily-efficiency')
            .then(response => {
                const dailyDataForMonth = response.data.dailyData[month] || [];
                const formattedDailyData = dailyDataForMonth.map(item => ({
                    date: item.date,
                    efficiency: parseFloat(item.efficiency),
                }));

                setDailyData(formattedDailyData);
                setSelectedMonth(month);
                setIsDailyView(true); // Switch to daily view
            })
            .catch(error => console.error('Error fetching daily data:', error));
    };

    // Chart Data for Monthly Efficiency
    const monthlyChartData = {
        labels: monthlyEfficiencyData.map(item => item.month),
        datasets: [
            {
                label: 'Average Monthly Efficiency (%)',
                data: monthlyEfficiencyData.map(item => item.averageEfficiency),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                barThickness: 30,
                maxBarThickness: 30,
            },
        ],
    };

    // Chart Data for Daily Efficiency
    const dailyChartData = {
        labels: dailyData.map(item => item.date),
        datasets: [
            {
                label: `Daily Efficiency for ${selectedMonth}`,
                data: dailyData.map(item => item.efficiency),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                barThickness: 30,
                maxBarThickness: 30,
            },
        ],
    };

    // Go back to the monthly view
    const handleBackToMonthly = () => {
        setIsDailyView(false);
        setSelectedMonth(null);
    };

    return (
        <Container className="mt-1">
            <Row>
                <Col md={12}>
                    <Card className="p-4">
                        <h3>{isDailyView ? `Daily Efficiency for ${selectedMonth}` : 'Monthly Efficiency'}</h3>
                        <div style={{ height: '450px' }}>
                            <Bar
                                data={isDailyView ? dailyChartData : monthlyChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'top',
                                        },
                                    },
                                    onClick: (event, elements) => {
                                        if (!isDailyView && elements.length > 0) {
                                            const index = elements[0].index;
                                            const selectedMonth = monthlyEfficiencyData[index]?.month;
                                            if (selectedMonth) {
                                                fetchDailyDataForMonth(selectedMonth);
                                            }
                                        }
                                    },
                                }}
                            />
                        </div>
                        {isDailyView && (
                            <Button variant="primary" className="mt-3 w-25" onClick={handleBackToMonthly}>
                                Back to Monthly View
                            </Button>
                        )}
                    </Card>
                </Col>
            </Row>
    <Link to='/analytics' className='btn-sm' style={{textDecoration:'none'}}>
            <Button className='d-flex my-2 btn-secondary'>
        Analytics
</Button>
        </Link>
        </Container>
    );
};

export default EfficiencyCharts;
