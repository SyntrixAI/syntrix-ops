import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

export default function Recommendation({ recommendation }) {
  return (
    <Card className="mt-8">
      <p className="font-semibold text-cyan-400">Recommended Decision</p>

      <h3 className="mt-2 text-2xl font-bold text-white">
        {recommendation.title}
      </h3>

      <p className="mt-4 leading-7 text-slate-300">
        {recommendation.description}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-slate-400">Effort</p>
          <div className="mt-2">
            <Badge tone="success">{recommendation.effort}</Badge>
          </div>
        </div>

        <div>
          <p className="text-sm text-slate-400">Time to Complete</p>
          <p className="mt-2 text-lg font-semibold text-white">
            {recommendation.estimatedTime}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">Expected Impact</p>
          <p className="mt-2 text-lg font-semibold text-green-400">
            Labor {recommendation.expectedImpact.labor}
          </p>
          <p className="text-lg font-semibold text-green-400">
            Prime Cost {recommendation.expectedImpact.primeCost}
          </p>
        </div>
      </div>
    </Card>
  );
}
