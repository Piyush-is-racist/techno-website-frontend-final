import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (!userType) return;
    if (userType === "admin") navigate("/admin-dashboard");
    else if (userType === "student") navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://techno-backend-76p3.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roll, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("userType", data.role);
        localStorage.setItem("roll", roll); // ✅ Save roll here
        if (data.role === "admin") navigate("/admin-dashboard");
        else if (data.role === "student") navigate("/dashboard");
        else setError("Unknown user role.");
      } else {
        setError("Invalid ID or Password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-red-800 font-sans">
      <div className="text-center w-11/12 max-w-md p-8">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc98Gu9Cu8kioz3qcFNpOv4eZMGi2y1RAUIw&s"
          alt="Logo"
          className="w-24 h-24 mx-auto rounded-full shadow-md mb-5"
        />
        <h2 className="text-white text-2xl mb-8 font-semibold">Techno Login Portal</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Student/Admin ID"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            required
            className="px-4 bg-slate-200 py-2 rounded-md text-base outline-none w-full text-black"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (or DOB for students)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 bg-slate-200 rounded-md text-base outline-none w-full text-black pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-red-900 hover:bg-[#a00000] text-white px-4 py-2 rounded-md text-base font-medium"
          >
            LOGIN
          </button>
        </form>
        {error && <p className="text-yellow-300 mt-3 text-sm">{error}</p>}
        <p className="mt-6 text-white text-sm underline">
          <Link to="/create-account">Don't have an account? Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
