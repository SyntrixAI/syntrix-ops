import Card from "../ui/Card";
import SyntrixAssessment from "../compositions/SyntrixAssessment";

export default function LocationOverview({ overview }) {
  const { health, assessment } = overview;

  return (
    <section className="mt-10 space-y-8">
      <Card>
        <p className="text-sm font-semibold text-cyan-400">
          Operational Health
        </p>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-6xl font-bold text-white">{health?.score}</p>
            <p className="mt-2 text-xl font-semibold text-cyan-400">
              {health?.status}
            </p>
          </div>

          <p className="max-w-2xl text-slate-300">{health?.summary}</p>
        </div>
      </Card>

      <SyntrixAssessment assessment={assessment} />
    </section>
  );
}
