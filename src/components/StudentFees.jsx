import { useEffect, useState } from "react";

const StudentFees = () => {
  const [fees, setFees] = useState(null);
  const [error, setError] = useState("");
  const roll = localStorage.getItem("roll");

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await fetch(`https://techno-backend-76p3.onrender.com/api/students/${roll}/fees`);
        const json = await res.json();
        if (json.success) {
          setFees(json.data);
        } else {
          setError("Fees not found.");
        }
      } catch (err) {
        setError("Error fetching fees.");
      }
    };

    if (roll) {
      fetchFees();
    } else {
      setError("Roll not found in local storage.");
    }
  }, [roll]);

  const getStatus = (value) => {
    return value === 1 ? "✅ Paid" : "❌ Unpaid";
  };

  if (error) return <p className="text-red-600 p-4">{error}</p>;
  if (!fees) return <p className="p-4">Loading fees...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-800 mb-4">💰 My Fees</h2>

      <div className="border rounded bg-white shadow p-4">
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-red-100 text-red-900">
            <tr>
              <th className="border px-4 py-2 text-left">Semester</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(fees.semesters).map(([sem, value]) => (
              <tr key={sem} className="hover:bg-gray-50">
                <td className="border px-4 py-2 font-medium">{sem.toUpperCase()}</td>
                <td className="border px-4 py-2">{getStatus(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentFees;
