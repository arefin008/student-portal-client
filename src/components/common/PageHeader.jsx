export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
      <div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        {subtitle && (
          <p className="text-slate-500 text-sm mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex gap-2 flex-wrap">{action}</div>}
    </div>
  );
}
