import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const getMonthNumber = (monthName) => {
  const index = monthNames.indexOf(monthName);
  return index !== -1 ? String(index + 1).padStart(2, "0") : "";
};

const calculateZeroDefects = (cards, dates) => {
  const zeroDefectsCards = {};
  const zeroDefectsPercentage = {};

  dates.forEach((date) => {
    const cardsOnDate = cards.filter((card) => card.date.includes(date));
    const totalCardsOnDate = cardsOnDate.length; // Total number of cards for the date
    const zeroDefectsCardsOnDate = cardsOnDate.filter((card) => card.defects === 0 || !card.defects).length; // Count of cards with zero defects

    zeroDefectsCards[date] = zeroDefectsCardsOnDate;
    zeroDefectsPercentage[date] = totalCardsOnDate > 0 ? ((zeroDefectsCardsOnDate / totalCardsOnDate) * 100).toFixed(2) : 0;
  });

  return { zeroDefectsCards, zeroDefectsPercentage };
};

const DefectSummaryTable = () => {
  const [defectData, setDefectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [dates, setDates] = useState([]);
  const [totalDefects, setTotalDefects] = useState({ monthlyTotal: 0, dateWiseTotal: {} });
  const [totalCards, setTotalCards] = useState({ monthlyTotal: 0, dateWiseTotal: {} });
  const [productionData, setProductionData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [totalProduction, setTotalProduction] = useState({ monthlyTotal: 0, dateWiseTotal: {} });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/defect-master/analytics")
      .then((response) => setDefectData(response.data))
      .catch((error) => console.error("Error fetching defect summary:", error));

    axios
      .get("http://localhost:5000/api/production-master/total-production")
      .then((res) => setProductionData(res.data))
      .catch((err) => console.error("Error getting production data", err));

    axios
      .get("http://localhost:5000/api/cardmaster/getCardsCount")
      .then((res) => setCardData(res.data))
      .catch((err) => console.error("Error getting card data", err))
      .finally(() => setLoading(false));

    axios.get("http://localhost:5000/api/cardmaster/cardmasters")
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => {
        console.error("Error occurred while getting cards", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredData = useMemo(() => {
    return defectData.map((department) => ({
      ...department,
      defectsByMonth: department.defectsByMonth.filter((monthData) => {
        if (selectedMonth === "All") return true;
        const apiMonth = monthData.month.split("-")[1];
        return apiMonth === getMonthNumber(selectedMonth);
      }),
    }));
  }, [defectData, selectedMonth]);

  useEffect(() => {
    const allDates = new Set();
    let totalMonthlyDefects = 0;
    let totalMonthlyCards = 0;
    let totalMonthlyProduction = 0;

    const dateWiseTotalDefects = {};
    const dateWiseTotalCards = {};
    const dateWiseTotalProduction = {};

    filteredData.forEach((department) => {
      department.defectsByMonth.forEach((monthData) => {
        totalMonthlyDefects += monthData.totalDefectsInMonth;
        totalMonthlyCards += monthData.totalCardsInMonth || 0;

        monthData.defectsByDate.forEach((dateData) => {
          if (selectedMonth === "All" || dateData.date.includes(`-${getMonthNumber(selectedMonth)}-`)) {
            allDates.add(dateData.date);
            dateWiseTotalDefects[dateData.date] = (dateWiseTotalDefects[dateData.date] || 0) + dateData.totalDefects;
            dateWiseTotalCards[dateData.date] = (dateWiseTotalCards[dateData.date] || 0) + (dateData.totalCards || 0);
          }
        });
      });
    });

    productionData.forEach((production) => {
      production.productionByDate.forEach((dateData) => {
        if (selectedMonth === "All" || dateData.date.includes(`-${getMonthNumber(selectedMonth)}-`)) {
          allDates.add(dateData.date);
          totalMonthlyProduction += dateData.totalProduction || 0;
          dateWiseTotalProduction[dateData.date] = (dateWiseTotalProduction[dateData.date] || 0) + (dateData.totalProduction || 0);
        }
      });
    });

    cardData.forEach((cardEntry) => {
      cardEntry.cardsByDate.forEach((dateData) => {
        if (selectedMonth === "All" || dateData.date.includes(`-${getMonthNumber(selectedMonth)}-`)) {
          allDates.add(dateData.date);
          totalMonthlyCards += dateData.totalCards || 0;
          dateWiseTotalCards[dateData.date] = (dateWiseTotalCards[dateData.date] || 0) + (dateData.totalCards || 0);
        }
      });
    });

    const sortedDates = Array.from(allDates)
      .filter(date => selectedMonth === "All" || date.includes(`-${getMonthNumber(selectedMonth)}-`))
      .sort();

    setDates(sortedDates);
    setTotalDefects({ monthlyTotal: totalMonthlyDefects, dateWiseTotal: dateWiseTotalDefects });
    setTotalCards({ monthlyTotal: totalMonthlyCards, dateWiseTotal: dateWiseTotalCards });
    setTotalProduction({ monthlyTotal: totalMonthlyProduction, dateWiseTotal: dateWiseTotalProduction });
  }, [filteredData, productionData, cardData, selectedMonth]);

  const { zeroDefectsCards, zeroDefectsPercentage } = calculateZeroDefects(cards, dates);

  const exportToExcel = () => {
    const sheetData = [
      ["Department", "Total Defects in Month", ...dates]
    ];

    filteredData.forEach((department) => {
      const row = [
        department._id,
        department.defectsByMonth.reduce((total, monthData) => total + monthData.totalDefectsInMonth, 0),
        ...dates.map((date) => (
          department.defectsByMonth.flatMap((monthData) => monthData.defectsByDate)
            .find((dateData) => dateData.date === date)?.totalDefects || 0
        ))
      ];
      sheetData.push(row);
    });

    sheetData.push(["Total Defects", totalDefects.monthlyTotal, ...dates.map((date) => totalDefects.dateWiseTotal[date] || 0)]);
    sheetData.push(["Total Cards Count", totalCards.monthlyTotal, ...dates.map((date) => totalCards.dateWiseTotal[date] || 0)]);
    sheetData.push(["Total Production", totalProduction.monthlyTotal, ...dates.map((date) => totalProduction.dateWiseTotal[date] || 0)]);
    sheetData.push(["Zero Defects Cards", Object.values(zeroDefectsCards).reduce((sum, val) => sum + val, 0), ...dates.map((date) => zeroDefectsCards[date] || 0)]);
    sheetData.push(["Zero Defects %", (
      Object.values(zeroDefectsCards).reduce((sum, val) => sum + val, 0) / 
      Math.max(totalCards.monthlyTotal, 1) * 100
    ).toFixed(2) + "%", ...dates.map((date) => zeroDefectsPercentage[date] + "%")]);
   

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Defect Summary");
    XLSX.writeFile(wb, "Defect_Summary.xlsx");
  };

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Defect Summary</h2>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Department</th>
            <th className="d-flex gap-2 justify-content-around align-items-center px-1">
              Total Defects in Month
              <select
                className="form-select py-0"
                style={{ width: '5rem', height: '2rem' }}
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="All">All</option>
                {monthNames.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </th>

            {dates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((department) => (
            <tr key={department._id}>
              <td>
                <Link to={`/department/${department._id}`}>
                  <strong>{department._id}</strong>
                </Link>
              </td>
              <td>
                {department.defectsByMonth.reduce(
                  (total, monthData) => total + monthData.totalDefectsInMonth,
                  0
                )}
              </td>
              {dates.map((date) => {
                const defectsOnDate = department.defectsByMonth.flatMap((monthData) =>
                  monthData.defectsByDate.filter((dateData) => dateData.date === date)
                );

                const departmentDefectTotal = defectsOnDate.reduce(
                  (sum, dateEntry) => sum + (dateEntry.totalDefects || 0),
                  0
                );

                return <td key={date}>{departmentDefectTotal || 0}</td>;
              })}
            </tr>
          ))}

          <tr className="table-info">
            <td><strong>Total Defects</strong></td>
            <td><strong>{totalDefects.monthlyTotal}</strong></td>
            {dates.map((date) => (
              <td key={date}>{totalDefects.dateWiseTotal[date] || 0}</td>
            ))}
          </tr>

          <tr className="table-success">
            <td><strong>Total Production</strong></td>
            <td><strong>{totalProduction.monthlyTotal}</strong></td>
            {dates.map((date) => (
              <td key={date}>{totalProduction.dateWiseTotal[date] || 0}</td>
            ))}
          </tr>

          <tr className="table-warning">
            <td><strong>Total Cards</strong></td>
            <td><strong>{totalCards.monthlyTotal}</strong></td>
            {dates.map((date) => (
              <td key={date}>{totalCards.dateWiseTotal[date] || 0}</td>
            ))}
          </tr>

          <tr className="table-primary">
            <td><strong>Zero Defects Cards</strong></td>
            <td><strong>{Object.values(zeroDefectsCards).reduce((sum, val) => sum + val, 0)}</strong></td>
            {dates.map((date) => (
              <td key={date}>{zeroDefectsCards[date] || 0}</td>
            ))}
          </tr>

          <tr className="table-secondary">
            <td><strong>Zero Defects %</strong></td>
            <td><strong>{(
              Object.values(zeroDefectsCards).reduce((sum, val) => sum + val, 0) / 
              Math.max(totalCards.monthlyTotal, 1) * 100
            ).toFixed(2)}%</strong></td>
            {dates.map((date) => (
              <td key={date}>{zeroDefectsPercentage[date] || 0}%</td>
            ))}
          </tr>

          <tr>
            <td><strong>DEFECTS/VEHICLE</strong></td>
            <td>
              {(totalDefects.monthlyTotal / Math.max(totalProduction.monthlyTotal, 1)).toFixed(2)}
            </td>
            {dates.map((date) => (
              <td key={date}>
                {((totalDefects.dateWiseTotal[date] || 0) / 
                  Math.max(totalProduction.dateWiseTotal[date] || 1, 1)).toFixed(2)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <button className="btn btn-secondary mb-3 d-flex justify-content-start" onClick={exportToExcel}>Download Data</button>
    </div>
  );
};

export default DefectSummaryTable;