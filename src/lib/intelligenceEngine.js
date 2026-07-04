export function generateIntelligenceBrief(priorities, executionItems = []) {
  const activePriorities = priorities.filter(
    (priority) => priority.status !== "resolved"
  );

  const topPriority = activePriorities[0];

  const totalEstimatedImpact = activePriorities.reduce(
    (total, priority) => total + (priority.estimatedImpact ?? 0),
    0
  );

  const averageConfidence = Math.round(
    activePriorities.reduce(
      (total, priority) => total + (priority.confidence ?? 90),
      0
    ) / Math.max(activePriorities.length, 1)
  );

  return {
    generatedAt: "Live",

    headline: topPriority
      ? `${topPriority.location} requires attention first`
      : "No urgent operational issues detected",

    summary: topPriority
      ? `${topPriority.title} is the highest-priority operational signal because it carries the greatest combination of severity and estimated business impact.`
      : "Syntrix is monitoring live operational signals across all locations.",

    recommendedDecision: topPriority?.primaryAction ?? "Continue monitoring",

    estimatedImpact: totalEstimatedImpact,

    confidence: averageConfidence,

    evidence: activePriorities.map((priority) => ({
      id: priority.id,
      location: priority.location,
      source: priority.source,
      severity: priority.severity,
      impact: priority.estimatedImpact,
    })),

    executionCount: executionItems.length,
  };
}