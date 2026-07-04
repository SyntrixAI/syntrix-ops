import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function LiveSignalTimeline({ timeline }) {
  const severityTone = {
    critical: "danger",
    warning: "warning",
    info: "info",
  };

  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">Live Signal Timeline</h2>
        <p className="mt-1 text-sm text-slate-400">
          A real-time stream of what Syntrix is observing across the business.
        </p>
      </div>

      <Card>
        <div className="space-y-6">
          {timeline.map((event) => (
            <div
              key={event.id}
              className="relative border-l border-slate-800 pl-6"
            >
              <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-cyan-400" />

              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-slate-500">
                      {event.time}
                    </span>

                    <Badge tone={severityTone[event.severity]}>
                      {event.severity}
                    </Badge>

                    <span className="text-sm text-slate-400">
                      {event.location}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-white">
                    {event.title}
                  </h3>

                  <p className="mt-1 text-slate-400">{event.description}</p>

                  <p className="mt-2 text-sm text-slate-500">
                    Source: {event.source}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-sm text-slate-500">Estimated Impact</p>
                  <p className="text-xl font-bold text-green-400">
                    ${event.estimatedImpact.toLocaleString()}/wk
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}