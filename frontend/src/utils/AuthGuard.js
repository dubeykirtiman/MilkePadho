import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("token"); 

  console.log("🔍 Auth Check:", token);

  if (!token) {
    console.log("Not Authenticated! Redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  console.log("Authenticated! Rendering protected route...");
  return children;
};

export default AuthGuard;
