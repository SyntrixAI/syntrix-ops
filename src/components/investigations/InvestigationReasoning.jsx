import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function InvestigationContext({ context }) {
  if (!context) return null;

  return (
    <Card>
      <div className="space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Context
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white">
            {context.headline}
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            {context.explanation}
          </p>
        </div>

        <div className="space-y-4">
          {context.factors.map((factor) => (
            <div
              key={factor.label}
              className="flex items-start justify-between gap-8 border-b border-slate-800 pb-3"
            >
              <p className="font-semibold text-slate-200">
                {factor.label}
              </p>

              <p className="max-w-xl text-right text-slate-400">
                {factor.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Syntrix Confidence
          </p>

          <Badge tone="success">
            {context.confidence}%
          </Badge>
        </div>
      </div>
    </Card>
  );
}