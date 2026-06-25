export default function EmptyState({ message = "No data found", icon = "📭" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="text-5xl mb-4 opacity-60">{icon}</div>
      <p className="text-slate-400 text-sm font-medium">{message}</p>
    </div>
  );
}
