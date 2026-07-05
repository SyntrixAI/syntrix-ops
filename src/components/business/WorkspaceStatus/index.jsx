import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

export default function WorkspaceStatus({
  status,
  activePriorities,
  criticalPriorities,
  estimatedRecovery,
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Status
          </p>

          <div className="mt-3">
            <Badge tone={getTone(status)}>
              {status}
            </Badge>
          </div>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-green-400">
            +${estimatedRecovery.toLocaleString()}
          </p>

          <p className="text-sm text-slate-400">
            Weekly Opportunity
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Metric
          label="Active Priorities"
          value={activePriorities}
        />

        <Metric
          label="Critical Priorities"
          value={criticalPriorities}
        />
      </div>
    </Card>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function getTone(status) {
  switch (status?.toLowerCase()) {
    case "healthy":
      return "success";
    case "watch":
      return "warning";
    case "critical":
      return "danger";
    default:
      return "info";
  }
}