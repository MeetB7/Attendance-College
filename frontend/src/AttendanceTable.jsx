import React, { useState, useEffect } from "react";

const AttendanceTable = ({ data }) => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (data.length > 0) {
      const colKeys = Object.keys(data[0])
        .slice(1)
        .filter(
          (col) =>
            col !== "Date>" && col !== "Time>" && col !== "Name Of Student"
        ); // Remove specific columns
      setColumns(colKeys);
      setTableData(
        data.map((row) => {
          const newRow = { ...row };
          delete newRow[Object.keys(row)[0]]; // remove unnecessary column
          return newRow;
        })
      );
    }
  }, [data]);

  const toggleAttendance = (rowIndex, colKey) => {
    setTableData((prevData) => {
      return prevData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [colKey]: row[colKey] === 1 ? 2 : row[colKey] === 2 ? 1 : 2, // Toggle from Undefined to Present, then between Present and Absent
          };
        }
        return row;
      });
    });
  };

  const handleDateChange = () => {
    if (startDate && endDate) {
      const filteredData = data.filter((row) => {
        const rowDate = new Date(row["Date>"]);
        return rowDate >= new Date(startDate) && rowDate <= new Date(endDate);
      });
      setTableData(filteredData);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((col, index) => (
              <th key={index} className="border border-gray-300 p-2">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`border border-gray-300 p-2 text-center cursor-pointer ${
                    colIndex >= 2 && rowIndex > 2
                      ? row[col] === 1
                        ? "bg-red-200 text-red-700"
                        : row[col] === 2
                        ? "bg-green-200 text-green-700"
                        : "bg-gray-200 text-gray-700"
                      : ""
                  }`}
                  onClick={() =>
                    colIndex >= 2 ? toggleAttendance(rowIndex, col) : null
                  }
                >
                  {rowIndex == 1 && colIndex >= 2 ? (
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="p-2 border border-gray-300 rounded mr-4"
                    ></input>
                  ) : rowIndex == 2 && colIndex >= 2 ? (
                    <input
                      type="time"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="p-2 border border-gray-300 rounded mr-4"
                    ></input>
                  ) : 
                  rowIndex >= 3 && colIndex >= 2 ? (
                    row[col] === 1 ? (
                      "Absent"
                    ) : row[col] === 2 ? (
                      "Present"
                    ) : (
                      "Undefined"
                    )
                  ) : (
                    row[col]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
