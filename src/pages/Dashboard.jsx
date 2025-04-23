import { useEffect, useState } from "react";
import { CgMenu, CgChevronDoubleRight } from "react-icons/cg";

// Components
import Notices from "../components/StudentNotices";
import StudentDetails from "../components/StudentProfile";
import Marks from "../components/StudentMarks";
import Fees from "../components/StudentFees";
import Attendance from "../components/StudentAttendance";
import Gallery from "../components/StudentGallery";

function Navbar({ toggleSidebar, handleLogout }) {
  return (
    <header className="bg-red-900 text-white px-4 py-3 flex items-center justify-between shadow-md">
      <button onClick={toggleSidebar} className="text-2xl">
        <CgMenu />
      </button>
      <h5 className="text-xl font-bold">Techno Student Portal</h5>
      <button
        onClick={handleLogout}
        className="text-sm bg-white text-red-800 px-3 py-1 rounded hover:bg-gray-200"
      >
        Logout
      </button>
    </header>
  );
}

function Sidebar({ isOpen, activePage, setActivePage }) {
  const menuItems = [
    { label: "Notices", value: "notices" },
    { label: "My Profile", value: "profile" },
    { label: "Marks", value: "marks" },
    { label: "Fees", value: "fees" },
    { label: "Attendance", value: "attendance" },
    { label: "Gallery", value: "gallery" },
  ];

  return (
    <aside
      className={`bg-red-900 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-0"
      } flex flex-col overflow-y-auto`}
    >
      <nav className="flex flex-col gap-2 mt-4 px-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActivePage(item.value)}
            className={`hover:bg-red-950 px-3 py-2 flex items-center gap-3 transition-all ${
              activePage === item.value ? "bg-red-950 font-bold" : ""
            }`}
          >
            <CgChevronDoubleRight />
            <span className={`${isOpen ? "block" : "hidden"} text-md`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function Content({ activePage }) {
  switch (activePage) {
    case "profile":
      return <StudentDetails />;
    case "marks":
      return <Marks />;
    case "fees":
      return <Fees />;
    case "attendance":
      return <Attendance />;
    case "gallery":
      return <Gallery />;
    case "notices":
    default:
      return <Notices />;
  }
}

function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState("notices");

  const handleLogout = () => {
    localStorage.removeItem("userType");
    window.location.href = "/";
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} handleLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 bg-white text-black p-6 overflow-y-auto">
          <Content activePage={activePage} />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
