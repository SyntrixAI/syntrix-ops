import Card from "../ui/Card";

export default function ExecutiveBrief({ brief }) {
  if (!brief) return null;

  const {
    headline,
    summary,
    recommendedFocus,
    estimatedRecovery,
  } = brief;

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-800 pb-6">
        <p className="text-sm font-semibold tracking-wide text-cyan-400 uppercase">
          Executive Brief
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white">
          {getGreeting()}
        </h1>

        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
          {headline}
        </p>

        <p className="mt-4 max-w-4xl leading-7 text-slate-400">
          {summary}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Recommended Focus
          </p>

          {recommendedFocus ? (
            <>
              <h3 className="mt-3 text-xl font-semibold text-white">
                {recommendedFocus.location}
              </h3>

              <p className="mt-2 text-slate-300">
                {recommendedFocus.title}
              </p>

              <p className="mt-3 text-sm text-cyan-400">
                {recommendedFocus.action}
              </p>
            </>
          ) : (
            <p className="mt-3 text-slate-500">
              No immediate operational focus.
            </p>
          )}
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Estimated Weekly Recovery
          </p>

          <h2 className="mt-4 text-5xl font-bold text-emerald-400">
            ${estimatedRecovery.toLocaleString()}
          </h2>

          <p className="mt-3 text-slate-400">
            Current opportunity across your operational scope.
          </p>
        </div>
      </div>
    </Card>
  );
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning.";
  if (hour < 18) return "Good Afternoon.";

  return "Good Evening.";
}