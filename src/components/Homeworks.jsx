import React, { useEffect, useState } from "react";

const API = "https://techno-backend-76p3.onrender.com/api/homework";

const Homework = () => {
  const [notices, setNotices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    fileURL: "",
    yearGroup: ""
  });
  const [filterYear, setFilterYear] = useState("All");

  const fetchNotices = async () => {
    const res = await fetch(API);
    const json = await res.json();
    if (json.success) {
      setNotices(json.data);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    if (filterYear === "All") {
      setFiltered(notices);
    } else {
      setFiltered(notices.filter(n => n.yearGroup === parseInt(filterYear)));
    }
  }, [notices, filterYear]);

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.yearGroup) return alert("All fields including year are required.");

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: new Date() })
      });

      const json = await res.json();
      if (json.success) {
        setForm({ title: "", description: "", fileURL: "", yearGroup: "" });
        fetchNotices();
      } else {
        alert("Failed to add homework.");
      }
    } catch (err) {
      alert("Error posting homework.");
    }
  };

  const handleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const deleteSelected = async () => {
    if (!selected.length) return alert("No homework selected.");
    if (!window.confirm("Delete selected homework?")) return;

    for (const id of selected) {
      await fetch(`${API}/${id}`, { method: "DELETE" });
    }
    setSelected([]);
    fetchNotices();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-800 mb-4">📘 Homework</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white border p-4 rounded mb-6 space-y-4"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleInput}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleInput}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
        <input
          name="fileURL"
          value={form.fileURL}
          onChange={handleInput}
          placeholder="File URL (optional)"
          className="w-full p-2 border rounded"
        />
        <select
          name="yearGroup"
          value={form.yearGroup}
          onChange={handleInput}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Year</option>
          {[1, 2, 3, 4].map((year) => (
            <option key={year} value={year}>{year} Year</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
        >
          Add Homework
        </button>
      </form>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-red-800">📢 All Homework</h3>
        <button
          onClick={deleteSelected}
          className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-900"
        >
          Delete Selected
        </button>
      </div>

     <div className="mb-6">
        <label className="mr-2 font-medium text-sm">Filter by Year:</label>
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="All">All</option>
          {[1, 2, 3, 4].map((year) => (
            <option key={year} value={year}>
              {year} Year
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No homework found.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((notice) => (
            <li
              key={notice._id}
              className="bg-white p-4 border rounded flex justify-between items-start"
            >
              <div>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selected.includes(notice._id)}
                  onChange={() => handleSelect(notice._id)}
                />
                <span className="font-bold text-lg text-red-900">{notice.title}</span>
                <p className="text-sm text-gray-700">{notice.description}</p>
                {notice.fileURL && (
                  <a
                    href={notice.fileURL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View File
                  </a>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notice.date).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Homework;
