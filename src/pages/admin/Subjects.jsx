import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, X } from "lucide-react";
import {
  fetchSubjects,
  addSubject,
  editSubject,
  removeSubject,
} from "../../store/features/subjectSlice";
import PageHeader from "../../components/common/PageHeader";
import ConfirmModal from "../../components/common/ConfirmModal";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import FormField, { inputCls } from "../../components/common/FormField";

export default function Subjects() {
  const dispatch = useDispatch();
  const { list: subjects, loading } = useSelector((s) => s.subjects);
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
    dispatch(fetchSubjects());
  }, [dispatch]);

  const openAdd = () => {
    setEditing(null);
    reset();
    setModal(true);
  };
  const openEdit = (s) => {
    setEditing(s);
    setValue("subjectName", s.subjectName);
    setModal(true);
  };

  const onSubmit = async (data) => {
    const result = editing
      ? await dispatch(editSubject({ id: editing.subjectId, data }))
      : await dispatch(addSubject(data));
    if (
      editSubject.fulfilled.match(result) ||
      addSubject.fulfilled.match(result)
    ) {
      toast.success(editing ? "Subject updated!" : "Subject added!");
      setModal(false);
      dispatch(fetchSubjects());
    } else {
      toast.error(result.payload || "Something went wrong.");
    }
  };

  const handleDelete = async () => {
    const result = await dispatch(removeSubject(delId));
    removeSubject.fulfilled.match(result)
      ? toast.success("Deleted.")
      : toast.error("Failed to delete.");
    setDelId(null);
  };

  if (loading && !subjects.length) return <Loader />;

  return (
    <div>
      <PageHeader
        title="Subjects"
        subtitle={`${subjects.length} subjects configured`}
        action={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Subject
          </button>
        }
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {subjects.length === 0 ? (
          <EmptyState message="No subjects yet" icon="📚" />
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["#", "Subject Name", "Actions"].map((h) => (
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
              {subjects.map((s, i) => (
                <tr
                  key={s.subjectId}
                  className="border-t border-slate-50 hover:bg-slate-50/70 transition-colors"
                >
                  <td className="px-5 py-4 text-sm text-slate-400 font-medium">
                    {i + 1}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                    {s.subjectName}
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
                        onClick={() => setDelId(s.subjectId)}
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
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-7 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                {editing ? "Edit Subject" : "Add Subject"}
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
                label="Subject Name"
                error={errors.subjectName?.message}
              >
                <input
                  {...register("subjectName", { required: "Required" })}
                  placeholder="e.g. Mathematics"
                  className={inputCls(!!errors.subjectName)}
                />
              </FormField>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm transition-colors"
              >
                {loading
                  ? "Saving…"
                  : editing
                    ? "Update Subject"
                    : "Add Subject"}
              </button>
            </form>
          </div>
        </div>
      )}
      <ConfirmModal
        open={!!delId}
        message="Delete this subject?"
        onConfirm={handleDelete}
        onCancel={() => setDelId(null)}
      />
    </div>
  );
}
