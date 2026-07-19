import Card from "../ui/Card";

export default function DecisionExecution({
  decision,
}) {
  const {
    execution,
    recommendation,
  } = decision;

  const playbook =
    execution.playbook;

  return (
    <section className="space-y-6">
      <SectionHeader
        label="Execution"
        title="How should this decision be carried out?"
        description="The owner, action, dependencies, and execution requirements for the recommendation."
      />

      <Card>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Next Action
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              {playbook?.title ??
                recommendation.title}
            </h3>

            <p className="mt-3 leading-7 text-slate-300">
              {playbook?.action ??
                recommendation.description}
            </p>
          </div>

          <dl className="grid min-w-56 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <ExecutionDetail
              label="Owner"
              value={execution.owner}
            />

            <ExecutionDetail
              label="Status"
              value={execution.status}
            />

            <ExecutionDetail
              label="Estimated Time"
              value={recommendation.estimatedTime}
            />
          </dl>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <ExecutionSteps
          playbook={playbook}
        />

        <Dependencies
          dependencies={
            playbook?.dependencies
          }
        />
      </div>

      {decision.situation.risk ? (
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Risk of delay
          </p>

          <p className="mt-2 leading-7 text-slate-300">
            {decision.situation.risk}
          </p>
        </Card>
      ) : null}
    </section>
  );
}

function ExecutionSteps({
  playbook,
}) {
  const steps =
    playbook?.steps ?? [];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white">
        Execution Playbook
      </h3>

      {steps.length ? (
        <ol className="mt-4 space-y-4">
          {steps.map(
            (step, index) => (
              <li
                key={
                  step.id ??
                  `${index}-${step.title ?? step}`
                }
                className="flex gap-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-700 text-xs font-semibold text-slate-300">
                  {index + 1}
                </span>

                <div>
                  <p className="font-medium text-white">
                    {step.title ??
                      step}
                  </p>

                  {step.description ? (
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {step.description}
                    </p>
                  ) : null}
                </div>
              </li>
            ),
          )}
        </ol>
      ) : (
        <div className="mt-4">
          <p className="text-sm leading-6 text-slate-400">
            {playbook?.action ??
              "No execution steps are currently available."}
          </p>
        </div>
      )}
    </Card>
  );
}

function Dependencies({
  dependencies,
}) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white">
        Dependencies
      </h3>

      {dependencies?.length ? (
        <ul className="mt-4 space-y-3">
          {dependencies.map(
            (dependency) => (
              <li
                key={dependency}
                className="flex gap-3 text-sm text-slate-300"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />

                <span>
                  {dependency}
                </span>
              </li>
            ),
          )}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-slate-500">
          No execution dependencies have been identified.
        </p>
      )}
    </Card>
  );
}

function ExecutionDetail({
  label,
  value,
}) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-500">
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