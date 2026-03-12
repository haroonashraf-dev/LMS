import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const InstructorRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role !== "instructor") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default InstructorRoute;
