import Card from "../ui/Card";

export default function DecisionAssessment({
  decision,
}) {
  const {
    assessment,
  } = decision;

  return (
    <section className="space-y-6">
      <SectionHeader
        label="Syntrix Assessment"
        title="What is driving this decision?"
        description="The evidence, operating context, and root causes supporting the recommendation."
      />

      <Card>
        <p className="leading-7 text-slate-300">
          {assessment.summary}
        </p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <EvidenceList
          evidence={assessment.evidence}
        />

        <RootCauseList
          rootCauses={assessment.rootCauses}
        />
      </div>

      <TrendList
        trends={assessment.trends}
      />

      <OperationalMemory
        memory={assessment.memory}
      />
    </section>
  );
}

function EvidenceList({
  evidence,
}) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white">
        Evidence
      </h3>

      {evidence?.length ? (
        <ul className="mt-4 space-y-3">
          {evidence.map(
            (item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-6 text-slate-300"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />

                <span>
                  {item}
                </span>
              </li>
            ),
          )}
        </ul>
      ) : (
        <EmptyState>
          No supporting evidence is currently available.
        </EmptyState>
      )}
    </Card>
  );
}

function RootCauseList({
  rootCauses,
}) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white">
        Root Causes
      </h3>

      {rootCauses?.length ? (
        <div className="mt-4 space-y-5">
          {rootCauses.map(
            (rootCause) => (
              <article
                key={rootCause.id}
                className="border-b border-slate-800 pb-5 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-medium text-white">
                    {rootCause.title}
                  </h4>

                  {rootCause.confidence ? (
                    <span className="text-xs uppercase tracking-wide text-slate-500">
                      {rootCause.confidence} confidence
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {rootCause.description}
                </p>

                {rootCause.evidence?.length ? (
                  <ul className="mt-3 space-y-2">
                    {rootCause.evidence.map(
                      (item) => (
                        <li
                          key={item}
                          className="text-sm text-slate-400"
                        >
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                ) : null}
              </article>
            ),
          )}
        </div>
      ) : (
        <EmptyState>
          No root cause has been confirmed yet.
        </EmptyState>
      )}
    </Card>
  );
}

function TrendList({
  trends,
}) {
  if (!trends?.length) {
    return null;
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white">
        Trend Analysis
      </h3>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {trends.map(
          (trend) => (
            <article
              key={trend.id}
              className="rounded-lg border border-slate-800 bg-slate-950/50 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-medium text-white">
                  {trend.title}
                </h4>

                <span className="text-xs uppercase tracking-wide text-slate-500">
                  {trend.direction}
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {trend.description}
              </p>
            </article>
          ),
        )}
      </div>
    </Card>
  );
}

function OperationalMemory({
  memory,
}) {
  if (!memory) {
    return null;
  }

  const periods =
    Object.entries(memory);

  if (!periods.length) {
    return null;
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white">
        Operating Memory
      </h3>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {periods.map(
          ([period, metrics]) => (
            <article
              key={period}
              className="rounded-lg border border-slate-800 bg-slate-950/50 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {formatLabel(period)}
              </p>

              <dl className="mt-4 space-y-3">
                {Object.entries(
                  metrics ?? {},
                ).map(
                  ([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4"
                    >
                      <dt className="text-sm text-slate-400">
                        {formatLabel(label)}
                      </dt>

                      <dd className="font-medium text-white">
                        {value}
                      </dd>
                    </div>
                  ),
                )}
              </dl>
            </article>
          ),
        )}
      </div>
    </Card>
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

function EmptyState({
  children,
}) {
  return (
    <p className="mt-4 text-sm text-slate-500">
      {children}
    </p>
  );
}

function formatLabel(
  value,
) {
  return String(value)
    .replace(
      /([a-z])([A-Z])/g,
      "$1 $2",
    )
    .replace(
      /[-_]/g,
      " ",
    )
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase(),
    );
}