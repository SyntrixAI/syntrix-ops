import WorkspaceList from "../WorkspaceList";
import ExecutiveRow from "../ExecutiveRow";

export default function HierarchyTable({ rows = [] }) {
  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-slate-800 p-6 text-slate-400">
        No organization units available.
      </div>
    );
  }

  return (
    <WorkspaceList>
      {rows.map((row) => (
        <ExecutiveRow
          key={`${row.type ?? "entity"}-${row.id}`}
          title={row.title ?? row.name}
          subtitle={row.subtitle}
          status={row.status}
          situation={
            row.situation ??
            getDefaultSituation(row)
          }
          opportunity={
            row.opportunity ??
            `+$${(
              row.estimatedRecovery ?? 0
            ).toLocaleString()}/wk`
          }
          action={
            row.action ?? {
              label: "Open",
              href: row.href,
            }
          }
        />
      ))}
    </WorkspaceList>
  );
}

function getDefaultSituation(row) {
  if (row.activePriorities > 0) {
    return `${row.activePriorities} active priorities require review.`;
  }

  return "No major operational issues detected.";
}