import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default ProtectedRoute;
