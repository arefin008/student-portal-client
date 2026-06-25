import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students";
import Classes from "./pages/admin/Classes";
import Subjects from "./pages/admin/Subjects";
import ResultEntry from "./pages/admin/ResultEntry";
import MyResult from "./pages/student/MyResult";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            borderRadius: "12px",
            padding: "12px 16px",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/students" element={<Students />} />
              <Route path="/admin/classes" element={<Classes />} />
              <Route path="/admin/subjects" element={<Subjects />} />
              <Route path="/admin/results" element={<ResultEntry />} />
            </Route>
            <Route path="/student/result" element={<MyResult />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
