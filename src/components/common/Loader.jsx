export default function Loader({ fullScreen }) {
  const spinner = (
    <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
  );
  if (fullScreen)
    return (
      <div className="fixed inset-0 bg-slate-100 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  return (
    <div className="flex justify-center items-center py-20">{spinner}</div>
  );
}
