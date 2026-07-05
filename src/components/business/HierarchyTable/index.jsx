import HierarchyRow from "../HierarchyRow";

export default function HierarchyTable({ rows = [] }) {
  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-slate-800 p-6 text-slate-400">
        No organization units available.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="grid grid-cols-7 border-b border-slate-800 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
        <div>Name</div>
        <div>Type</div>
        <div>Status</div>
        <div>Health</div>
        <div>Priorities</div>
        <div>Recovery</div>
        <div></div>
      </div>

      {rows.map((row) => (
        <HierarchyRow key={row.id} row={row} />
      ))}
    </div>
  );
}