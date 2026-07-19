import Link from "next/link";

import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import ExecutiveFocusCard from "../ExecutiveFocusCard";

export default function DecisionPortfolio({
  portfolio,
}) {
  if (!portfolio) {
    return null;
  }

  const primaryDecision =
    portfolio.focus?.primaryDecision ??
    null;

  const remainingDecisions =
    portfolio.decisions?.filter(
      (decision) =>
        decision.id !==
        primaryDecision?.id,
    ) ?? [];

  return (
    <div className="space-y-6">
      <ExecutiveFocusCard
        decision={primaryDecision}
      />

      <PortfolioSummary
        summary={portfolio.summary}
      />

      {remainingDecisions.length > 0 && (
        <div className="space-y-4">
          {remainingDecisions.map(
            (decision) => (
              <PortfolioDecisionRow
                key={decision.id}
                decision={decision}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

function PortfolioSummary({ summary }) {
  if (!summary) {
    return null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <SummaryMetric
        label="Active Decisions"
        value={summary.activeDecisions}
      />

      <SummaryMetric
        label="Critical"
        value={summary.criticalDecisions}
      />

      <SummaryMetric
        label="Weekly Impact"
        value={`+$${summary.totalWeeklyImpact.toLocaleString()}`}
      />

      <SummaryMetric
        label="Executable Impact"
        value={`+$${summary.executableWeeklyImpact.toLocaleString()}`}
      />

      <SummaryMetric
        label="Avg. Confidence"
        value={`${summary.averageConfidence}%`}
      />
    </div>
  );
}

function SummaryMetric({
  label,
  value,
}) {
  return (
    <Card className="p-5">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>
    </Card>
  );
}

function PortfolioDecisionRow({
  decision,
}) {
  return (
    <Card className="p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-lg font-bold text-white">
            {decision.portfolioRank}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-semibold text-white">
                {decision.location}
              </p>

              <Badge
                tone={getClassificationTone(
                  decision.classification,
                )}
              >
                {decision.classification}
              </Badge>

              <Badge>
                Score {decision.portfolioScore}
              </Badge>
            </div>

            <h3 className="mt-2 text-xl font-bold text-white">
              {decision.title}
            </h3>

            {decision.explanation?.headline && (
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                {decision.explanation.headline}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <PortfolioMetric
              label="Impact"
              value={`+$${decision.estimatedImpact.toLocaleString()}/wk`}
            />

            <PortfolioMetric
              label="Confidence"
              value={`${decision.confidence}%`}
            />
          </div>

          <Link
            href={getDecisionHref(decision)}
            className="rounded-xl border border-slate-700 px-4 py-2 text-center text-sm font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:text-white"
          >
            Review
          </Link>
        </div>
      </div>
    </Card>
  );
}

function PortfolioMetric({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function getClassificationTone(
  classification,
) {
  switch (
    classification
      ?.trim()
      .toLowerCase()
  ) {
    case "act now":
      return "danger";

    case "plan next":
      return "warning";

    case "monitor":
      return "info";

    default:
      return "default";
  }
}

function getDecisionHref(
  decision,
) {
  if (
    decision?.priorityId == null
  ) {
    return null;
  }

  return `/decisions/decision-${decision.priorityId}`;
}