import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;