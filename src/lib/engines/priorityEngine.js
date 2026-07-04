const severityRank = {
  critical: 1,
  warning: 2,
  info: 3,
};

export function generatePrioritiesFromSignals(signals) {
  return [...signals]
    .sort((a, b) => severityRank[a.severity] - severityRank[b.severity])
    .slice(0, 3)
    .map((signal, index) => ({
      id: signal.id,
      rank: index + 1,
      priority:
        signal.severity === "critical"
          ? "Critical"
          : signal.severity === "warning"
          ? "High"
          : "Medium",
      title:
        signal.locationId === "austin-south"
          ? "Visit Austin South"
          : `Review ${signal.location}`,
      reason: signal.description,
      impact: {
        amount: signal.estimatedImpact ?? 0,
        period: "week",
      },
      effort: signal.effort ?? "Medium",
      estimatedTime: signal.estimatedTime ?? "30–45 min",
      nextStep: "Open assessment",
    }));
}