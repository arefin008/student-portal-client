import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Download, Search, X } from "lucide-react";
import {
  fetchStudents,
  addStudent,
  editStudent,
  removeStudent,
} from "../../store/features/studentSlice";
import { fetchClasses } from "../../store/features/classSlice";
import PageHeader from "../../components/common/PageHeader";
import ConfirmModal from "../../components/common/ConfirmModal";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import FormField, { inputCls } from "../../components/common/FormField";
import { exportStudentsToExcel } from "../../utils/exportExcel";

const PER_PAGE = 8;

export default function Students() {
  const dispatch = useDispatch();
  const { list: students, loading } = useSelector((s) => s.students);
  const { list: classes } = useSelector((s) => s.classes);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [delId, setDelId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchClasses());
  }, [dispatch]);

  const openAdd = () => {
    setEditing(null);
    reset();
    setModal(true);
  };
  const openEdit = (s) => {
    setEditing(s);
    setValue("studentName", s.studentName);
    setValue("email", s.email);
    setValue("phone", s.phone || "");
    setValue("classId", s.classId);
    setModal(true);
  };

  const onSubmit = async (data) => {
    let result;
    if (editing) {
      result = await dispatch(editStudent({ id: editing.studentId, data }));
    } else {
      result = await dispatch(addStudent(data));
    }
    if (
      editStudent.fulfilled.match(result) ||
      addStudent.fulfilled.match(result)
    ) {
      toast.success(editing ? "Student updated!" : "Student added!");
      setModal(false);
      dispatch(fetchStudents());
    } else {
      toast.error(result.payload || "Something went wrong.");
    }
  };

  const handleDelete = async () => {
    const result = await dispatch(removeStudent(delId));
    if (removeStudent.fulfilled.match(result)) {
      toast.success("Student deleted.");
    } else {
      toast.error("Failed to delete.");
    }
    setDelId(null);
  };

  let filtered = students.filter(
    (s) =>
      s.studentName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  );
  if (sortBy === "class")
    filtered = [...filtered].sort((a, b) =>
      (a.className || "").localeCompare(b.className || ""),
    );
  else
    filtered = [...filtered].sort((a, b) =>
      a.studentName.localeCompare(b.studentName),
    );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  if (loading && !students.length) return <Loader />;

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle={`${students.length} students enrolled`}
        action={
          <>
            <button
              onClick={() => exportStudentsToExcel(students)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> Export
            </button>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Student
            </button>
          </>
        }
      />

      {/* Search & filter */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-52">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or email…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 text-slate-700 font-medium"
        >
          <option value="name">Sort: Name A–Z</option>
          <option value="class">Sort: Class</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {paginated.length === 0 ? (
          <EmptyState message="No students found" icon="👨‍🎓" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["#", "Name", "Email", "Phone", "Class", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {paginated.map((s, i) => (
                  <tr
                    key={s.studentId}
                    className="border-t border-slate-50 hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm text-slate-400 font-medium">
                      {(page - 1) * PER_PAGE + i + 1}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-800 whitespace-nowrap">
                      {s.studentName}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {s.email}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {s.phone || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                        {s.className}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(s)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDelId(s.studentId)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 justify-center mt-5">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-colors
                ${
                  page === i + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                {editing ? "Edit Student" : "Add New Student"}
              </h3>
              <button
                onClick={() => setModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                label="Student Name"
                error={errors.studentName?.message}
              >
                <input
                  {...register("studentName", { required: "Required" })}
                  placeholder="Full name"
                  className={inputCls(!!errors.studentName)}
                />
              </FormField>
              <FormField label="Email" error={errors.email?.message}>
                <input
                  {...register("email", {
                    required: "Required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  placeholder="email@example.com"
                  className={inputCls(!!errors.email)}
                />
              </FormField>
              <FormField label="Phone (optional)">
                <input
                  {...register("phone")}
                  placeholder="01XXXXXXXXX"
                  className={inputCls(false)}
                />
              </FormField>
              <FormField label="Class" error={errors.classId?.message}>
                <select
                  {...register("classId", {
                    required: "Required",
                    valueAsNumber: true,
                  })}
                  className={inputCls(!!errors.classId)}
                >
                  <option value="">Select class…</option>
                  {classes.map((c) => (
                    <option key={c.classId} value={c.classId}>
                      {c.className}
                    </option>
                  ))}
                </select>
              </FormField>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm transition-colors mt-2"
              >
                {loading
                  ? "Saving…"
                  : editing
                    ? "Update Student"
                    : "Add Student"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!delId}
        message="Delete this student? All their results will also be removed."
        onConfirm={handleDelete}
        onCancel={() => setDelId(null)}
      />
    </div>
  );
}
