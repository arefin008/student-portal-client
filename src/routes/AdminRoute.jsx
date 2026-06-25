import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminRoute() {
  const { user } = useAuth();
  const role = user?.role || localStorage.getItem("role");
  return role === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/student/result" replace />
  );
}
