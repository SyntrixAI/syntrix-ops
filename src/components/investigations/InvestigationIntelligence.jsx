import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function InvestigationIntelligence({ intelligence }) {
  if (!intelligence) return null;

  const {
    rootCauses = [],
    trends = [],
    memory = [],
    memorySummary,
  } = intelligence;

  return (
    <Card>
      <p className="text-sm font-semibold text-cyan-400">
        Syntrix Intelligence
      </p>

      <h2 className="mt-3 text-2xl font-bold text-white">
        Why Syntrix Thinks This Matters
      </h2>

      {rootCauses.length > 0 && (
        <section className="mt-6">
          <h3 className="font-semibold text-white">Likely Root Causes</h3>

          <div className="mt-4 space-y-4">
            {rootCauses.map((cause) => (
              <div
                key={cause.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-white">{cause.title}</p>

                  <Badge tone={getConfidenceTone(cause.confidence)}>
                    {cause.confidence} confidence
                  </Badge>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {cause.description}
                </p>

                {cause.evidence?.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {cause.evidence.map((item) => (
                      <li key={item} className="text-sm text-slate-500">
                        • {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {trends.length > 0 && (
        <section className="mt-6">
          <h3 className="font-semibold text-white">Detected Trends</h3>

          <div className="mt-4 space-y-4">
            {trends.map((trend) => (
              <div
                key={trend.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-white">{trend.title}</p>

                  <Badge tone={getTrendTone(trend.severity)}>
                    {trend.direction}
                  </Badge>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {trend.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-6">
        <h3 className="font-semibold text-white">Operational Memory</h3>

        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-sm leading-6 text-slate-300">
            {memorySummary ?? "No similar historical intervention found yet."}
          </p>

          {memory.length > 0 && (
            <p className="mt-3 text-xs text-slate-500">
              Based on {memory.length} previous matched intervention
              {memory.length === 1 ? "" : "s"}.
            </p>
          )}
        </div>
      </section>
    </Card>
  );
}

function getConfidenceTone(confidence) {
  if (confidence === "high") return "success";
  if (confidence === "medium") return "warning";
  return "info";
}

function getTrendTone(severity) {
  if (severity === "high") return "danger";
  if (severity === "medium") return "warning";
  return "info";
}