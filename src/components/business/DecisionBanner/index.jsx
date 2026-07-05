import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

export default function DecisionBanner({
  label = "Recommended Decision",
  decision,
  impact,
  confidence,
  actionLabel = "Review Decision",
}) {
  if (!decision) return null;

  return (
    <Card className="mt-8 border-cyan-500/30 bg-cyan-500/5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            {label}
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-bold text-white">
            {decision}
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {impact && (
              <Badge tone="success">
                {impact}
              </Badge>
            )}

            {confidence && (
              <Badge tone="info">
                {confidence}
              </Badge>
            )}
          </div>
        </div>

        <button className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
          {actionLabel}
        </button>
      </div>
    </Card>
  );
}