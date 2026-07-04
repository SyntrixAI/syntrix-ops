import InvestigationItem from "./InvestigationItem";

export default function InvestigationQueue({ operations }) {
  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">Investigation Queue</h2>
        <p className="mt-1 text-sm text-slate-400">
          Prioritized by severity and estimated business impact.
        </p>
      </div>

      <div className="space-y-4">
        {operations.map((operation) => (
          <InvestigationItem key={operation.id} operation={operation} />
        ))}
      </div>
    </section>
  );
}