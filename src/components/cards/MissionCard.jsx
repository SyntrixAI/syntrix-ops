export default function MissionCard({ location, action }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-xl font-bold text-white">
        Today's Mission
      </p>

      <h2 className="mt-6 text-2xl font-bold text-blue-400">
        {location}
      </h2>

      <p className="text-2xl font-bold text-blue-400">
        {action}
      </p>
    </div>
  );
}