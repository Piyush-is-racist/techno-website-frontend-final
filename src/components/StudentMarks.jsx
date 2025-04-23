import { useEffect, useState } from "react";

const StudentMarks = () => {
  const [marks, setMarks] = useState(null);
  const [error, setError] = useState("");
  const roll = localStorage.getItem("roll");

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await fetch(`https://techno-backend-76p3.onrender.com/api/students/${roll}/marks`);
        const json = await res.json();
        if (json.success) {
          setMarks(json.data);
        } else {
          setError("Marks not found.");
        }
      } catch (err) {
        setError("Error fetching marks.");
      }
    };

    if (roll) {
      fetchMarks();
    } else {
      setError("Roll not found in local storage.");
    }
  }, [roll]);

  const formatValue = (val) =>
    val === 0 || val === null || val === undefined || val === "" ? "Missing" : val;

  if (error) return <p className="text-red-600 p-4">{error}</p>;
  if (!marks) return <p className="p-4">Loading marks...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-800 mb-4">📊 My Marks</h2>
      <div className="grid gap-6">
        {Object.entries(marks.marks).map(([sem, subjects]) => (
          <div key={sem} className="border p-4 rounded shadow bg-white">
            <h3 className="text-lg font-semibold text-red-800 mb-4">
              {sem.toUpperCase()}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-300">
                <thead className="bg-red-100 text-red-900 font-semibold">
                  <tr>
                    <th className="border px-3 py-2">Subject</th>
                    <th className="border px-3 py-2">CA1</th>
                    <th className="border px-3 py-2">CA2</th>
                    <th className="border px-3 py-2">CA3</th>
                    <th className="border px-3 py-2">CA4</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(subjects).map(([sub, ca]) => (
                    <tr key={sub} className="bg-white hover:bg-gray-50">
                      <td className="border px-3 py-2">{sub.toUpperCase()}</td>
                      <td className="border px-3 py-2">{formatValue(ca.ca1)}</td>
                      <td className="border px-3 py-2">{formatValue(ca.ca2)}</td>
                      <td className="border px-3 py-2">{formatValue(ca.ca3)}</td>
                      <td className="border px-3 py-2">{formatValue(ca.ca4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentMarks;
