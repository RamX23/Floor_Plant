import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";

const DefectDetails = () => {
  const { id } = useParams();
  const [defectDetails, setDefectDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [datesWithDefects, setDatesWithDefects] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchDefectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/defect-master/defect-details/${id}`);
        setDefectDetails(response.data);
      } catch (error) {
        console.error("Error fetching defect details:", error);
        setError("Failed to fetch defect details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDefectDetails();
  }, [id]);

  useEffect(() => {
    let filteredDefects = defectDetails;

    if (selectedMonth) {
      filteredDefects = defectDetails.filter((defect) =>
        defect.timestamp.startsWith(selectedMonth)
      );
    }

    const defectCountByDate = filteredDefects.reduce((acc, defect) => {
      const [year, month, day] = defect.timestamp.split("-"); // Extract YYYY-MM-DD
      const fullDate = `${year}-${month}-${day}`; // Full date
      const monthYear = `${month}-${year.slice(2)}`; // Format MM-YY

      if (!acc[fullDate]) {
        acc[fullDate] = { count: 0, defects: [], monthYear };
      }
      acc[fullDate].count += 1;
      acc[fullDate].defects.push({
        defectName: defect.defect,
        defectType: defect.defectType,
        model: defect.model,
      });

      return acc;
    }, {});

    setDatesWithDefects(Object.entries(defectCountByDate).map(([fullDate, { count, defects, monthYear }]) => ({
      fullDate,
      count,
      monthYear,
      defects,
    })));
  }, [selectedMonth, defectDetails]);

  const exportToExcel = () => {
    if (defectDetails.length === 0) {
      alert("No data available to export.");
      return;
    }

    const sheetData = [
      ["Month (MM-YY)", "Date", "Defect Name", "Defect Type", "Model", "Defect Count"],
      ...datesWithDefects.flatMap(({ fullDate, monthYear, count, defects }) =>
        defects.map(({ defectName, defectType, model }) => [
          monthYear,
          fullDate,
          defectName,
          defectType,
          model,
          count,
        ])
      ),
    ];

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Defect_Details_${id}`);

    XLSX.writeFile(wb, `Defect_Details_${id}.xlsx`);
  };

  if (loading) {
    return <p>Loading defect details...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Defect Details for Department {id}</h2>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
          <th>Defect Name</th>
            <th>Defect Type</th>
            <th className="d-flex gap-2 justify-content-center align-items-center">
              Month
              <select 
                className="form-select d-inline w-auto"
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">All</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = (i + 1).toString().padStart(2, "0");
                  return <option key={month} value={`2025-${month}`}>{`${month}-25`}</option>;
                })}
              </select>
            </th>
            <th>Date</th>

          </tr>
        </thead>
        <tbody>
          {datesWithDefects.length === 0 ? (
            <tr><td colSpan="6">No defects found for the selected month.</td></tr>
          ) : (
            datesWithDefects.flatMap((entry, index) =>
              entry.defects.map((defect, subIndex) => (
                <tr key={`${index}-${subIndex}`}>
                  <td>{defect.defectName}</td>
                  <td>{defect.defectType}</td>
                  <td>{subIndex === 0 ? entry.monthYear : ""}</td>
                  <td>{subIndex === 0 ? entry.fullDate : ""}</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>

      <button className="btn btn-primary mb-3" onClick={exportToExcel}>
        Download Data
      </button>
    </div>
  );
};

export default DefectDetails;
