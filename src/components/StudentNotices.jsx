import { useEffect, useState } from "react";

const StudentNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://techno-backend-76p3.onrender.com/api/notices")
      .then(res => res.json())
      .then(json => {
        if (json.success) setNotices(json.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
<h2 className="text-2xl font-bold text-red-800 mb-4">📝 Notices</h2>
      {notices.map(n => (
        <div key={n._id} className="border p-4 rounded shadow-sm bg-white">
          <h3 className="font-bold text-red-900">{n.title}</h3>
          <p className="text-gray-700">{n.description}</p>
          {n.fileURL && (
            <a href={n.fileURL} target="_blank" rel="noreferrer" className="text-blue-600 text-sm underline">View File</a>
          )}
          <p className="text-xs text-gray-500">{new Date(n.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentNotices;
