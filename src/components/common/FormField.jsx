export default function FormField({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export const inputCls = (hasError = false) =>
  `w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all duration-150 text-slate-800 bg-slate-50
   focus:bg-white
   ${
     hasError
       ? "border-red-400 focus:border-red-500 bg-red-50"
       : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
   }`;
