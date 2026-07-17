import DecisionBanner from "../business/DecisionBanner";
import PriorityScore from "../business/PriorityScore";

export default function Situation({
  situation,
}) {
  const {
    priority,
    signal,
  } = situation ?? {};

  if (!priority) {
    return null;
  }

  const rationale = {
    reasons:
      priority.insights
        ?.slice(0, 3)
        .map((insight) =>
          typeof insight === "string"
            ? insight
            : insight.description ??
              insight.value ??
              insight.title,
        )
        .filter(Boolean) ?? [],
  };

  return (
    <section className="space-y-6">
      <DecisionBanner
        label="Recommended Decision"
        decision={
          priority.primaryAction ??
          priority.recommendation?.title ??
          priority.title
        }
        impact={
          priority.estimatedImpact
            ? `$${Number(
                priority.estimatedImpact,
              ).toLocaleString()} weekly impact`
            : null
        }
        confidence={
          priority.confidence
            ? `${priority.confidence}% confidence`
            : null
        }
        rationale={rationale}
        actionLabel="Review Execution Plan"
      />

      <PriorityScore
        priority={priority}
      />

      {signal && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Detected Signal
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white">
            {signal.title}
          </h2>

          {signal.description && (
            <p className="mt-3 max-w-3xl leading-7 text-slate-300">
              {signal.description}
            </p>
          )}

          {signal.detectedAt && (
            <p className="mt-4 text-sm text-slate-500">
              Detected {signal.detectedAt}
            </p>
          )}
        </div>
      )}
    </section>
  );
}