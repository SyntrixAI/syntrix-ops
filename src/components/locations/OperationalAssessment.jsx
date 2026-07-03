import Card from "../ui/Card";
import Badge from "../ui/Badge";
import ConfidenceIndicator from "../ui/ConfidenceIndicator";
import { getConfidenceLevel } from "../../lib/confidence";
import EvidenceList from "../intelligence/EvidenceList";

export default function OperationalAssessment({ assessment }) {
  const confidence = getConfidenceLevel(assessment.confidence);

  return (
    <Card className="mt-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-cyan-400">Syntrix Assessment</p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {assessment.title || "Operational Assessment"}
          </h2>
        </div>

        <Badge tone="danger">{assessment.priority}</Badge>
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold text-slate-400">Assessment</p>
        <p className="mt-2 text-lg leading-8 text-slate-300">
          {assessment.assessment}
        </p>
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold text-slate-400">
          Recommended Decision
        </p>
        <p className="mt-2 text-xl font-semibold text-white">
          {assessment.recommendation}
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-cyan-500/20 bg-slate-950 p-6">
        <p className="text-sm text-slate-400">Estimated Recoverable Profit</p>

        <h3 className="mt-2 text-4xl font-bold text-green-400">
          +${assessment.estimatedRecovery.toLocaleString()}
        </h3>

        <p className="text-slate-400">per week</p>
      </div>

      <div className="mt-8">
        <ConfidenceIndicator
          score={assessment.confidence}
          confidence={confidence}
        />
        <EvidenceList evidence={assessment.evidence} />
      </div>
    </Card>
  );
}