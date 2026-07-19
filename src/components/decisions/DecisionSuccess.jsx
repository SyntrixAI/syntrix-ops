import Card from "../ui/Card";

export default function DecisionSuccess({
  decision,
}) {
  const {
    success,
  } = decision;

  return (
    <section className="space-y-6">
      <SectionHeader
        label="Success"
        title="How will leadership know this worked?"
        description="The expected outcome, measurable success criteria, and follow-up required to verify the result."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Expected Outcome
          </p>

          <p className="mt-3 leading-7 text-slate-300">
            {success.expectedOutcome ??
              "No expected outcome has been defined."}
          </p>
        </Card>

        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Follow-Up
          </p>

          <p className="mt-3 leading-7 text-slate-300">
            {success.followUp ??
              "No follow-up has been scheduled."}
          </p>

          {success.reviewAt ? (
            <p className="mt-3 text-sm text-slate-500">
              Review at: {success.reviewAt}
            </p>
          ) : null}
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-white">
          Success Criteria
        </h3>

        {success.measures?.length ? (
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {success.measures.map(
              (measure) => (
                <li
                  key={measure}
                  className="rounded-lg border border-slate-800 bg-slate-950/50 p-4 text-sm leading-6 text-slate-300"
                >
                  {measure}
                </li>
              ),
            )}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-slate-500">
            No success criteria have been defined.
          </p>
        )}
      </Card>
    </section>
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