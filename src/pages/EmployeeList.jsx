import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { Link } from "react-router-dom";
import QRCodeWithLogo from "../components/QRCodeWithLogo";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  // Fetch employees on mount
  useEffect(() => {
    axios.get("/Employees")
      .then(res => setEmployees(res.data))
      .catch(err => {
        console.error("Failed to fetch employees:", err);
        alert("Error fetching employees");
      });
  }, []);

  // Log state changes (for debug)
  useEffect(() => {
    console.log("Fetched employees:", employees);
  }, [employees]);

  // Handle deletion
  const deleteEmployee = async (Id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`/Employees/${Id}`);
      setEmployees(prev => prev.filter((e) => e.Id !== Id));
    } catch (err) {
      alert("Failed to delete employee.");
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">All Employees</h2>

      {employees.length === 0 ? (
        <p className="text-gray-400">No employees found.</p>
      ) : (
        <div className="grid gap-4">
          {employees.map(emp => (
            <div key={emp.Id} className="bg-gray-800 p-4 rounded shadow">
              <h3 className="font-semibold text-lg">
                ID: {emp.Id} - {emp.FullName}
              </h3>
              <p className="text-sm text-gray-400">{emp.JobTitle}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`/view-employee/${emp.Id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                >
                  View
                </a>

                <button
                  onClick={() => navigator.clipboard.writeText(`${window.location.origin}/view-employee/${emp.Id}`)}
                  className="px-4 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm transition"
                >
                  Copy QR Link
                </button>

                <QRCodeWithLogo url={`${window.location.origin}/view-employee/${emp.Id}`} id={emp.Id} />

                <button
                  onClick={() => deleteEmployee(emp.Id)}
                  className="px-4 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
