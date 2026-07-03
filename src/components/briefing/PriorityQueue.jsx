import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function PriorityQueue({ priorities }) {
  const toneByLevel = {
    Critical: "danger",
    High: "warning",
    Medium: "info",
    Low: "default",
  };

  return (
    <Card className="mt-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
        Priority Queue
      </p>

      <h2 className="mt-2 text-2xl font-bold text-white">
        What deserves your attention today
      </h2>

      <div className="mt-6 space-y-4">
        {priorities.map((priority) => (
          <div
            key={priority.id}
            className="rounded-xl border border-slate-800 bg-slate-950 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge tone={toneByLevel[priority.priority]}>
                  {priority.priority}
                </Badge>

                <h3 className="mt-3 text-xl font-bold text-white">
                  {priority.title}
                </h3>

                <p className="mt-2 text-slate-400">{priority.reason}</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-slate-500">Impact</p>
                <p className="mt-1 text-2xl font-bold text-green-400">
                  +${priority.impact.amount.toLocaleString()}/
                  {priority.impact.period}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-800 pt-5 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">Effort</p>
                <p className="mt-1 font-semibold text-white">
                  {priority.effort}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Time</p>
                <p className="mt-1 font-semibold text-white">
                  {priority.estimatedTime}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Next Step</p>
                <p className="mt-1 font-semibold text-cyan-400">
                  {priority.nextStep}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}