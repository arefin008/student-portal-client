import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStudents } from "../../store/features/studentSlice";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { User, Mail, Phone, Building2 } from "lucide-react";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { list: students, loading } = useSelector((s) => s.students);
  const username = user?.username || localStorage.getItem("username") || "";

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const profile = students.find(
    (s) =>
      s.studentName.toLowerCase() === username.toLowerCase() ||
      s.email.toLowerCase() === username.toLowerCase(),
  );

  if (loading) return <Loader />;
  if (!profile)
    return (
      <div>
        <PageHeader title="My Profile" />
        <EmptyState
          message="Profile not found. Please contact admin."
          icon="👤"
        />
      </div>
    );

  const fields = [
    { icon: User, label: "Full Name", value: profile.studentName },
    { icon: Mail, label: "Email", value: profile.email },
    { icon: Phone, label: "Phone", value: profile.phone || "—" },
    { icon: Building2, label: "Class", value: profile.className },
  ];

  return (
    <div>
      <PageHeader title="My Profile" subtitle="Your personal information" />

      <div className="max-w-xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Avatar header */}
          <div className="bg-linear-to-r from-blue-600 to-blue-700 px-7 py-8 flex items-center gap-5">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl shrink-0">
              👨‍🎓
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold">
                {profile.studentName}
              </h2>
              <span className="inline-block mt-1 px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
                {profile.className}
              </span>
            </div>
          </div>

          {/* Info fields */}
          <div className="p-7 space-y-5">
            {fields.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
