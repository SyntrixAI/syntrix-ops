import Card from "../ui/Card";
import ConfidenceIndicator from "../business/Confidence";
import EvidenceList from "../business/Evidence";
import { getConfidenceLevel } from "../../lib/confidence";

export default function InvestigationEvidence({ evidence }) {
  const { assessment } = evidence;

  if (!assessment) return null;

  const confidence = getConfidenceLevel(assessment.confidence);

  return (
    <Card>
      <p className="text-sm font-semibold text-cyan-400">
        Evidence & Confidence
      </p>

      <div className="mt-6">
        <ConfidenceIndicator
          score={assessment.confidence}
          confidence={confidence}
        />
      </div>

      <EvidenceList evidence={assessment.evidence} />
    </Card>
  );
}
