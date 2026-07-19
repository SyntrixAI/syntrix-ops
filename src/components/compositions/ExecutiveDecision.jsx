import ExecutiveDecisionHeader from "../decisions/ExecutiveDecisionHeader";
import DecisionImpactSummary from "../decisions/DecisionImpactSummary";
import DecisionRecommendation from "../decisions/DecisionRecommendation";
import DecisionAssessment from "../decisions/DecisionAssessment";
import DecisionExecution from "../decisions/DecisionExecution";
import DecisionSuccess from "../decisions/DecisionSuccess";
import ExecutiveDecisionActions from "../decisions/ExecutiveDecisionActions";

export default function ExecutiveDecision({
  decision,
}) {
  return (
    <div className="space-y-8">
      <ExecutiveDecisionHeader
        decision={decision}
      />

      <DecisionImpactSummary
        decision={decision}
      />

      <DecisionRecommendation
        decision={decision}
      />

      <DecisionAssessment
        decision={decision}
      />

      <DecisionExecution
        decision={decision}
      />

      <DecisionSuccess
        decision={decision}
      />

      <ExecutiveDecisionActions
        decision={decision}
      />
    </div>
  );
}