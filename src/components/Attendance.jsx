import React, { useEffect, useState, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';

const Attendance = () => {
  const [data, setData] = useState([]);
  const [filteredYear, setFilteredYear] = useState("All");
  const hotTableComponent = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://techno-backend-76p3.onrender.com/api/attendance");
      const json = await response.json();
      if (json.success) {
        const filtered = json.data.map((item) => ({
          roll: item.roll,
          name: item.name,
          year: item.year,
          jan: item.months.jan,
          feb: item.months.feb,
          mar: item.months.mar,
          apr: item.months.apr,
          may: item.months.may,
          jun: item.months.jun,
          jul: item.months.jul,
          aug: item.months.aug,
          sep: item.months.sep,
          oct: item.months.oct,
          nov: item.months.nov,
          dec: item.months.dec,
        }));
        setData(filtered);
      } else {
        alert("Failed to fetch attendance.");
      }
    } catch (error) {
      alert("Error connecting to the server.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveChanges = async () => {
    const updatedData = hotTableComponent.current.hotInstance.getSourceData();
    try {
      const response = await fetch("https://techno-backend-76p3.onrender.com/api/attendance", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData.map((row) => ({
          roll: row.roll,
          name: row.name,
          year: row.year,
          months: {
            jan: row.jan, feb: row.feb, mar: row.mar, apr: row.apr,
            may: row.may, jun: row.jun, jul: row.jul, aug: row.aug,
            sep: row.sep, oct: row.oct, nov: row.nov, dec: row.dec
          }
        })))
      });
      const json = await response.json();
      if (json.success) {
        alert('Attendance saved successfully.');
        fetchData();
      } else {
        alert('Error saving attendance.');
      }
    } catch (error) {
      alert("Error connecting to the server.");
    }
  };
  useEffect(() => {
    if (hotTableComponent.current) {
      const hotInstance = hotTableComponent.current.hotInstance;
      if (hotInstance) {
        hotInstance.getPlugin('autoColumnSize')?.recalculateAllColumnsWidth();
      }
    }
  }, [data]);
  
  const handleYearFilter = (year) => {
    setFilteredYear(year);
  };

  const filteredData =
    filteredYear === "All" ? data : data.filter((item) => item.year === filteredYear);

  const uniqueYears = [...new Set(data.map((s) => s.year))];

  return (
    <div >
      <div>
        <h1 className="text-2xl font-bold text-white bg-red-900 py-3 px-4 rounded-t mb-4">
          📊 Attendance Records
        </h1>

        <div className="mb-4 flex items-center gap-4">
          <label className="font-medium">Filter by Year:</label>
          <select
            value={filteredYear}
            onChange={(e) => handleYearFilter(e.target.value)}
            className="px-3 py-1 rounded border border-gray-300"
          >
            <option value="All">All</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto bg-slate-100 border border-gray-300 rounded">
          <HotTable
            ref={hotTableComponent}
            data={filteredData}
            colHeaders={[
              "Roll", "Name", "Year",
              "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
              "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
            ]}
            columns={[
              { data: "roll" }, { data: "name" }, { data: "year" },
              { data: "jan" }, { data: "feb" }, { data: "mar" }, { data: "apr" },
              { data: "may" }, { data: "jun" }, { data: "jul" }, { data: "aug" },
              { data: "sep" }, { data: "oct" }, { data: "nov" }, { data: "dec" }
            ]}
            autoColumnSize={ true}

            height="500px"
            stretchH="none"
            licenseKey="non-commercial-and-evaluation"
          />
        </div>

        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={saveChanges}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            Save Changes
          </button>

          <a
            href="https://docs.google.com/spreadsheets/d/1ktIvhH1NSAYkjrd6jWOnY8XmeJPuJ2yguVS1KEbpaQI/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Open Google Sheet
          </a>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
