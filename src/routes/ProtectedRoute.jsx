import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader";

export default function ProtectedRoute() {
  const { user } = useAuth();
  const storedUser = localStorage.getItem("user");
  if (!user && !storedUser) return <Navigate to="/login" replace />;
  return <Outlet />;
}
