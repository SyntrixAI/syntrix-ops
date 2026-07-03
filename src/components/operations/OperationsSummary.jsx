import Card from "../ui/Card";

export default function OperationsSummary({
  activeInvestigations,
  criticalInvestigations,
  monitoring,
  lastUpdated,
}) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card>
        <p className="text-sm text-slate-400">Active Investigations</p>
        <p className="mt-2 text-4xl font-bold text-white">
          {activeInvestigations}
        </p>
      </Card>

      <Card>
        <p className="text-sm text-slate-400">Critical</p>
        <p className="mt-2 text-4xl font-bold text-red-400">
          {criticalInvestigations}
        </p>
      </Card>

      <Card>
        <p className="text-sm text-slate-400">Monitoring</p>
        <p className="mt-2 text-4xl font-bold text-cyan-400">{monitoring}</p>
      </Card>

      <Card>
        <p className="text-sm text-slate-400">Last Updated</p>
        <p className="mt-2 text-3xl font-bold text-white">{lastUpdated}</p>
      </Card>
    </div>
  );
}