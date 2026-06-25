import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users, Building2, BookOpen, ClipboardList } from "lucide-react";
import { fetchDashboardStats } from "../../store/features/dashboardSlice";
import { fetchResults } from "../../store/features/resultSlice";
import StatCard from "../../components/common/StatCard";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PIE_COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#0EA5E9",
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, loading: statsLoading } = useSelector((s) => s.dashboard);
  const { list: results, loading: resLoading } = useSelector((s) => s.results);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchResults());
  }, [dispatch]);

  if (statsLoading || resLoading) return <Loader />;

  // Subject avg for bar chart
  const subjectMap = {};
  results.forEach((r) => {
    if (!subjectMap[r.subjectName])
      subjectMap[r.subjectName] = { total: 0, count: 0 };
    subjectMap[r.subjectName].total += r.marks;
    subjectMap[r.subjectName].count += 1;
  });
  const barData = Object.entries(subjectMap).map(([name, v]) => ({
    name,
    avg: +(v.total / v.count).toFixed(1),
  }));

  // Grade distribution for pie chart
  const gradeDist = { "A+": 0, A: 0, B: 0, C: 0, D: 0, F: 0 };
  results.forEach((r) => {
    const m = r.marks;
    gradeDist[
      m >= 90
        ? "A+"
        : m >= 80
          ? "A"
          : m >= 70
            ? "B"
            : m >= 60
              ? "C"
              : m >= 50
                ? "D"
                : "F"
    ]++;
  });
  const pieData = Object.entries(gradeDist)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  const cards = [
    {
      label: "Total Students",
      value: stats?.totalStudents ?? 0,
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Classes",
      value: stats?.totalClasses ?? 0,
      icon: Building2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Total Subjects",
      value: stats?.totalSubjects ?? 0,
      icon: BookOpen,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Total Results",
      value: stats?.totalResults ?? 0,
      icon: ClipboardList,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  // return (
  //   <div>
  //     <PageHeader
  //       title="Overview"
  //       subtitle="Welcome back — here's your portal at a glance."
  //     />

  //     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
  //       {cards.map((c) => (
  //         <StatCard key={c.label} {...c} />
  //       ))}
  //     </div>

  //     <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
  //       {/* Bar chart */}
  //       <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
  //         <h3 className="font-bold text-slate-800 mb-5 text-base">
  //           Average Marks by Subject
  //         </h3>
  //         {barData.length ? (
  //           <ResponsiveContainer width="100%" height={240}>
  //             <BarChart data={barData} barSize={40}>
  //               <CartesianGrid
  //                 strokeDasharray="3 3"
  //                 stroke="#F1F5F9"
  //                 vertical={false}
  //               />
  //               <XAxis
  //                 dataKey="name"
  //                 tick={{
  //                   fontSize: 12,
  //                   fill: "#64748B",
  //                   fontFamily: "Inter, sans-serif",
  //                 }}
  //                 axisLine={false}
  //                 tickLine={false}
  //               />
  //               <YAxis
  //                 domain={[0, 100]}
  //                 tick={{
  //                   fontSize: 12,
  //                   fill: "#64748B",
  //                   fontFamily: "Inter, sans-serif",
  //                 }}
  //                 axisLine={false}
  //                 tickLine={false}
  //               />
  //               <Tooltip
  //                 contentStyle={{
  //                   borderRadius: 10,
  //                   border: "1px solid #E2E8F0",
  //                   fontFamily: "Inter, sans-serif",
  //                   fontSize: 13,
  //                 }}
  //                 formatter={(v) => [`${v}%`, "Avg Marks"]}
  //               />
  //               <Bar dataKey="avg" fill="#2563EB" radius={[6, 6, 0, 0]} />
  //             </BarChart>
  //           </ResponsiveContainer>
  //         ) : (
  //           <div className="h-60 flex items-center justify-center text-slate-400 text-sm">
  //             No result data yet
  //           </div>
  //         )}
  //       </div>

  //       {/* Pie chart */}
  //       <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
  //         <h3 className="font-bold text-slate-800 mb-5 text-base">
  //           Grade Distribution
  //         </h3>
  //         {pieData.length ? (
  //           <ResponsiveContainer width="100%" height={240}>
  //             <PieChart>
  //               <Pie
  //                 data={pieData}
  //                 cx="50%"
  //                 cy="50%"
  //                 outerRadius={85}
  //                 innerRadius={40}
  //                 dataKey="value"
  //                 label={({ name, percent }) =>
  //                   `${name} ${(percent * 100).toFixed(0)}%`
  //                 }
  //                 labelLine={false}
  //               >
  //                 {pieData.map((_, i) => (
  //                   <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
  //                 ))}
  //               </Pie>
  //               <Legend
  //                 wrapperStyle={{
  //                   fontFamily: "Inter, sans-serif",
  //                   fontSize: 13,
  //                 }}
  //               />
  //               <Tooltip
  //                 contentStyle={{
  //                   borderRadius: 10,
  //                   border: "1px solid #E2E8F0",
  //                   fontFamily: "Inter, sans-serif",
  //                   fontSize: 13,
  //                 }}
  //               />
  //             </PieChart>
  //           </ResponsiveContainer>
  //         ) : (
  //           <div className="h-60 flex items-center justify-center text-slate-400 text-sm">
  //             No result data yet
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 md:p-8 lg:p-10 shadow-xl">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-blue-100 text-sm md:text-base max-w-2xl">
            Welcome back. Monitor student performance, academic records,
            classes, and results from one place.
          </p>
        </div>

        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10"></div>
        <div className="absolute right-10 bottom-0 h-32 w-32 rounded-full bg-white/10"></div>
      </div>

      {/* Stats */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Key Statistics
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Quick overview of your portal data.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((c) => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>
      </section>

      {/* Charts */}
      <section>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Average Marks by Subject
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Subject-wise academic performance analysis.
              </p>
            </div>

            {barData.length ? (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={barData} barSize={42}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E2E8F0"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748B",
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748B",
                      fontSize: 12,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                    }}
                    formatter={(v) => [`${v}%`, "Average"]}
                  />

                  <Bar dataKey="avg" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-slate-400">
                No result data available
              </div>
            )}
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Grade Distribution
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Overall grade performance across students.
              </p>
            </div>

            {pieData.length ? (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={55}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>

                  <Legend />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-slate-400">
                No result data available
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
