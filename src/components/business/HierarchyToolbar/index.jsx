export default function HierarchyToolbar({ label, count }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-cyan-400">{label}</p>
        <p className="mt-1 text-sm text-slate-400">
          {count} organizational unit{count === 1 ? "" : "s"} in scope
        </p>
      </div>

      <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-white hover:border-cyan-500">
        Filter
      </button>
    </div>
  );
}