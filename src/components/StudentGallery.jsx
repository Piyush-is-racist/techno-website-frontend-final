import { useEffect, useState } from "react";

const GalleryView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://techno-backend-76p3.onrender.com/api/gallery")
      .then(res => res.json())
      .then(json => {
        if (json.success) setEvents(json.data);
      });
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-red-800 mb-4">Gallery</h2>
      {events.map(ev => (
        <div key={ev._id} className="bg-white p-4 rounded border shadow">
          <h3 className="font-bold text-lg text-red-900 mb-2">{ev.eventTitle}</h3>
          <ul className="list-disc pl-6 text-sm text-blue-700 space-y-1">
            {ev.driveLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-900"
                >
                  📎 Drive Link {idx + 1}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(ev.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GalleryView;
