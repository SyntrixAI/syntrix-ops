import Link from "next/link";

import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

export default function ExecutiveFocusCard({
  decision,
}) {
  if (!decision) {
    return (
      <Card>
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Executive Focus
        </p>

        <h2 className="mt-3 text-2xl font-bold text-white">
          No immediate executive decision
        </h2>

        <p className="mt-3 text-slate-400">
          Syntrix is not currently detecting an issue that requires
          immediate leadership action.
        </p>
      </Card>
    );
  }

  const actionHref =
    decision.executionItem
      ? "/execution"
      : `/operations/investigations/${decision.priorityId}`;

  return (
    <Card className="border-cyan-500/30 bg-cyan-500/5">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Executive Focus
            </p>

            <Badge
              tone={getClassificationTone(
                decision.classification,
              )}
            >
              {decision.classification}
            </Badge>
          </div>

          <p className="mt-5 text-sm font-semibold text-slate-400">
            #{decision.portfolioRank} · {decision.location}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white lg:text-4xl">
            {decision.title}
          </h2>

          {decision.explanation?.headline && (
            <p className="mt-4 text-lg leading-8 text-slate-300">
              {decision.explanation.headline}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Badge tone="success">
              +$
              {decision.estimatedImpact.toLocaleString()}
              /wk
            </Badge>

            <Badge tone="info">
              {decision.confidence}% confidence
            </Badge>

            <Badge>
              Portfolio score {decision.portfolioScore}
            </Badge>

            <Badge>
              {decision.effort} effort
            </Badge>
          </div>

          {decision.explanation?.reasons?.length > 0 && (
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-sm font-semibold text-slate-300">
                Why Syntrix ranked this first
              </p>

              <ul className="mt-3 space-y-2">
                {decision.explanation.reasons.map(
                  (reason) => (
                    <li
                      key={reason}
                      className="text-sm leading-6 text-slate-400"
                    >
                      • {reason}
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-3 lg:min-w-[210px]">
          <Link
            href={actionHref}
            className="rounded-xl bg-cyan-500 px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            {decision.executionItem
              ? "Open Execution"
              : "Review Decision"}
          </Link>

          {decision.locationId && (
            <Link
              href={`/locations/${decision.locationId}`}
              className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Open Location
            </Link>
          )}
        </div>
      </div>
    </Card>
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