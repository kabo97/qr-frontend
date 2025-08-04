// pages/Dashboard.jsx
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-4">
        <Link to="/create-employee" className="block bg-purple-600 p-4 rounded hover:bg-purple-700">
          ➕ Create New Employee
        </Link>
        <Link to="/employees" className="block bg-blue-600 p-4 rounded hover:bg-blue-700">
          📋 View All Employees
        </Link>
      </div>
    </div>
  );
}
