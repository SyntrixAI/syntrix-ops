import Card from "../ui/Card";
import BusinessImpact from "../business/BusinessImpact";
import Recommendation from "../business/Recommendation";

export default function InvestigationOverview({ investigation }) {
  const { priority, assessment } = investigation;

  return (
    <Card>
      <p className="text-sm font-semibold text-cyan-400">
        Syntrix Assessment
      </p>

      <p className="mt-4 text-lg leading-8 text-slate-300">
        {assessment?.assessment || priority.description}
      </p>

      {assessment?.recommendation && (
        <Recommendation recommendation={assessment.recommendation} />
      )}

      {assessment?.businessImpact && (
        <BusinessImpact
          weeklyRecovery={assessment.businessImpact.weeklyRecovery}
          annualRecovery={assessment.businessImpact.annualRecovery}
        />
      )}
    </Card>
  );
}
