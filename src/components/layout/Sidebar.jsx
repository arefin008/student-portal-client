// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import {
//   LayoutDashboard,
//   Users,
//   Building2,
//   BookOpen,
//   ClipboardList,
//   BarChart3,
//   LogOut,
//   GraduationCap,
// } from "lucide-react";

// const adminLinks = [
//   { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//   { to: "/admin/students", icon: Users, label: "Students" },
//   { to: "/admin/classes", icon: Building2, label: "Classes" },
//   { to: "/admin/subjects", icon: BookOpen, label: "Subjects" },
//   { to: "/admin/results", icon: ClipboardList, label: "Result Entry" },
// ];
// const studentLinks = [
//   { to: "/student/result", icon: BarChart3, label: "My Results" },
// ];

// export default function Sidebar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const role = user?.role || localStorage.getItem("role");
//   const uname = user?.username || localStorage.getItem("username") || "User";
//   const links = role === "Admin" ? adminLinks : studentLinks;

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <aside className="w-60 bg-slate-900 flex flex-col h-screen sticky top-0 shrink-0 select-none">
//       {/* Logo */}
//       <div className="px-5 py-5 border-b border-slate-800">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
//             <GraduationCap className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <p className="text-white font-bold text-sm leading-tight">
//               StudentPortal
//             </p>
//             <p className="text-slate-500 text-xs mt-0.5">{role} Panel</p>
//           </div>
//         </div>
//       </div>

//       {/* Nav links */}
//       <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
//         <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 pb-3">
//           Navigation
//         </p>
//         {links.map(({ to, icon: Icon, label }) => (
//           <NavLink
//             key={to}
//             to={to}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
//              ${
//                isActive
//                  ? "bg-blue-600 text-white shadow-sm"
//                  : "text-slate-400 hover:text-white hover:bg-slate-800"
//              }`
//             }
//           >
//             <Icon className="w-4 h-4 shrink-0" />
//             {label}
//           </NavLink>
//         ))}
//       </nav>

//       {/* User info + logout */}
//       <div className="px-3 py-4 border-t border-slate-800 space-y-2">
//         <div className="px-3 py-2.5 bg-slate-800 rounded-lg">
//           <p className="text-slate-200 text-sm font-semibold truncate">
//             {uname}
//           </p>
//           <p className="text-slate-500 text-xs mt-0.5">{role}</p>
//         </div>
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm font-medium"
//         >
//           <LogOut className="w-4 h-4" /> Sign Out
//         </button>
//       </div>
//     </aside>
//   );
// }

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
  UserCircle,
} from "lucide-react";

const adminLinks = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/students", icon: Users, label: "Students" },
  { to: "/admin/classes", icon: Building2, label: "Classes" },
  { to: "/admin/subjects", icon: BookOpen, label: "Subjects" },
  { to: "/admin/results", icon: ClipboardList, label: "Result Entry" },
];

const studentLinks = [
  { to: "/student/profile", icon: UserCircle, label: "My Profile" },
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
    <aside className="w-full md:w-72 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0 select-none shadow-2xl">
      {/* Header */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>

          <div>
            <h2 className="text-white font-bold text-lg tracking-tight">
              StudentPortal
            </h2>
            <p className="text-slate-400 text-sm">{role} Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 overflow-y-auto">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] px-3 mb-4">
          Navigation
        </p>

        <div className="space-y-2">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40"
                    : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/60 backdrop-blur rounded-2xl p-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
              {uname.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="text-white font-semibold truncate">{uname}</p>
              <p className="text-slate-400 text-sm">{role}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-red-500 hover:text-white transition-all duration-300 font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
