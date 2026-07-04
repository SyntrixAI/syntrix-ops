import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function OperationalMemoryPanel({ memory }) {
  if (!memory) return null;

  const trendTone = {
    Improving: "success",
    Stable: "info",
    Declining: "warning",
    Unknown: "neutral",
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Operational Memory
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              {memory.trend}
            </h2>
          </div>

          <Badge tone={trendTone[memory.trend] ?? "info"}>
            {memory.status}
          </Badge>
        </div>

        <p className="leading-7 text-slate-300">
          {memory.summary}
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          {memory.changes.map((change) => (
            <div
              key={change.label}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
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
    </Card>
  );
}