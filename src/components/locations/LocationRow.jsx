import Link from "next/link";

export default function LocationRow({ location }) {
  const statusColor = {
    healthy: "text-green-400",
    warning: "text-yellow-400",
    critical: "text-red-400",
  };

  return (
    <div className="grid grid-cols-7 items-center border-b border-slate-800 px-6 py-5 transition hover:bg-slate-800/50">

      <div>
        <p className="font-semibold">{location.name}</p>
      </div>

      <div className={statusColor[location.status]}>
        {location.status}
      </div>

      <div>
        {location.healthScore}
      </div>

      <div>
        {location.salesVsForecast > 0 ? "+" : ""}
        {location.salesVsForecast}%
      </div>

      <div>
        {location.primeCost}%
      </div>

      <div>
        {location.manager}
      </div>

      <div className="text-right">
        <Link
          href={`/locations/${location.id}`}
          className="font-medium text-cyan-400 hover:text-cyan-300"
        >
          View →
        </Link>
      </div>

    </div>
  );
}