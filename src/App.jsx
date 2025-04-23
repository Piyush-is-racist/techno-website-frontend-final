import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateAccount from "./pages/CreateAccount";

function App() {
  useEffect(() => {
    const clearSessionOnClose = () => {
      localStorage.removeItem("userType");
      localStorage.removeItem("roll");
    };

    window.addEventListener("beforeunload", clearSessionOnClose);

    return () => {
      window.removeEventListener("beforeunload", clearSessionOnClose);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
