import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function ExecutionQueue({ executions }) {
  return (
    <div className="space-y-6">
      {executions.map((item) => (
        <Card key={item.id}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="info">{item.status}</Badge>

                <span className="text-sm text-slate-500">
                  {item.location}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                {item.description}
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                {item.whyNow}
              </p>
            </div>

            <div className="min-w-[220px] rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="text-sm text-slate-400">
                Expected Recovery
              </p>

              <p className="mt-2 text-2xl font-bold text-green-400">
                +${item.businessImpact.weeklyRecovery.toLocaleString()}/wk
              </p>

              <div className="mt-4 space-y-1 text-sm text-slate-400">
                <p>Owner: {item.owner}</p>
                <p>Effort: {item.effort}</p>
                <p>Time: {item.estimatedTime}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {item.dependencies?.length > 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <h4 className="font-semibold text-white">
                  Dependencies
                </h4>

                <ul className="mt-3 space-y-2">
                  {item.dependencies.map((dependency) => (
                    <li
                      key={dependency}
                      className="text-sm text-slate-400"
                    >
                      • {dependency}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.successCriteria?.length > 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <h4 className="font-semibold text-white">
                  Success Criteria
                </h4>

                <ul className="mt-3 space-y-2">
                  {item.successCriteria.map((criteria) => (
                    <li
                      key={criteria}
                      className="text-sm text-slate-400"
                    >
                      ✓ {criteria}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(item.risk || item.followUp) && (
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <h4 className="font-semibold text-white">
                  Execution Notes
                </h4>

                {item.risk && (
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {item.risk}
                  </p>
                )}

                {item.followUp && (
                  <p className="mt-3 text-sm leading-6 text-cyan-400">
                    {item.followUp}
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}