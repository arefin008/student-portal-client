import { useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const titles = {
  "/admin/dashboard": "Dashboard",
  "/admin/students": "Student Management",
  "/admin/classes": "Class Management",
  "/admin/subjects": "Subject Management",
  "/admin/results": "Result Entry",
  "/student/result": "My Results",
};

export default function TopBar() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const uname = user?.username || localStorage.getItem("username") || "";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-slate-100 h-16 flex items-center justify-between px-7 flex-shrink-0 sticky top-0 z-10">
      <div>
        <h1 className="text-lg font-bold text-slate-800">
          {titles[pathname] || "Student Portal"}
        </h1>
        <p className="text-slate-400 text-xs hidden sm:block">{today}</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="w-4 h-4 text-slate-500" />
        </button>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          {uname.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
