// components/RoleProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default RoleProtectedRoute;
