import Card from "../ui/Card";


export default function DailyBrief({
  headline,
  findings,
  recommendation,
  impact,
}) {
  return (
    <Card className="mt-8">
      <h2 className="text-3xl font-bold text-white">
        Daily Brief
      </h2>

      <p className="mt-6 text-lg text-slate-300">
        {headline}
      </p>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white">
          Key Findings
        </h3>

        <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-300">
          {findings.map((finding, index) => (
            <li key={index}>{finding}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white">
          Recommendation
        </h3>

        <p className="mt-2 text-slate-300">
          {recommendation}
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-cyan-500/20 bg-slate-950 p-6">
        <p className="text-sm text-slate-400">
          Estimated Financial Impact
        </p>

        <p className="mt-2 text-4xl font-bold text-cyan-400">
          {impact}
        </p>
      </div>
    </Card>
  );
}