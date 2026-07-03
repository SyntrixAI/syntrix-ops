import ExecutionItem from "./ExecutionItem";

export default function ExecutionQueue({ executions }) {
  return (
    <section className="mt-10">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">
          Execution Queue
        </h2>

        <p className="mt-2 text-slate-400">
          Prioritized recommendations ready for leadership review.
        </p>
      </div>

      <div className="space-y-6">
        {executions.map((execution) => (
          <ExecutionItem
            key={execution.id}
            execution={execution}
          />
        ))}
      </div>
    </section>
  );
}