export default function DailyBriefHeader({ name }) {
  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-6xl font-bold tracking-tight text-white">
          Good morning, {name}.
        </h1>

        <p className="mt-3 text-2xl font-semibold text-slate-300">
          Friday, July 3
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 md:min-w-80">
        <p className="text-sm font-semibold text-green-400">
          ● Live Intelligence
        </p>

        <p className="mt-2 text-lg font-bold text-white">
          Monitoring 18 locations
        </p>

        <p className="mt-1 text-sm text-slate-400">
          No new operational signals
        </p>
      </div>
    </header>
  );
}