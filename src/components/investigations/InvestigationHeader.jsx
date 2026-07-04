import Badge from "../ui/Badge";

export default function InvestigationHeader({ investigation }) {
  const { priority, assessment } = investigation;

  const severityTone = {
    critical: "danger",
    warning: "warning",
    info: "info",
  };

  return (
    <header className="mb-8">
      <p className="text-sm font-semibold text-cyan-400">
        INVESTIGATION #{priority.priorityRank}
      </p>

      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-5xl font-bold text-white">
            {assessment?.title ?? priority.title}
          </h1>

          <p className="mt-3 text-xl text-slate-300">{priority.location}</p>
        </div>

        <div className="flex gap-3">
          <Badge tone={severityTone[priority.severity]}>
            {priority.severity}
          </Badge>

          <Badge tone="info">{assessment?.status ?? priority.status}</Badge>
        </div>
      </div>
    </header>
  );
}