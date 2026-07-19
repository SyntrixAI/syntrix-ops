import Card from "../ui/Card";

export default function DecisionImpactSummary({
  decision,
}) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <ImpactCard
        label="Weekly Recovery"
        value={`+$${decision.impact.weeklyRecovery.toLocaleString()}`}
      />

      <ImpactCard
        label="Annual Recovery"
        value={`+$${decision.impact.annualRecovery.toLocaleString()}`}
      />

      <ImpactCard
        label="Confidence"
        value={`${decision.impact.confidence}%`}
      />

      <ImpactCard
        label="Portfolio Score"
        value={decision.portfolio.score}
      />
    </section>
  );
}

function ImpactCard({
  label,
  value,
}) {
  return (
    <Card>
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-white">
        {value ?? "—"}
      </p>
    </Card>
  );
}