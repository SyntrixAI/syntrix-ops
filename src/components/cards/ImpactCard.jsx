export default function ImpactCard({ amount, period }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-xl font-bold text-white">
        Potential Impact
      </p>

      <h2 className="mt-6 text-6xl font-bold text-cyan-400">
        {amount}
      </h2>

      <p className="mt-2 text-2xl font-bold text-white">
        {period}
      </p>
    </div>
  );
}