import React from "react";
import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "../../services/apiAdmin";

export default function ProtectedRoute({ element }) {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
