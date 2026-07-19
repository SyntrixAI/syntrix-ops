import Card from "../ui/Card";

export default function DecisionRecommendation({
  decision,
}) {
  const {
    recommendation,
    execution,
  } = decision;

  return (
    <Card>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Syntrix Recommendation
          </p>

          <h2 className="mt-2 text-xl font-semibold text-white">
            {recommendation.title}
          </h2>

          <p className="mt-3 leading-7 text-slate-300">
            {recommendation.description}
          </p>

          {recommendation.rationale ? (
            <p className="mt-4 leading-7 text-slate-400">
              {recommendation.rationale}
            </p>
          ) : null}
        </div>

        <div className="grid min-w-56 gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <RecommendationDetail
            label="Owner"
            value={execution.owner}
          />

          <RecommendationDetail
            label="Effort"
            value={recommendation.effort}
          />

          <RecommendationDetail
            label="Estimated Time"
            value={recommendation.estimatedTime}
          />
        </div>
      </div>
    </Card>
  );
}

function RecommendationDetail({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-medium text-white">
        {value ?? "—"}
      </p>
    </div>
  );
}