import InvestigationItem from "./InvestigationItem";

export default function InvestigationQueue({
  priorities = [],
}) {
  if (priorities.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-6">
        <p className="font-semibold text-white">
          No active investigations
        </p>

        <p className="mt-2 text-sm text-slate-400">
          No priorities currently require attention within this scope.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {priorities.map((priority) => (
        <InvestigationItem
          key={priority.id}
          priority={priority}
        />
      ))}
    </div>
  );
}