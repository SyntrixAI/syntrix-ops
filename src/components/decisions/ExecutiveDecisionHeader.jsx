import Badge from "../ui/Badge";

export default function ExecutiveDecisionHeader({
  decision,
}) {
  return (
    <header className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>
          {decision.classification}
        </Badge>

        <Badge>
          {decision.status}
        </Badge>

        <span className="text-sm text-slate-400">
          Portfolio rank #{decision.portfolio.rank}
        </span>
      </div>

      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          {decision.location} · {decision.category}
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          {decision.title}
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
          {decision.situation.description}
        </p>
      </div>

      {decision.situation.whyNow ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Why now
          </p>

          <p className="mt-2 leading-7 text-slate-200">
            {decision.situation.whyNow}
          </p>
        </div>
      ) : null}
    </header>
  );
}