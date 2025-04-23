import React, { useState, useEffect } from "react";

const API = "https://techno-backend-76p3.onrender.com/api/gallery";

const Gallery = () => {
  const [form, setForm] = useState({ eventTitle: "", driveLinks: [""] });
  const [galleryItems, setGalleryItems] = useState([]);

  const fetchGallery = async () => {
    const res = await fetch(API);
    const json = await res.json();
    if (json.success) setGalleryItems(json.data);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...form.driveLinks];
    updatedLinks[index] = value;
    setForm({ ...form, driveLinks: updatedLinks });
  };

  const addLinkField = () => {
    setForm({ ...form, driveLinks: [...form.driveLinks, ""] });
  };

  const submitGallery = async (e) => {
    e.preventDefault();
    const trimmedLinks = form.driveLinks.map(l => l.trim()).filter(Boolean); // ✅ Remove blanks
    if (!form.eventTitle.trim()) return alert("Event title is required.");
    if (trimmedLinks.length === 0) return alert("At least one Drive link is required.");

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventTitle: form.eventTitle.trim(),
        driveLinks: trimmedLinks
      })
    });

    const json = await res.json();
    if (json.success) {
      setForm({ eventTitle: "", driveLinks: [""] });
      fetchGallery();
    } else {
      alert("Failed to save gallery event.");
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchGallery();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-800 mb-4">📷 Add Gallery Event</h2>

      <form onSubmit={submitGallery} className="bg-white border p-4 rounded space-y-4 mb-6">
        <input
          type="text"
          name="eventTitle"
          value={form.eventTitle}
          onChange={(e) => setForm({ ...form, eventTitle: e.target.value })}
          placeholder="Event Title"
          required
          className="w-full p-2 border rounded"
        />

        <div className="space-y-2">
          {form.driveLinks.map((link, i) => (
            <input
              key={i}
              type="text"
              value={link}
              onChange={(e) => handleLinkChange(i, e.target.value)}
              placeholder={`Drive Link ${i + 1}`}
              className="w-full p-2 border rounded"
            />
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">

        <button type="button" onClick={addLinkField} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
        ➕ Add Link
        </button>
        <button
          type="submit"
          className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
        >
          Save Event
        </button>
        </div>
      </form>

      <h3 className="text-xl font-semibold text-red-800 mb-2">🖼️ Gallery Events</h3>
      {galleryItems.length === 0 ? (
        <p>No gallery entries found.</p>
      ) : (
        <ul className="space-y-4">
          {galleryItems.map((item) => (
            <li key={item._id} className="bg-white p-4 border rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg text-red-900">{item.eventTitle}</h4>
                  <ul className="list-disc pl-6 text-sm text-blue-700">
                    {item.driveLinks.map((link, idx) => (
                      <li key={idx}>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
                          Link {idx + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="bg-red-600 text-white px-2 py-1 text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Gallery;
