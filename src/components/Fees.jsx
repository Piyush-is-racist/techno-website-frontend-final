import React, { useEffect, useState, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';

const Fees = () => {
  const [data, setData] = useState([]);
  const [filteredYear, setFilteredYear] = useState("All");
  const hotTableComponent = useRef(null);

  const fetchData = async () => {
    try {
      const res = await fetch("https://techno-backend-76p3.onrender.com/api/fees");
      const json = await res.json();
      if (json.success) {
        const transformed = json.data.map((item) => ({
          roll: item.roll,
          name: item.name,
          year: item.year,
          sem1: item.semesters?.sem1 ?? 0,
          sem2: item.semesters?.sem2 ?? 0,
          sem3: item.semesters?.sem3 ?? 0,
          sem4: item.semesters?.sem4 ?? 0,
          sem5: item.semesters?.sem5 ?? 0,
          sem6: item.semesters?.sem6 ?? 0,
          sem7: item.semesters?.sem7 ?? 0,
          sem8: item.semesters?.sem8 ?? 0
        }));
        setData(transformed);
      }
    } catch (err) {
      alert("Failed to fetch fees data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (hotTableComponent.current) {
      const hot = hotTableComponent.current.hotInstance;
      hot.getPlugin('autoColumnSize')?.recalculateAllColumnsWidth();
    }
  }, [data]);

  const saveChanges = async () => {
    const updatedData = hotTableComponent.current.hotInstance.getSourceData();
    const payload = updatedData.map((row) => ({
      roll: row.roll,
      name: row.name,
      year: row.year,
      semesters: {
        sem1: row.sem1, sem2: row.sem2, sem3: row.sem3, sem4: row.sem4,
        sem5: row.sem5, sem6: row.sem6, sem7: row.sem7, sem8: row.sem8
      }
    }));

    try {
      const res = await fetch("https://techno-backend-76p3.onrender.com/api/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) alert("Fees saved!");
    } catch {
      alert("Failed to save.");
    }
  };

  const filteredData = filteredYear === "All" ? data : data.filter((d) => d.year === filteredYear);
  const uniqueYears = [...new Set(data.map((d) => d.year))];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white bg-red-900 py-3 px-4 rounded-t mb-4">💳 Fees Records</h1>

      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium">Filter by Year:</label>
        <select
          value={filteredYear}
          onChange={(e) => setFilteredYear(e.target.value)}
          className="px-3 py-1 rounded border border-gray-300"
        >
          <option value="All">All</option>
          {uniqueYears.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-slate-100 border border-gray-300 rounded">
        <HotTable
          ref={hotTableComponent}
          data={filteredData}
          colHeaders={["Roll", "Name", "Year", "Sem1", "Sem2", "Sem3", "Sem4", "Sem5", "Sem6", "Sem7", "Sem8"]}
          columns={[
            { data: "roll" }, { data: "name" }, { data: "year" },
            { data: "sem1" }, { data: "sem2" }, { data: "sem3" }, { data: "sem4" },
            { data: "sem5" }, { data: "sem6" }, { data: "sem7" }, { data: "sem8" }
          ]}
          autoColumnSize={true}
          stretchH="none"
          height="500px"
          licenseKey="non-commercial-and-evaluation"
        />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button onClick={saveChanges} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
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
  );
};

export default Fees;
