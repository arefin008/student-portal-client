import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  Building2,
  BookOpen,
  ClipboardList,
  BarChart3,
  LogOut,
  GraduationCap,
} from "lucide-react";

const adminLinks = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/students", icon: Users, label: "Students" },
  { to: "/admin/classes", icon: Building2, label: "Classes" },
  { to: "/admin/subjects", icon: BookOpen, label: "Subjects" },
  { to: "/admin/results", icon: ClipboardList, label: "Result Entry" },
];
const studentLinks = [
  { to: "/student/result", icon: BarChart3, label: "My Results" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || localStorage.getItem("role");
  const uname = user?.username || localStorage.getItem("username") || "User";
  const links = role === "Admin" ? adminLinks : studentLinks;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-60 bg-slate-900 flex flex-col h-screen sticky top-0 flex-shrink-0 select-none">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">
              StudentPortal
            </p>
            <p className="text-slate-500 text-xs mt-0.5">{role} Panel</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 pb-3">
          Navigation
        </p>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
             ${
               isActive
                 ? "bg-blue-600 text-white shadow-sm"
                 : "text-slate-400 hover:text-white hover:bg-slate-800"
             }`
            }
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User info + logout */}
      <div className="px-3 py-4 border-t border-slate-800 space-y-2">
        <div className="px-3 py-2.5 bg-slate-800 rounded-lg">
          <p className="text-slate-200 text-sm font-semibold truncate">
            {uname}
          </p>
          <p className="text-slate-500 text-xs mt-0.5">{role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm font-medium"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
