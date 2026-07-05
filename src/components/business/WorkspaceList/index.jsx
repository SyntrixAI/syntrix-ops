export default function WorkspaceList({
  toolbar,
  columns = ["Name", "Status", "Situation", "Opportunity", "Action"],
  children,
}) {
  return (
    <div className="space-y-4">
      {toolbar}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="hidden border-b border-slate-800 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-slate-400 lg:grid lg:grid-cols-[1.4fr_0.8fr_1.6fr_1fr_0.8fr]">
          {columns.map((column) => (
            <div key={column}>{column}</div>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}