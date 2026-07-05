import Link from "next/link";

export default function HierarchyRow({ row }) {
  const statusColor = {
    Healthy: "text-green-400",
    Watch: "text-yellow-400",
    "At Risk": "text-orange-400",
    Critical: "text-red-400",
    Unknown: "text-slate-400",
  };

  return (
    <div className="grid grid-cols-7 items-center border-b border-slate-800 px-6 py-5 text-sm transition hover:bg-slate-800/50">
      <div>
        <p className="font-semibold text-white">{row.name}</p>
        <p className="mt-1 text-xs text-slate-500">{row.subtitle}</p>
      </div>

      <div className="text-slate-400">{row.type}</div>

      <div className={statusColor[row.status] ?? "text-slate-400"}>
        {row.status}
      </div>

      <div className="text-white">{row.health ?? "—"}</div>

      <div className="text-white">{row.activePriorities ?? 0}</div>

      <div className="text-green-400">
        +${(row.estimatedRecovery ?? 0).toLocaleString()}/wk
      </div>

      <div className="text-right">
        <Link
          href={row.href}
          className="font-medium text-cyan-400 hover:text-cyan-300"
        >
          Open →
        </Link>
      </div>
    </div>
  );
}