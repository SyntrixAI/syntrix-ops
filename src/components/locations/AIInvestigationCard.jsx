import Card from "../ui/Card";

export default function AIInvestigationCard({ investigation }) {
  return (
    <Card className="mt-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-cyan-400 font-semibold">
            AI Investigation Summary
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Priority: {investigation.priority}
          </h2>
        </div>

        <div className="rounded-full bg-red-500/10 px-4 py-2">
          <span className="text-red-400 font-semibold">
            {investigation.priority}
          </span>
        </div>
      </div>

      <p className="mt-8 leading-8 text-slate-300 text-lg">
        {investigation.summary}
      </p>

      <div className="mt-8 rounded-xl border border-cyan-500/20 bg-slate-950 p-6">
        <p className="text-sm text-slate-400">
          Estimated Recoverable Profit
        </p>

        <h3 className="mt-2 text-4xl font-bold text-green-400">
          +${investigation.estimatedRecovery.toLocaleString()}
        </h3>

        <p className="text-slate-400">
          per week
        </p>
      </div>
    </Card>
  );
}