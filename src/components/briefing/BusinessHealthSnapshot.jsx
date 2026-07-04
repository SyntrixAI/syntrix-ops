import Card from "../ui/Card";

export default function BusinessHealthSnapshot({ company }) {
  return (
    <Card className="mt-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
        Company Operational Health Snapshot
      </p>

      <div className="mt-6 flex items-end justify-between border-b border-slate-800 pb-6">
        <div>
          <p className="text-sm text-slate-500">Operational Health</p>
          <p className="mt-2 text-5xl font-bold text-green-400">
            {company.businessHealth}
          </p>
        </div>

        <p className="text-lg font-semibold text-white">
          {company.healthStatus}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-5">
        <div>
          <p className="text-md text-slate-500">Sales</p>
          <p className="mt-2 text-3xl font-bold text-white">
            ${company.previousDaySales.toLocaleString()}
          </p>
          <p className="text-md text-green-400">
            ▲ {company.salesChangeVsLastWeek}%
          </p>
        </div>

        <div>
          <p className="text-md text-slate-500">Prime Cost</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {company.primeCost}%
          </p>
          <p className="text-md text-green-400">
            ▼ {Math.abs(company.primeCostChangeVsLastWeek)}%
          </p>
        </div>

        <div>
          <p className="text-md text-slate-500">Confidence</p>
          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {company.confidence}%
          </p>
        </div>

        <div>
          <p className="text-md text-slate-500">Locations</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {company.totalLocations}
          </p>
        </div>
      </div>
    </Card>
  );
}