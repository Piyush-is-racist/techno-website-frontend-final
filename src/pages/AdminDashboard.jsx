import { useState } from "react";
import { CgMenu, CgChevronDoubleRight } from "react-icons/cg";

// Admin Components
import StudentDetails from "../components/StudentsTable";
import Notice from "../components/Notice";
import Classworks from "../components/Classworks";
import Homeworks from "../components/Homeworks";
import Attendance from "../components/Attendance";
import Marks from "../components/Marks";
import Fees from "../components/Fees";
import Gallery from "../components/Gallery";

function Navbar({ toggleSidebar, handleLogout }) {
  return (
    <header className="bg-red-900 text-white px-4 py-3 flex items-center justify-between shadow-md">
      <button onClick={toggleSidebar} className="text-2xl">
        <CgMenu />
      </button>
      <h1 className="text-xl font-semibold">Techno Admin Portal</h1>
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
    { label: "Student Details", value: "students" },
    { label: "Notice", value: "notice" },
    { label: "Classworks", value: "classworks" },
    { label: "Homeworks", value: "homeworks" },
    { label: "Attendance", value: "attendance" },
    { label: "Add Marks", value: "marks" },
    { label: "Fees", value: "fees" },
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
    case "students":
      return <StudentDetails />;
    case "notice":
      return <Notice />;
    case "classworks":
      return <Classworks />;
    case "homeworks":
      return <Homeworks />;
    case "attendance":
      return <Attendance />;
    case "marks":
      return <Marks />;
    case "fees":
      return <Fees />;
    case "gallery":
      return <Gallery />;
    default:
      return <div>Welcome to Admin Dashboard</div>;
  }
}

function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState("students");

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

export default AdminDashboard;
