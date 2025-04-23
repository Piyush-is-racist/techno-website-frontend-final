import { useEffect, useState } from "react";

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState("");
  const roll = localStorage.getItem("roll");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch(`https://techno-backend-76p3.onrender.com/api/students/${roll}/attendance`);
        const json = await res.json();
        if (json.success) {
          setAttendance(json.data);
        } else {
          setError("Attendance not found.");
        }
      } catch (err) {
        setError("Error fetching attendance.");
      }
    };

    if (roll) {
      fetchAttendance();
    } else {
      setError("Roll not found in local storage.");
    }
  }, [roll]);

  const displayValue = (value) => {
    return value?.trim() === "" ? "N/A" : value;
  };

  if (error) return <p className="text-red-600 p-4">{error}</p>;
  if (!attendance) return <p className="p-4">Loading attendance...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-800 mb-4">📅 Attendance</h2>

      <div className="border rounded bg-white shadow p-4">
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-red-100 text-red-900">
            <tr>
              <th className="border px-4 py-2 text-left">Month</th>
              <th className="border px-4 py-2 text-left">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(attendance.months).map(([month, value]) => (
              <tr key={month} className="hover:bg-gray-50">
                <td className="border px-4 py-2 font-medium">{month.toUpperCase()}</td>
                <td className="border px-4 py-2">{displayValue(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAttendance;
