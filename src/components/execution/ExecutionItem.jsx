import Card from "../ui/Card";
import Badge from "../ui/Badge";
import ConfidenceIndicator from "../intelligence/ConfidenceIndicator";
import { getConfidenceLevel } from "../../lib/confidence";

export default function ExecutionItem({ execution }) {
  const confidence = getConfidenceLevel(execution.confidence);

  return (
    <Card className="transition hover:border-cyan-500/30">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-cyan-400">
            Recommended Decision
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {execution.title}
          </h2>

          <p className="mt-2 text-slate-400">
            {execution.location}
          </p>
        </div>

        <div className="mt-4">
        <p className="text-sm text-slate-500">
             Source Assessment
        </p>

        <p className="font-medium text-cyan-400">
             {execution.sourceAssessment}
        </p>
        </div>

        <Badge tone="warning">
          {execution.status}
        </Badge>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-slate-400">
            Business Impact
          </p>

          <p className="mt-2 text-4xl font-bold text-green-400">
            +${execution.businessImpact.weeklyRecovery.toLocaleString()}/wk
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Why Now?
          </p>

          <p className="mt-2 text-white">
            {execution.whyNow}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <ConfidenceIndicator
          score={execution.confidence}
          confidence={confidence}
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-6">
        <div>
          <p className="text-sm text-slate-400">Effort</p>
          <p className="font-semibold text-white">
            {execution.effort}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Estimated Time
          </p>
          <p className="font-semibold text-white">
            {execution.estimatedTime}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Owner
          </p>
          <p className="font-semibold text-white">
            {execution.owner ?? "Unassigned"}
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
         <button className="font-semibold text-cyan-400 transition hover:text-cyan-300">
              View Assessment →
         </button>
    </div>
    </Card>
  );
}