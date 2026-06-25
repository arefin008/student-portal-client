export default function StatCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow duration-200">
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}
      >
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
        <p
          className="text-3xl font-extrabold text-slate-800"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
