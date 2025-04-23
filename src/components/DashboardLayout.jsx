import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ to, label }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded transition font-medium ${
        isActive ? "bg-red-100 text-red-700" : "hover:bg-red-100 text-gray-800"
      }`}
    >
      {label}
    </Link>
  );
};

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-red-50">
      <nav className="flex items-center justify-between bg-red-600 text-white px-4 py-3 shadow">
        <div className="flex items-center">
          <button
            className="text-white text-2xl mr-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">Student Portal</h1>
        </div>
      </nav>

      <div
        className={`fixed top-[56px] left-0 w-64 h-full bg-white shadow-md z-20 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-2 p-4">
          <SidebarItem to="/dashboard" label="🏠 Notice Board" />
          <SidebarItem to="/details" label="📝 Full Details" />
          <SidebarItem to="/marks" label="📊 Marks" />
          <SidebarItem to="/fees" label="💰 Fees" />
          <SidebarItem to="/attendance" label="📆 Attendance" />
        </div>
      </div>

      <main
        className={`pt-6 px-6 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
