import Link from "next/link";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function InvestigationItem({
  priority,
}) {
  const severityTone = {
    critical: "danger",
    warning: "warning",
    info: "info",
  };

  return (
    <Card className="transition hover:border-cyan-500/40 hover:bg-slate-800/60">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-slate-500">
              #{priority.priorityRank}
            </span>

            <Badge tone={severityTone[priority.severity]}>
              {priority.severity}
            </Badge>

            <span className="text-sm text-slate-500">
              {priority.detectedAt}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-bold text-white">
            {priority.location}
          </h3>

          <p className="mt-1 text-lg font-semibold text-slate-200">
            {priority.title}
          </p>

          <p className="mt-2 text-slate-400">
            {priority.description}
          </p>
        </div>

        <div className="lg:text-right">
          <p className="text-sm text-slate-500">
            Primary Action
          </p>

          <p className="text-xl font-bold text-cyan-400">
            {priority.primaryAction}
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Estimated Impact
          </p>

          <p className="text-2xl font-bold text-green-400">
            +$
            {(priority.estimatedImpact ?? 0).toLocaleString()}
            /wk
          </p>

          <Link
            href={`/operations/investigations/${priority.id}`}
            className="mt-5 inline-block font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Investigate →
          </Link>
        </div>
      </div>
    </Card>
  );
}