import React, { useEffect, useState, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';

const StudentsTable = () => {
  const [data, setData] = useState([]);
  const [filteredYear, setFilteredYear] = useState("All");
  const hotTableComponent = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://techno-backend-76p3.onrender.com/api/students");
      const json = await response.json();
      if (json.success) {
        const filtered = json.data.map((student) => ({
          name: student.name,
          gender: student.gender,
          phone: student.phone,
          email: student.email,
          roll: student.roll,
          stream: student.stream,
          year: student.year,
          bloodGroup: student.bloodGroup,
          address: student.address,
          state: student.state,
          district: student.district,
          pin: student.pin,
          fatherName: student.fatherName,
          fatherMobile: student.fatherMobile,
          fatherOccupation: student.fatherOccupation,
          fatherDesignation: student.fatherDesignation,
          fatherPan: student.fatherPan,
          fatherAddress: student.fatherAddress,
          fatherDistrict: student.fatherDistrict,
          fatherPin: student.fatherPin,
          motherName: student.motherName,
          motherMobile: student.motherMobile,
          motherOccupation: student.motherOccupation,
          motherDesignation: student.motherDesignation,
          motherPan: student.motherPan,
          motherAddress: student.motherAddress,
          motherDistrict: student.motherDistrict,
          motherPin: student.motherPin,
        }));
        setData(filtered);
      } else {
        alert("Failed to fetch data.");
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
      const response = await fetch("https://techno-backend-76p3.onrender.com/api/students", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const json = await response.json();
      if (json.success) {
        alert('Data saved successfully.');
        fetchData();
      } else {
        alert('Error saving data.');
      }
    } catch (error) {
      alert("Error connecting to the server.");
    }
  };

  const handleYearFilter = (year) => {
    setFilteredYear(year);
  };

  const filteredData =
    filteredYear === "All" ? data : data.filter((item) => item.year === filteredYear);

  const uniqueYears = [...new Set(data.map((s) => s.year))];

  return (
    <div className="notice-board-container">
      <h1 className="text-2xl font-bold text-white bg-red-900 py-3 px-4 rounded-t mb-4">
          🎓 Student Records
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

      <div style={{ overflowX: "auto" }}>
        <HotTable
          ref={hotTableComponent}
          data={filteredData}
          colHeaders={[
            'Name', 'Gender', 'Phone', 'Email', 'Roll', 'Stream', 'Joining Year', 'Blood Group',
            'Address', 'State', 'District', 'PIN',
            "Father's Name", "Father's Mobile", "Father's Occupation", "Father's Designation",
            "Father's PAN", "Father's Address", "Father's District", "Father's PIN",
            "Mother's Name", "Mother's Mobile", "Mother's Occupation", "Mother's Designation",
            "Mother's PAN", "Mother's Address", "Mother's District", "Mother's PIN"
          ]}
          columns={[
            { data: 'name' }, { data: 'gender' }, { data: 'phone' }, { data: 'email' },
            { data: 'roll' }, { data: 'stream' }, { data: 'year' }, { data: 'bloodGroup' },
            { data: 'address' }, { data: 'state' }, { data: 'district' }, { data: 'pin' },
            { data: 'fatherName' }, { data: 'fatherMobile' }, { data: 'fatherOccupation' },
            { data: 'fatherDesignation' }, { data: 'fatherPan' }, { data: 'fatherAddress' },
            { data: 'fatherDistrict' }, { data: 'fatherPin' },
            { data: 'motherName' }, { data: 'motherMobile' }, { data: 'motherOccupation' },
            { data: 'motherDesignation' }, { data: 'motherPan' }, { data: 'motherAddress' },
            { data: 'motherDistrict' }, { data: 'motherPin' }
          ]}
          height="500px"
          stretchH="all"
          licenseKey="non-commercial-and-evaluation"
        />
      </div>

      <div style={{ marginTop: "20px" }}>
      <button
            onClick={saveChanges}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
             Save Changes
          </button>        <a
          href="https://docs.google.com/spreadsheets/d/1ktIvhH1NSAYkjrd6jWOnY8XmeJPuJ2yguVS1KEbpaQI/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginLeft: "20px",
            padding: "10px 15px",
            background: "#1a73e8",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px"
          }}
        >
          Open Google Sheet
        </a>
      </div>
    </div>
  );
};

export default StudentsTable;
