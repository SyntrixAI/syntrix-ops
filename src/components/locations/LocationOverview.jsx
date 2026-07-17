import SyntrixAssessment from "../workspace/SyntrixAssessment";
import HealthOverview from "../business/HealthOverview";

export default function LocationOverview({
  overview,
}) {
  const {
    health,
    assessment,
    memory,
  } = overview ?? {};

  return (
    <section className="mt-10 space-y-8">
      <HealthOverview
        health={health}
        memory={memory}
      />

      <SyntrixAssessment
        assessment={assessment}
      />
    </section>
  );
}