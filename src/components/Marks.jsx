import React, { useEffect, useState, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';

const Marks = () => {
  const [data, setData] = useState([]);
  const [filteredYear, setFilteredYear] = useState("All");
  const hotTableComponent = useRef(null);

  const fetchData = async () => {
    try {
      const res = await fetch("https://techno-backend-76p3.onrender.com/api/marks");
      const json = await res.json();
      if (json.success) {
        const flatMarks = json.data.map((entry) => {
          const row = {
            roll: entry.roll,
            name: entry.name,
            year: entry.year
          };
          for (let sem = 1; sem <= 8; sem++) {
            for (let sub = 1; sub <= 5; sub++) {
              const subMarks = entry.marks?.[`sem${sem}`]?.[`sub${sub}`] || {};
              row[`sem${sem}_sub${sub}_ca1`] = subMarks.ca1 || 0;
              row[`sem${sem}_sub${sub}_ca2`] = subMarks.ca2 || 0;
              row[`sem${sem}_sub${sub}_ca3`] = subMarks.ca3 || 0;
              row[`sem${sem}_sub${sub}_ca4`] = subMarks.ca4 || 0;
            }
          }
          return row;
        });
        setData(flatMarks);
      }
    } catch {
      alert("Failed to fetch marks.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const hot = hotTableComponent.current?.hotInstance;
    hot?.getPlugin("autoColumnSize")?.recalculateAllColumnsWidth();
  }, [data]);

  const saveChanges = async () => {
    const updatedData = hotTableComponent.current.hotInstance.getSourceData();

    const reconstructed = updatedData.map((row) => {
      const marks = {};
      for (let sem = 1; sem <= 8; sem++) {
        const subjects = {};
        for (let sub = 1; sub <= 5; sub++) {
          subjects[`sub${sub}`] = {
            ca1: row[`sem${sem}_sub${sub}_ca1`] || 0,
            ca2: row[`sem${sem}_sub${sub}_ca2`] || 0,
            ca3: row[`sem${sem}_sub${sub}_ca3`] || 0,
            ca4: row[`sem${sem}_sub${sub}_ca4`] || 0
          };
        }
        marks[`sem${sem}`] = subjects;
      }

      return {
        roll: row.roll,
        name: row.name,
        year: row.year,
        marks
      };
    });

    try {
      const res = await fetch("https://techno-backend-76p3.onrender.com/api/marks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reconstructed)
      });
      const json = await res.json();
      if (json.success) alert("Marks saved.");
    } catch {
      alert("Save error.");
    }
  };

  const headers = [
    "Roll", "Name", "Year",
    ...Array.from({ length: 8 }, (_, sem) =>
      Array.from({ length: 5 }, (_, sub) =>
        ["ca1", "ca2", "ca3", "ca4"].map(ca => `Sem${sem + 1}_Sub${sub + 1}_${ca.toUpperCase()}`)
      ).flat()
    ).flat()
  ];

  const columns = headers.map((h) => ({ data: h.toLowerCase().replace(/_/g, "") }));

  const filteredData = filteredYear === "All" ? data : data.filter((d) => d.year === filteredYear);
  const uniqueYears = [...new Set(data.map((d) => d.year))];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white bg-red-900 py-3 px-4 rounded-t mb-4">📈 Marks Records</h1>

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
          colHeaders={headers}
          columns={headers.map((header) => ({ data: header.toLowerCase().replace(/_/g, "") }))}
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

export default Marks;
