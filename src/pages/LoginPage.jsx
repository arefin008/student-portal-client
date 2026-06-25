// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, clearError } from "../store/features/authSlice";
// import {
//   GraduationCap,
//   Users,
//   ClipboardList,
//   BarChart3,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";

// const features = [
//   {
//     icon: Users,
//     title: "Student Management",
//     desc: "Add, edit and track every student record.",
//   },
//   {
//     icon: ClipboardList,
//     title: "Result Entry",
//     desc: "Record and review exam marks instantly.",
//   },
//   {
//     icon: BarChart3,
//     title: "Live Dashboard",
//     desc: "Real-time stats and charts at a glance.",
//   },
// ];

// export default function LoginPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, user } = useSelector((state) => state.auth);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [showPwd, setShowPwd] = useState(false);

//   useEffect(() => {
//     if (user)
//       navigate(user.role === "Admin" ? "/admin/dashboard" : "/student/result", {
//         replace: true,
//       });
//   }, [user, navigate]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   const onSubmit = async (data) => {
//     const result = await dispatch(loginUser(data));
//     if (loginUser.fulfilled.match(result)) {
//       toast.success("Welcome back!");
//       const role = result.payload.role;
//       navigate(role === "Admin" ? "/admin/dashboard" : "/student/result");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex"
//       style={{ fontFamily: "'Inter', sans-serif" }}
//     >
//       {/* Left panel */}
//       <div className="hidden lg:flex flex-col justify-center flex-1 px-16 py-12 bg-slate-900">
//         <div className="max-w-md">
//           <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-8">
//             <GraduationCap className="w-8 h-8 text-white" />
//           </div>
//           <h1
//             className="text-4xl font-extrabold text-white mb-4 leading-tight"
//             style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//           >
//             Student Management
//             <br />& Result Portal
//           </h1>
//           <p className="text-slate-400 text-base leading-relaxed mb-12">
//             A complete platform to manage students, classes, subjects, and
//             academic results — all in one place.
//           </p>
//           <div className="space-y-6">
//             {features.map(({ icon: Icon, title, desc }) => (
//               <div key={title} className="flex gap-4 items-start">
//                 <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0">
//                   <Icon className="w-5 h-5 text-blue-400" />
//                 </div>
//                 <div>
//                   <p className="text-white font-semibold text-sm">{title}</p>
//                   <p className="text-slate-500 text-sm mt-0.5">{desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right panel — form */}
//       <div className="w-full lg:w-115 flex items-center justify-center p-8 bg-slate-800">
//         <div className="w-full max-w-sm">
//           <div className="lg:hidden flex items-center gap-3 mb-8">
//             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
//               <GraduationCap className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-white font-bold text-lg">StudentPortal</span>
//           </div>

