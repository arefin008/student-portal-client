import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { fetchStudents } from "../../store/features/studentSlice";
import { fetchSubjects } from "../../store/features/subjectSlice";
import { fetchResults, addResult } from "../../store/features/resultSlice";
import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import FormField, { inputCls } from "../../components/common/FormField";

function GradeBadge({ marks }) {
  const g =
    marks >= 90
      ? "A+"
      : marks >= 80
        ? "A"
        : marks >= 70
          ? "B"
          : marks >= 60
            ? "C"
            : marks >= 50
              ? "D"
              : "F";
  const cl =
    marks >= 70
      ? "bg-emerald-50 text-emerald-700"
      : marks >= 50
        ? "bg-yellow-50 text-yellow-700"
        : "bg-red-50 text-red-600";
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${cl}`}>
      {g}
    </span>
  );
}

export default function ResultEntry() {
  const dispatch = useDispatch();
  const { list: students } = useSelector((s) => s.students);
  const { list: subjects } = useSelector((s) => s.subjects);
  const { list: results, loading } = useSelector((s) => s.results);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchSubjects());
    dispatch(fetchResults());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const result = await dispatch(
      addResult({
        studentId: +data.studentId,
        subjectId: +data.subjectId,
        marks: +data.marks,
      }),
    );
    if (addResult.fulfilled.match(result)) {
      toast.success("Result saved!");
      reset();
      dispatch(fetchResults());
    } else {
      toast.error(result.payload || "Failed to save result.");
    }
  };

  if (loading && !results.length) return <Loader />;

  return (
    <div>
      <PageHeader
        title="Result Entry"
        subtitle="Record exam marks for students"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
        {/* Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-5">Enter Marks</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Student" error={errors.studentId?.message}>
              <select
                {...register("studentId", { required: "Select a student" })}
                className={inputCls(!!errors.studentId)}
              >
                <option value="">Select student…</option>
                {students.map((s) => (
                  <option key={s.studentId} value={s.studentId}>
                    {s.studentName} ({s.className})
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Subject" error={errors.subjectId?.message}>
              <select
                {...register("subjectId", { required: "Select a subject" })}
                className={inputCls(!!errors.subjectId)}
              >
                <option value="">Select subject…</option>
                {subjects.map((s) => (
                  <option key={s.subjectId} value={s.subjectId}>
                    {s.subjectName}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Marks (0–100)" error={errors.marks?.message}>
              <input
                type="number"
                step="0.01"
                {...register("marks", {
                  required: "Required",
                  min: { value: 0, message: "Minimum is 0" },
                  max: { value: 100, message: "Maximum is 100" },
                })}
                placeholder="Enter marks"
                className={inputCls(!!errors.marks)}
              />
            </FormField>
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-xs font-medium">
              ⚠️ Marks must be between 0 and 100
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm transition-colors"
            >
              {loading ? "Saving…" : "✓ Save Result"}
            </button>
          </form>
        </div>

        {/* Recent results */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Recent Results</h3>
            <span className="text-slate-400 text-sm">
              {results.length} total
            </span>
          </div>
          {results.length === 0 ? (
            <EmptyState message="No results entered yet" icon="📝" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["Student", "Subject", "Marks", "Grade"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...results]
                    .reverse()
                    .slice(0, 15)
                    .map((r) => (
                      <tr
                        key={r.resultId}
                        className="border-t border-slate-50 hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="px-5 py-3.5 text-sm font-medium text-slate-800">
                          {r.studentName}
                        </td>
                        <td className="px-5 py-3.5 text-sm text-slate-500">
                          {r.subjectName}
                        </td>
                        <td className="px-5 py-3.5 text-sm font-bold text-slate-700">
                          {r.marks}
                        </td>
                        <td className="px-5 py-3.5">
                          <GradeBadge marks={r.marks} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
