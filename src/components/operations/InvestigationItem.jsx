import Link from "next/link";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function OperationCard({ operation }) {
  
  const priorityTone = {
  critical: "danger",
  warning: "warning",
  info: "info",
  };
  

  return (
    <Card className="transition hover:border-cyan-500/40 hover:bg-slate-800/60">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            
            <Badge tone={priorityTone[operation.priority]}>
              {operation.priority}
            </Badge>

            <span className="text-sm text-slate-500">
              {operation.detectedAt}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-bold text-white">
            {operation.location}
          </h3>

          <p className="mt-1 text-lg font-semibold text-slate-200">
            {operation.title}
          </p>

          <p className="mt-2 text-slate-400">{operation.description}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">Confidence</p>
          <p className="text-2xl font-bold text-cyan-400">
            {operation.confidence}%
          </p>

          <p className="mt-4 text-sm text-slate-500">Estimated Impact</p>
          <p className="text-2xl font-bold text-green-400">
            +${operation.estimatedImpact.toLocaleString()}/wk
          </p>

          <Link
            href={`/locations/${operation.locationId}`}
            className="mt-5 inline-block font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Investigate →
          </Link>
        </div>
      </div>
    </Card>
  );
}