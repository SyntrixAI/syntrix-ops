import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

export default function KeyInsights({ insights = [] }) {
  if (!insights.length) return null;

  const importanceTone = {
    high: "danger",
    medium: "warning",
    low: "info",
  };

  return (
    <Card>
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
        Key Insights
      </p>

      <div className="mt-6 space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-white">{insight.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {insight.description}
                </p>
              </div>

              <Badge tone={importanceTone[insight.importance] ?? "info"}>
                {insight.importance}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}