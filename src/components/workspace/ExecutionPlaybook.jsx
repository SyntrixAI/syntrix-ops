import Link from "next/link";
import Card from "../ui/Card";

export default function ExecutionPlaybook({ execution }) {
  const {
    priority,
    playbook,
  } = execution ?? {};

  if (!priority || !playbook) {
    return null;
  }

  const {
    title,
    description,
    owner,
    status,
    effort,
    estimatedTime,
    whyNow,
    rootCauses = [],
    dependencies = [],
    risk,
    successCriteria = [],
    followUp,
  } = playbook;

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm font-semibold text-cyan-400">
          Execution Playbook
        </p>

        <h2 className="mt-3 text-2xl font-bold text-white">{title}</h2>

        {description && (
          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Recommended Action
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {description}
            </p>
          </div>
        )}

        {whyNow && (
          <div className="mt-4 rounded-xl border border-cyan-900/40 bg-cyan-950/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Why Syntrix Recommends This
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {whyNow}
            </p>
          </div>
        )}

        {rootCauses.length > 0 && (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Likely Root Causes
            </p>

            <div className="mt-4 space-y-4">
              {rootCauses.map((cause) => (
                <div key={cause.id}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-white">{cause.title}</p>

                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                      {cause.confidence} confidence
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {cause.description}
                  </p>

                  {cause.evidence?.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {cause.evidence.map((item) => (
                        <li key={item} className="text-sm text-slate-500">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 space-y-2 text-slate-400">
          <p>Owner: {owner}</p>
          <p>Status: {status}</p>
          <p>Effort: {effort}</p>
          <p>Estimated Time: {estimatedTime}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={`/locations/${priority.locationId}`}
            className="rounded-xl border border-slate-700 px-4 py-3 text-center font-semibold text-white hover:border-cyan-500"
          >
            Open Location
          </Link>

          <button className="rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
            Send to Execution →
          </button>
        </div>
      </Card>

      {dependencies.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-white">Dependencies</h3>

          <ul className="mt-4 space-y-2">
            {dependencies.map((dependency) => (
              <li key={dependency} className="text-sm text-slate-300">
                • {dependency}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {risk && (
        <Card className="border-amber-500/30 bg-amber-950/10">
          <h3 className="text-lg font-semibold text-white">Operational Risk</h3>

          <p className="mt-3 text-sm leading-6 text-slate-300">{risk}</p>
        </Card>
      )}

      {successCriteria.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-white">Success Criteria</h3>

          <ul className="mt-4 space-y-2">
            {successCriteria.map((item) => (
              <li key={item} className="text-sm text-slate-300">
                ✓ {item}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {followUp && (
        <Card>
          <h3 className="text-lg font-semibold text-white">Follow-up</h3>

          <p className="mt-3 text-sm leading-6 text-slate-300">{followUp}</p>
        </Card>
      )}
    </div>
  );
}