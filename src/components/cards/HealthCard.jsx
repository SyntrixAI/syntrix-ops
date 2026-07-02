export default function HealthCard({ score, status, confidence }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-xl font-bold text-white">Business Health</p>

      <h2 className="mt-3 text-6xl font-bold text-green-400">{score}</h2>

      <p className="mt-1 text-xl font-bold text-white">{status}</p>

      <p className="text-sm font-semibold text-white">
        {confidence}% Confidence
      </p>
    </div>
  );
}