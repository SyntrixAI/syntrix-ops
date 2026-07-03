import Link from "next/link";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function TopLocationsToWatch({ locations, assessments }) {
  const toneByStatus = {
    healthy: "success",
    warning: "warning",
    critical: "danger",
  };

  return (
    <Card className="mt-8">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Top Locations to Watch
        </p>

        <Link href="/locations" className="text-sm font-semibold text-cyan-400">
          View all →
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {locations.map((location) => {
          const assessment = assessments[location.id];

          return (
            <Link
              key={location.id}
              href={`/locations/${location.id}`}
              className="block rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-cyan-500/40 hover:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white">
                      {location.name}
                    </h3>

                    <Badge tone={toneByStatus[location.status]}>
                      {location.status}
                    </Badge>
                  </div>

                  <p className="mt-2 text-slate-400">
                    {assessment?.title || location.issue || "Operational review"}
                  </p>

                  <p className="mt-3 text-sm text-slate-500">
                    Health {location.healthScore} • Prime Cost{" "}
                    {location.primeCost}%
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-500">Opportunity</p>

                  <p className="mt-1 text-xl font-bold text-green-400">
                    {assessment?.businessImpact?.weeklyRecovery
                      ? `+$${assessment.businessImpact.weeklyRecovery.toLocaleString()}/week`
                      : "Review"}
                  </p>

                  <p className="mt-3 text-sm font-semibold text-cyan-400">
                    View Assessment →
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}