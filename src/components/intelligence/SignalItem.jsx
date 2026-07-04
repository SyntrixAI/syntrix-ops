import Badge from "../ui/Badge";

const toneBySeverity = {
  critical: "danger",
  warning: "warning",
  info: "info",
};

export default function SignalItem({ signal }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-cyan-500/40">
      <div className="flex items-center justify-between">
        <Badge tone={toneBySeverity[signal.severity]}>
          {signal.severity.toUpperCase()}
        </Badge>

        <p className="text-sm text-slate-500">
          {signal.detectedAt}
        </p>
      </div>

      <h3 className="mt-4 text-xl font-bold text-white">
        {signal.title}
      </h3>

      <p className="mt-2 text-slate-300">
        {signal.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-400">
        <span>{signal.category}</span>
        <span>{signal.location}</span>
        <span>{signal.source}</span>
      </div>
    </div>
  );
}