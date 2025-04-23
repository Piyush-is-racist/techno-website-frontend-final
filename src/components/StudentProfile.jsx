import React, { useEffect, useState } from "react";

const HIDDEN_KEYS = ["_id", "__v", "homework", "classwork"];

const StudentProfile = () => {
  const roll = localStorage.getItem("roll");
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetch(`https://techno-backend-76p3.onrender.com/api/students/${roll}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setProfile(json.data);
          setForm(json.data);
        }
      });
  }, [roll]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const saveProfile = async () => {
    const res = await fetch(`https://techno-backend-76p3.onrender.com/api/students/${roll}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    if (json.success) {
      alert("Profile updated!");
      setEditing(false);
      setProfile(json.data);
    } else {
      alert("Update failed.");
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-red-800 mb-4">👤 My Profile</h2>
        <button
          onClick={() => setEditing((prev) => !prev)}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(form)
          .filter(([key]) => !HIDDEN_KEYS.includes(key))
          .map(([key, val]) => (
            <div key={key}>
              <label className="block font-semibold text-sm capitalize">{key}</label>
              <input
                name={key}
                value={val || ""}
                disabled={!editing}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded"
              />
            </div>
          ))}
      </div>

      {editing && (
        <button
          onClick={saveProfile}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          💾 Save Changes
        </button>
      )}
    </div>
  );
};

export default StudentProfile;
