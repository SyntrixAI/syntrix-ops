const severityRank = {
  critical: 3,
  warning: 2,
  info: 1,
};

export function prioritizeSignals(signals) {
  return [...signals]
    .filter((signal) => signal.status !== "resolved")
    .sort((a, b) => {
      const severityDifference =
        (severityRank[b.severity] ?? 0) - (severityRank[a.severity] ?? 0);

      if (severityDifference !== 0) return severityDifference;

      return (b.estimatedImpact ?? 0) - (a.estimatedImpact ?? 0);
    })
    .map((signal, index) => ({
      ...signal,
      priorityRank: index + 1,
      primaryAction: getPrimaryAction(signal),
    }));
}

function getPrimaryAction(signal) {
  if (signal.severity === "critical") return "Review immediately";
  if (signal.severity === "warning") return "Investigate";
  return "Monitor";
}