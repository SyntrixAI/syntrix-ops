export function buildOpportunityRanking(items = []) {
  return [...items].sort((a, b) => {
    return getOpportunityScore(b) - getOpportunityScore(a);
  });
}

function getOpportunityScore(item) {
  const priority = item.priority;

  const priorityScore = priority?.priorityScore ?? 0;
  const impact = priority?.estimatedImpact ?? 0;
  const severityBonus = priority?.severity === "critical" ? 20 : 0;
  const trendBonus = hasWorseningTrend(item) ? 15 : 0;
  const memoryBonus = item.memory ? 5 : 0;
  const effortPenalty = getEffortPenalty(priority?.effort);

  return (
    priorityScore +
    impact / 100 +
    severityBonus +
    trendBonus +
    memoryBonus -
    effortPenalty
  );
}

function hasWorseningTrend(item) {
  return item.trends?.some((trend) => trend.direction === "worsening");
}

function getEffortPenalty(effort) {
  if (effort === "High") return 15;
  if (effort === "Medium") return 8;
  if (effort === "Low") return 0;

  return 5;
}