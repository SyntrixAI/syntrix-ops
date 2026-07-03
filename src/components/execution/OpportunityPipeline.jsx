import Card from "../ui/Card";

export default function OpportunityPipeline({ stages }) {
  return (
    <Card className="mt-10">
      <div className="mb-6">
        <p className="font-semibold text-cyan-400">Opportunity Pipeline</p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Recoverable profit moving through execution
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {stages.map((stage) => (
          <div
            key={stage.label}
            className="rounded-xl border border-slate-800 bg-slate-950 p-5"
          >
            <p className="text-sm text-slate-400">{stage.label}</p>

            <p className="mt-3 text-3xl font-bold text-green-400">
              +${stage.weeklyValue.toLocaleString()}/wk
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {stage.count} recommendations
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}