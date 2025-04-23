import React, { useState } from "react";

function CreateAccount() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", roll: "", dob: "",
    bloodGroup: "", nationality: "",
    gender: "", caste: "", stream: "", year: "2024",
    enrollmentNo: "", examName: "", examRank: "",
    studentPan: "", studentPassport: "",
    address: "", district: "", state: "", pin: "",
    guardianName: "",

    fatherName: "", fatherMobile: "", fatherOccupation: "", fatherDesignation: "", fatherAge: "",
    fatherPan: "", fatherPassport: "", fatherAddress: "", fatherPin: "", fatherDistrict: "",

    motherName: "", motherMobile: "", motherOccupation: "", motherDesignation: "", motherAge: "",
    motherPan: "", motherPassport: "", motherAddress: "", motherPin: "", motherDistrict: "",

    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const requiredFields = Object.keys(form).filter(key => !key.toLowerCase().includes("passport"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "dob") setForm({ ...form, dob: value, password: value });
  };

  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    for (let key of requiredFields) {
      if (!form[key] || form[key].trim() === "") {
        setError(`Please fill the field: ${key}`);
        return;
      }
    }

    if (!isValidPhone(form.phone) || !isValidPhone(form.fatherMobile) || !isValidPhone(form.motherMobile)) {
      setError("All phone numbers must be valid 10-digit numbers starting with 6-9.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Invalid email format.");
      return;
    }

    if (new Set([form.phone, form.fatherMobile, form.motherMobile]).size !== 3) {
      setError("Student, father, and mother phone numbers must be different.");
      return;
    }

    try {
      const res = await fetch("https://techno-backend-76p3.onrender.com/api/students/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        setError("Failed to create student. Server error.");
        return;
      }

      setError("");
      setSuccess("Account created successfully!");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
  };

  const renderInput = (label, name, type = "text") => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="p-2 border rounded"
      />
    </div>
  );

  const renderSection = (title, fields) => (
    <section className="mt-6">
      <h3 className="text-lg font-bold text-red-800 mb-2">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => renderInput(field.label, field.name, field.type))}
      </div>
    </section>
  );

  return (
    <div className="bg-red-800 min-h-screen flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-semibold text-red-800 mb-4">Create Student Account</h2>

        {success && <p className="text-green-600 font-medium mb-4">{success}</p>}

        {/* Personal Info */}
        {renderSection("Personal Info", [
          { label: "Full Name", name: "name" },
          { label: "Email", name: "email" },
          { label: "Phone", name: "phone" },
          { label: "Roll Number", name: "roll" },
          { label: "Date of Birth", name: "dob", type: "date" },
          { label: "Blood Group", name: "bloodGroup" },
          { label: "Nationality", name: "nationality" },
          { label: "Address", name: "address" },
          { label: "District", name: "district" },
          { label: "State", name: "state" },
          { label: "PIN Code", name: "pin" },
          { label: "Gender", name: "gender" },
          { label: "Caste", name: "caste" },
          { label: "Stream", name: "stream" },
          { label: "Joining Year", name: "year" },
          { label: "Enrollment No", name: "enrollmentNo" },
          { label: "Exam Name", name: "examName" },
          { label: "Exam Rank", name: "examRank" },
          { label: "Student PAN", name: "studentPan" },
          { label: "Student Passport", name: "studentPassport" },
          { label: "Guardian Name", name: "guardianName" },
        ])}

        {/* Father's Info */}
        {renderSection("Father's Info", [
          { label: "Father's Name", name: "fatherName" },
          { label: "Mobile", name: "fatherMobile" },
          { label: "Occupation", name: "fatherOccupation" },
          { label: "Designation", name: "fatherDesignation" },
          { label: "Age", name: "fatherAge" },
          { label: "PAN", name: "fatherPan" },
          { label: "Passport", name: "fatherPassport" },
          { label: "Address", name: "fatherAddress" },
          { label: "PIN", name: "fatherPin" },
          { label: "District", name: "fatherDistrict" },
        ])}

        {/* Mother's Info */}
        {renderSection("Mother's Info", [
          { label: "Mother's Name", name: "motherName" },
          { label: "Mobile", name: "motherMobile" },
          { label: "Occupation", name: "motherOccupation" },
          { label: "Designation", name: "motherDesignation" },
          { label: "Age", name: "motherAge" },
          { label: "PAN", name: "motherPan" },
          { label: "Passport", name: "motherPassport" },
          { label: "Address", name: "motherAddress" },
          { label: "PIN", name: "motherPin" },
          { label: "District", name: "motherDistrict" },
        ])}

        {/* Submit Section with Error */}
        <div className="text-center mt-8">
          {error && <p className="text-red-600 font-medium mb-4">{error}</p>}
          <button
            className="bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
