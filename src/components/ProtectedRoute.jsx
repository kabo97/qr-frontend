import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const role = localStorage.getItem("role");
  if (!role) {
    return <Navigate to="/" />;
  }
  if (adminOnly && role !== "Admin") {
    return <Navigate to="/view-slots" />;
  }
  return children;
}
export default ProtectedRoute;