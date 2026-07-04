import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

export default function HealthOverview({ health, memory }) {
  if (!health) return null;

  const healthTone = {
    Healthy: "success",
    Watch: "warning",
    "At Risk": "danger",
    Critical: "danger",
  };

  const trendTone = {
    Improving: "success",
    Stable: "info",
    Declining: "warning",
    Unknown: "neutral",
  };

  return (
    <Card>
      <div className="space-y-8">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Operational Health
            </p>

            <h2 className="mt-3 text-6xl font-bold text-white">
              {health.score}
            </h2>

            <p className="mt-2 text-xl text-slate-300">
              {health.status}
            </p>
          </div>

          <Badge tone={healthTone[health.status]}>
            {health.status}
          </Badge>
        </div>

        {/* Summary */}

        <p className="leading-8 text-slate-300">
          {health.summary}
        </p>

        {/* Operational Memory */}

        {memory && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                  Operational Memory
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  {memory.trend}
                </h3>
              </div>

              <Badge tone={trendTone[memory.trend]}>
                {memory.status}
              </Badge>
            </div>

            <p className="mt-4 leading-7 text-slate-300">
              {memory.summary}
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {memory.changes.map((change) => (
                <div
                  key={change.label}
                  className="rounded-lg border border-slate-800 p-4"
                >
                  <p className="text-sm text-slate-400">
                    {change.label}
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    {change.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}