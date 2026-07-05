export function generateEntityMetrics({
  metrics,
  priorities = [],
  executionItems = [],
}) {
  const criticalPriorities = priorities.filter(
    (priority) => priority.priorityScore >= 90,
  );

  const estimatedRecovery = priorities.reduce(
    (sum, priority) => sum + (priority.estimatedImpact ?? 0),
    0,
  );

  return {
    ...metrics,

    activePriorities: priorities.length,

    criticalPriorities: criticalPriorities.length,

    estimatedRecovery,

    priorities,

    executionItems,
  };
}