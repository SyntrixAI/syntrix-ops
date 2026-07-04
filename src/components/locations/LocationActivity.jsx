import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function LocationActivity({ activity }) {
  const severityTone = {
    critical: "danger",
    warning: "warning",
    info: "info",
  };

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white">Activity</h2>

      <p className="mt-1 text-sm text-slate-400">
        Recent operational changes observed at this location.
      </p>

      <Card className="mt-5">
        <div className="space-y-5">
          {activity.timeline.map((event) => (
            <div key={event.id} className="border-l border-slate-800 pl-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-slate-500">{event.time}</span>

                <Badge tone={severityTone[event.severity]}>
                  {event.severity}
                </Badge>
              </div>

              <p className="mt-2 font-semibold text-white">{event.title}</p>

              <p className="mt-1 text-sm text-slate-400">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}