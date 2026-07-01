export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <section className="max-w-6xl mx-auto">
        <p className="text-sm text-cyan-400 font-semibold">SYNTRIX OPS</p>

        <h1 className="text-5xl font-bold mt-4">
          Restaurant Operations Intelligence
        </h1>

        <p className="text-slate-300 mt-4 max-w-2xl">
          AI-powered dashboards, reports, and insights to help restaurants make
          faster, better operational decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400">Revenue</p>
            <h2 className="text-3xl font-bold mt-2">$18,420</h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400">Labor</p>
            <h2 className="text-3xl font-bold mt-2">27.8%</h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400">Food Cost</p>
            <h2 className="text-3xl font-bold mt-2">30.9%</h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400">Prime Cost</p>
            <h2 className="text-3xl font-bold mt-2">58.7%</h2>
          </div>
        </div>

        <div className="mt-10 bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-bold">AI Manager Insights</h2>
          <p className="text-slate-300 mt-3">
            Labor is within target, but food cost is trending slightly high.
            Recommend reviewing protein usage and adjusting prep for tomorrow.
          </p>
        </div>
      </section>
    </main>
  );
}
