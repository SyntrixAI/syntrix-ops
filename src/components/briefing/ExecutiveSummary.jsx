import Card from "../ui/Card";

export default function ExecutiveSummary({ dailyBrief }) {
  const { amount, period } = dailyBrief.executiveSummary.estimatedRecovery;
  const { yesterday, today, recommendation } = dailyBrief.executiveSummary;

  return (
    <Card className="mt-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
        Executive Summary
      </p>

      {/* Yesterday */}

      <section className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Yesterday
        </p>

        <p className="mt-3 text-lg leading-8 text-slate-200">
          {yesterday}
        </p>
      </section>

      <div className="my-8 border-t border-slate-800" />

      {/* Today */}

      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Today
        </p>

        <p className="mt-3 text-lg leading-8 text-slate-200">
          {today}
        </p>
      </section>

      <div className="my-8 border-t border-slate-800" />

      {/* Recommendation */}

      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Recommendation
        </p>

        <p className="mt-3 text-xl font-semibold text-white">
          {recommendation}
        </p>

        <div className="mt-6 rounded-xl border border-green-500/20 bg-green-500/5 p-5">
          <p className="text-sm text-slate-400">
            Estimated Recoverable Profit
          </p>

          <p className="mt-2 text-4xl font-bold text-green-400">
            +${amount.toLocaleString()}/{period}
          </p>
        </div>
      </section>

      <div className="mt-10 border-t border-slate-800 pt-5">
        <p className="text-sm text-slate-500">
          Prepared by Syntrix Intelligence • {dailyBrief.generatedAt}
        </p>
      </div>
    </Card>
  );
}