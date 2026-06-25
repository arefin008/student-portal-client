import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../store/features/studentSlice";
import { fetchStudentResult } from "../../store/features/resultSlice";
import { getGrade } from "../../utils/gradeHelper";
import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function MyResult() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { list: students } = useSelector((s) => s.students);
  const { studentResult, loading, error } = useSelector((s) => s.results);

  const username = user?.username || localStorage.getItem("username") || "";

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (students.length && username) {
      const match = students.find(
        (s) =>
          s.studentName.toLowerCase() === username.toLowerCase() ||
          s.email.toLowerCase() === username.toLowerCase(),
      );
      if (match) dispatch(fetchStudentResult(match.studentId));
    }
  }, [students, username, dispatch]);

  if (loading) return <Loader />;

  if (error || !studentResult)
    return (
      <div>
        <PageHeader title="My Results" />
        <EmptyState
          message="No results found for your account. Please contact admin."
          icon="📭"
        />
      </div>
    );

  const { grade, color, bg } = getGrade(studentResult.average);
  const radarData = studentResult.subjects.map((s) => ({
    subject: s.subjectName,
    marks: s.marks,
  }));

  return (
    <div>
      <PageHeader
        title="My Results"
        subtitle={`Academic performance — ${studentResult.studentName}`}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main card */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="px-7 py-6 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
              👨‍🎓
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">
                {studentResult.studentName}
              </h2>
              <p className="text-blue-200 text-sm mt-0.5">
                Class: <strong>{studentResult.className}</strong>
              </p>
            </div>
          </div>

          {/* Marks table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Subject", "Marks", "Progress", "Grade"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {studentResult.subjects.map((s, i) => {
                  const { grade: g, color: c, bar } = getGrade(s.marks);
                  return (
                    <tr
                      key={i}
                      className="border-t border-slate-50 hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        {s.subjectName}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">
                        {s.marks}
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${bar} transition-all duration-500`}
                            style={{ width: `${s.marks}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold ${c} ${bg}`}
                        >
                          {g}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="px-7 py-5 border-t border-slate-100 bg-slate-50 flex flex-wrap gap-8">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">
                Average Marks
              </p>
              <p
                className="text-3xl font-extrabold text-blue-600"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {studentResult.average}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">
                Overall Grade
              </p>
              <p
                className={`text-3xl font-extrabold ${color}`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {grade}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">
                Subjects Taken
              </p>
              <p
                className="text-3xl font-extrabold text-slate-700"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {studentResult.subjects.length}
              </p>
            </div>
          </div>
        </div>

        {/* Radar chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4">Performance Radar</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fontSize: 11,
                  fill: "#64748B",
                  fontFamily: "Inter, sans-serif",
                }}
              />
              <Radar
                dataKey="marks"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #E2E8F0",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>

          {/* Grade badge */}
          <div className={`mt-auto pt-4 rounded-xl p-5 text-center ${bg}`}>
            <p className="text-xs font-semibold text-slate-500 mb-1">
              Overall Grade
            </p>
            <p
              className={`text-5xl font-extrabold ${color}`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {grade}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Average: {studentResult.average}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
