import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

export default function PriorityScore({ priority }) {
  if (!priority) return null;

  const interpretation = getPriorityInterpretation(priority.priorityScore);

  return (
    <Card className="mt-8 border-cyan-500/20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Priority Score
          </p>

          <div className="mt-4 flex items-end gap-4">
            <p className="text-6xl font-bold text-white">
              {priority.priorityScore}
            </p>

            <Badge tone={interpretation.tone}>
              {interpretation.label}
            </Badge>
          </div>

          <p className="mt-3 text-slate-400">
            Ranked #{priority.priorityRank} based on impact, urgency,
            confidence, effort, and trend.
          </p>
        </div>

        <div className="grid min-w-full gap-3 sm:grid-cols-2 lg:min-w-[420px]">
          {priority.scoreDrivers?.map((driver) => (
            <div
              key={driver.label}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
            >
              <p className="text-sm text-slate-500">{driver.label}</p>
              <p className="mt-1 font-semibold text-white">{driver.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function getPriorityInterpretation(score) {
  if (score >= 90) {
    return {
      label: "Highest Priority",
      tone: "danger",
    };
  }

  if (score >= 75) {
    return {
      label: "Address Today",
      tone: "warning",
    };
  }

  if (score >= 50) {
    return {
      label: "Monitor Closely",
      tone: "info",
    };
  }

  return {
    label: "Low Priority",
    tone: "neutral",
  };
}