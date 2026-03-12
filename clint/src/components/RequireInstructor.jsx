import { Navigate, Outlet } from "react-router-dom";

const RequireInstructor = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "instructor") {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default RequireInstructor;
