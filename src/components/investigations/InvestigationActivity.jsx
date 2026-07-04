import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function InvestigationActivity({ activity = [] }) {
  return (
    <Card>
      <p className="text-sm font-semibold text-cyan-400">
        Investigation Activity
      </p>

      <div className="mt-6 space-y-5">
        {activity.map((item) => (
          <div key={item.id} className="border-l border-slate-800 pl-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="info">{item.type}</Badge>

              <span className="text-sm text-slate-500">{item.time}</span>

              <span className="text-sm text-slate-500">· {item.actor}</span>
            </div>

            <p className="mt-3 font-semibold text-white">{item.title}</p>

            <p className="mt-1 text-sm text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}