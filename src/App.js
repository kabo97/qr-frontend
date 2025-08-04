import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Dashboard';
import CreateEmployeePage from './pages/CreateEmployee';
import PublicEmployeeProfilePage from './pages/PublicEmployeeProfile';
import EmployeeListPage from './pages/EmployeeList';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage /> } />
        <Route path="/create-employee" element={<CreateEmployeePage /> } />
        <Route path="/view-employee/:id" element={<PublicEmployeeProfilePage />} />
        <Route path="/employees" element={<EmployeeListPage />} />

      </Routes>
    </Router>
  );
}

export default App;
