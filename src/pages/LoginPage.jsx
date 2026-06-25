import { useEffect } from "react";
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
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const features = [
  {
    icon: Users,
    title: "Student Management",
    desc: "Add, edit and track every student record.",
  },
  {
    icon: ClipboardList,
    title: "Result Entry",
    desc: "Record and review exam marks instantly.",
  },
  {
    icon: BarChart3,
    title: "Live Dashboard",
    desc: "Real-time stats and charts at a glance.",
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
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center flex-1 px-16 py-12 bg-slate-900">
        <div className="max-w-md">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-8">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1
            className="text-4xl font-extrabold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Student Management
            <br />& Result Portal
          </h1>
          <p className="text-slate-400 text-base leading-relaxed mb-12">
            A complete platform to manage students, classes, subjects, and
            academic results — all in one place.
          </p>
          <div className="space-y-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-[460px] flex items-center justify-center p-8 bg-slate-800">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">StudentPortal</span>
          </div>

          <h2
            className="text-2xl font-bold text-white mb-1"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Sign in
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Enter your credentials to access the portal.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Username
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                placeholder="Enter your username"
                autoComplete="username"
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all text-white placeholder-slate-500
                  ${
                    errors.username
                      ? "border-red-500 bg-red-900/20"
                      : "border-slate-600 bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm outline-none transition-all text-white placeholder-slate-500
                    ${
                      errors.password
                        ? "border-red-500 bg-red-900/20"
                        : "border-slate-600 bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-150 mt-2"
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
