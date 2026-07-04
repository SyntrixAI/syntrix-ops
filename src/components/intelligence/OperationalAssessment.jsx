import Card from "../ui/Card";
import Badge from "../ui/Badge";
import ConfidenceIndicator from "../business/Confidence";
import { getConfidenceLevel } from "../../lib/confidence";
import EvidenceList from "../business/Evidence";
import BusinessImpact from "../business/BusinessImpact";
import Recommendation from "../business/Recommendation";

export default function OperationalAssessment({ assessment }) {
  if (!assessment) {
    return (
      <Card className="mt-8">
        <h2 className="text-2xl font-bold text-white">
          No operational assessment available
        </h2>

        <p className="mt-3 text-slate-400">
          Syntrix has not generated an assessment for this location yet.
        </p>
      </Card>
    );
  }

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

      <Recommendation recommendation={assessment.recommendation} />

      <BusinessImpact
        weeklyRecovery={assessment.businessImpact.weeklyRecovery}
        annualRecovery={assessment.businessImpact.annualRecovery}
      />

      <div className="mt-8">
        <ConfidenceIndicator
          score={assessment.confidence}
          confidence={confidence}
        />

        <EvidenceList evidence={assessment.evidence} />
      </div>

      <div className="mt-10 flex justify-end border-t border-slate-800 pt-6">
        <button className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
          Send to Execution →
        </button>
      </div>
    </Card>
  );
}
