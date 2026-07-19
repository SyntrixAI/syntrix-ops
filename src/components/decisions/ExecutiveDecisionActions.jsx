import Card from "../ui/Card";

export default function ExecutiveDecisionActions({
  decision,
}) {
  const canExecute =
    decision.execution
      .isExecutable;

  return (
    <section className="space-y-6">
      <SectionHeader
        label="Leadership Decision"
        title="What should happen next?"
        description="Review the recommendation and choose the appropriate leadership response."
      />

      <Card>
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <DecisionSummary
            decision={decision}
          />

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Approve Decision
            </button>

            <button
              type="button"
              disabled={!canExecute}
              className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Begin Execution
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-800 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              Request Investigation
            </button>

            <button
              type="button"
              className="rounded-lg px-5 py-3 text-sm font-medium text-slate-500 transition hover:text-slate-300"
            >
              Defer Decision
            </button>
          </div>
        </div>

        <p className="mt-5 border-t border-slate-800 pt-4 text-xs leading-5 text-slate-500">
          Decision actions are currently presented for workflow design validation.
          Persistence, audit history, and status transitions will be connected in
          the next execution milestone.
        </p>
      </Card>
    </section>
  );
}

function DecisionSummary({
  decision,
}) {
  return (
    <dl className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <DecisionDetail
        label="Status"
        value={decision.status}
      />

      <DecisionDetail
        label="Owner"
        value={decision.execution.owner}
      />

      <DecisionDetail
        label="Confidence"
        value={`${decision.impact.confidence}%`}
      />

      <DecisionDetail
        label="Weekly Recovery"
        value={formatCurrency(
          decision.impact.weeklyRecovery,
        )}
      />
    </dl>
  );
}

function DecisionDetail({
  label,
  value,
}) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>

      <dd className="mt-1 font-medium text-white">
        {value ?? "—"}
      </dd>
    </div>
  );
}

function SectionHeader({
  label,
  title,
  description,
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <h2 className="mt-2 text-2xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

function formatCurrency(
  value,
) {
  const amount =
    Number(value);

  if (
    !Number.isFinite(amount)
  ) {
    return "—";
  }

  return `+$${amount.toLocaleString()}/wk`;
}