export function generateExecutiveMetrics({
  locations = [],
  locationHealth = {},
  priorities = [],
  executionItems = [],
}) {
  const healthScores = locations
    .map((location) => locationHealth[location.id])
    .filter(Boolean);

  const averageHealth =
    healthScores.length > 0
      ? Math.round(
          healthScores.reduce((sum, health) => sum + health.score, 0) /
            healthScores.length,
        )
      : null;

  const activePriorities = priorities.filter(
    (priority) => priority.status !== "resolved",
  );

  const criticalPriorities = activePriorities.filter(
    (priority) => priority.priorityScore >= 90,
  );

  const executionInProgress = executionItems.filter(
    (item) => item.status !== "Resolved",
  );

  const estimatedRecovery = activePriorities.reduce(
    (sum, priority) => sum + (priority.estimatedImpact ?? 0),
    0,
  );

  return {
    operationalHealth: averageHealth,
    healthStatus: getHealthStatus(averageHealth),

    totalLocations: locations.length,

    activePriorities: activePriorities.length,
    criticalPriorities: criticalPriorities.length,

    executionInProgress: executionInProgress.length,

    estimatedRecovery,
  };
}

function getHealthStatus(score) {
  if (score === null) return "Unknown";
  if (score >= 85) return "Healthy";
  if (score >= 70) return "Watch";
  if (score >= 50) return "At Risk";
  return "Critical";
}