import Card from "../ui/Card";

export default function LocationExecution({ execution }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white">Execution</h2>

      <p className="mt-1 text-sm text-slate-400">
        Recommended actions currently tied to this location.
      </p>

      <div className="mt-5 space-y-4">
        {execution.items.map((item) => (
          <Card key={item.id}>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>

                <p className="mt-2 text-slate-400">
                  {item.sourceAssessment}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Owner: {item.owner} · Status: {item.status}
                </p>
              </div>

              <p className="text-xl font-bold text-green-400">
                +${item.businessImpact.weeklyRecovery.toLocaleString()}/wk
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}