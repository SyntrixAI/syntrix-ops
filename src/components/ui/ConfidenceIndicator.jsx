import Card from "./Card";
import Badge from "./Badge";

export default function ConfidenceIndicator({ score, confidence }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            Syntrix Intelligence
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            Confidence
          </h3>
        </div>

        <Badge tone={confidence.tone}>
          {confidence.level}
        </Badge>
      </div>

      <div className="mt-8">
        <p className="text-6xl font-bold">
          {score}%
        </p>

        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-cyan-400 transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>

        <p className="mt-4 text-slate-400">
          {confidence.description}
        </p>
      </div>
    </Card>
  );
}