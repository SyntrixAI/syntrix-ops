import Card from "../../ui/Card";

import Recommendation from "../../business/Recommendation";
import BusinessImpact from "../../business/BusinessImpact";
import Confidence from "../../business/Confidence";
import Evidence from "../../business/Evidence";
import { getConfidenceLevel } from "../../../lib/confidence";

export default function SyntrixAssessment({ assessment }) {
  if (!assessment) return null;
  const confidence = getConfidenceLevel(assessment.confidence);

  return (
    <Card>
      <div className="space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Syntrix Assessment
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {assessment.title}
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-300">
            {assessment.assessment}
          </p>
        </div>

        <Recommendation recommendation={assessment.recommendation} />

        <BusinessImpact
          weeklyRecovery={assessment.businessImpact.weeklyRecovery}
          annualRecovery={assessment.businessImpact.annualRecovery}
        />

        <Confidence score={assessment.confidence} confidence={confidence} />

        <Evidence evidence={assessment.evidence} />
        
      </div>
    </Card>
  );
}