//           <h2
//             className="text-2xl font-bold text-white mb-1"
//             style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//           >
//             Sign in
//           </h2>
//           <p className="text-slate-400 text-sm mb-8">
//             Enter your credentials to access the portal.
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             {/* Username */}
//             <div>
//               <label className="block text-sm font-medium text-slate-300 mb-1.5">
//                 Username
//               </label>
//               <input
//                 {...register("username", { required: "Username is required" })}
//                 placeholder="Enter your username"
//                 autoComplete="username"
//                 className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all text-white placeholder-slate-500
//                   ${
//                     errors.username
//                       ? "border-red-500 bg-red-900/20"
//                       : "border-slate-600 bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//                   }`}
//               />
//               {errors.username && (
//                 <p className="text-red-400 text-xs mt-1.5">
//                   {errors.username.message}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-slate-300 mb-1.5">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPwd ? "text" : "password"}
//                   {...register("password", {
//                     required: "Password is required",
//                   })}
//                   placeholder="Enter your password"
//                   autoComplete="current-password"
//                   className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm outline-none transition-all text-white placeholder-slate-500
//                     ${
//                       errors.password
//                         ? "border-red-500 bg-red-900/20"
//                         : "border-slate-600 bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
//                     }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPwd((p) => !p)}
//                   className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
//                 >
//                   {showPwd ? (
//                     <EyeOff className="w-4 h-4" />
//                   ) : (
//                     <Eye className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-400 text-xs mt-1.5">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-150 mt-2"
//             >
//               {loading ? "Signing in…" : "Sign In →"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../store/features/authSlice";
import {
  GraduationCap,
  Users,
  ClipboardList,
  BarChart3,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

const features = [
  {
    icon: Users,
    title: "Student Management",
    desc: "Add, edit and track every student record with full history.",
  },
  {
    icon: ClipboardList,
    title: "Result Entry",
    desc: "Record and review exam marks instantly across all subjects.",
  },
  {
    icon: BarChart3,
    title: "Live Dashboard",
    desc: "Real-time stats and performance charts at a glance.",
  },
];

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    if (user)
      navigate(user.role === "Admin" ? "/admin/dashboard" : "/student/result", {
        replace: true,
      });
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Welcome back!");
      const role = result.payload.role;
      navigate(role === "Admin" ? "/admin/dashboard" : "/student/result");
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex flex-col justify-between flex-1 px-14 py-12 relative overflow-hidden"
        style={{ background: "#0B0F1A" }}
      >
        {/* Ambient orbs */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 420,
            height: 420,
            background: "rgba(79,70,229,0.22)",
            filter: "blur(80px)",
            top: -100,
            left: -80,
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 280,
            height: 280,
            background: "rgba(139,92,246,0.15)",
            filter: "blur(70px)",
            bottom: 60,
            right: -40,
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top: logo + hero */}
        <div className="relative">
          {/* Logo */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8"
            style={{
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.1), 0 8px 24px rgba(79,70,229,0.4)",
            }}
          >
            <GraduationCap className="w-6 h-6 text-white" />
          </div>

          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            StudentPortal
          </p>

          <h1
            className="text-4xl font-extrabold leading-tight mb-4"
            style={{ color: "#fff", letterSpacing: "-0.02em" }}
          >
            Manage results,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #818CF8, #A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              smarter.
            </span>
          </h1>

          <p
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            A unified platform for student records, exam results, and academic
            insights — built for educators who move fast.
          </p>

          {/* Features */}
          <div className="mt-10 space-y-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(79,70,229,0.18)",
                    border: "1px solid rgba(79,70,229,0.3)",
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#818CF8" }} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: trust badges */}
        <div
          className="relative flex gap-2 flex-wrap pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {["🔒 Secure", "⚡ Real-time", "📊 Analytics", "☁️ Cloud-based"].map(
            (b) => (
              <span
                key={b}
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  color: "rgba(255,255,255,0.32)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {b}
              </span>
            ),
          )}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="w-full lg:w-105 flex items-center justify-center p-8"
        style={{
          background: "#111827",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">StudentPortal</span>
          </div>

          {/* Secure badge */}
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6"
            style={{
              color: "#818CF8",
              background: "rgba(79,70,229,0.12)",
              border: "1px solid rgba(79,70,229,0.25)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#818CF8" }}
            />
            Secure access
          </div>

          <h2
            className="text-2xl font-extrabold text-white mb-1"
            style={{ letterSpacing: "-0.02em" }}
          >
            Welcome back
          </h2>
          <p
            className="text-sm mb-8"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Sign in to your portal account to continue.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.22)" }}
                />
                <input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  placeholder="admin@school.edu"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 text-sm text-white outline-none transition-all rounded-xl"
                  style={{
                    background: errors.username
                      ? "rgba(239,68,68,0.08)"
                      : "rgba(255,255,255,0.05)",
                    border: errors.username
                      ? "1px solid rgba(239,68,68,0.6)"
                      : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "none",
                  }}
                  onFocus={(e) => {
                    if (!errors.username) {
                      e.target.style.border = "1px solid rgba(129,140,248,0.6)";
                      e.target.style.background = "rgba(79,70,229,0.07)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(79,70,229,0.15)";
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.username) {
                      e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                      e.target.style.background = "rgba(255,255,255,0.05)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.22)" }}
                />
                <input
                  type={showPwd ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 text-sm text-white outline-none transition-all rounded-xl"
                  style={{
                    background: errors.password
                      ? "rgba(239,68,68,0.08)"
                      : "rgba(255,255,255,0.05)",
                    border: errors.password
                      ? "1px solid rgba(239,68,68,0.6)"
                      : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "none",
                  }}
                  onFocus={(e) => {
                    if (!errors.password) {
                      e.target.style.border = "1px solid rgba(129,140,248,0.6)";
                      e.target.style.background = "rgba(79,70,229,0.07)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(79,70,229,0.15)";
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.password) {
                      e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                      e.target.style.background = "rgba(255,255,255,0.05)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.25)")
                  }
                >
                  {showPwd ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 mt-2 transition-all duration-150"
              style={{
                background: loading
                  ? "rgba(79,70,229,0.5)"
                  : "linear-gradient(135deg, #4F46E5, #7C3AED)",
                boxShadow: loading ? "none" : "0 4px 20px rgba(79,70,229,0.45)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign in <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
