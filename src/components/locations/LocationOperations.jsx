import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Link from "next/link";

export default function LocationOperations({ operations }) {
  const severityTone = {
    critical: "danger",
    warning: "warning",
    info: "info",
  };

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white">Operations</h2>

      <p className="mt-1 text-sm text-slate-400">
        Active signals and priorities affecting this location.
      </p>

      <div className="mt-5 space-y-4">
        {operations.priorities.map((priority) => (
          <Card key={priority.id}>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <Badge tone={severityTone[priority.severity]}>
                    {priority.severity}
                  </Badge>

                  <span className="text-sm text-slate-500">
                    #{priority.priorityRank}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-white">
                  {priority.title}
                </h3>

                <p className="mt-2 text-slate-400">
                  {priority.description}
                </p>
              </div>

              <Link
                href={`/operations/investigations/${priority.id}`}
                className="font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Investigate →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}