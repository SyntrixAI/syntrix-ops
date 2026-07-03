export default function LocationToolbar() {
  return (
    <div className="mt-10 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-slate-400">
          18 Locations • 15 Healthy • 2 Warning • 1 Critical
        </p>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search locations..."
          className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-500"
        />

        <select className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500">
          <option>Operations View</option>
          <option>Labor View</option>
          <option>Food Cost View</option>
          <option>Financial View</option>
        </select>

        <select className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500">
          <option>Sort: Health</option>
          <option>Sort: Sales vs Forecast</option>
          <option>Sort: Prime Cost</option>
        </select>
      </div>
    </div>
  );
}