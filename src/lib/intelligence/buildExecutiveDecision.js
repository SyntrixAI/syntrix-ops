export function buildExecutiveDecision(item) {
  if (!item) return null;

  const score = calculateExecutiveScore(item);

  return {
    score,
    rationale: buildRationale(item),
    urgency: getUrgency(score),
    recommendation: item.recommendation?.title ?? null,
    estimatedRecovery: item.priority?.estimatedImpact ?? 0,
  };
}

function calculateExecutiveScore(item) {
  const priority = item.priority;

  const priorityScore = priority?.priorityScore ?? 0;
  const impact = (priority?.estimatedImpact ?? 0) / 100;
  const severity = priority?.severity === "critical" ? 20 : 0;

  const worseningTrend = item.trends?.some(
    (trend) => trend.direction === "worsening",
  )
    ? 15
    : 0;

  const memory = item.memory?.status === "Active Memory" ? 10 : 0;
  const effort = getEffortPenalty(priority?.effort);

  return Math.round(
    priorityScore + impact + severity + worseningTrend + memory - effort,
  );
}

function buildRationale(item) {
  const reasons = [];

  if ((item.priority?.estimatedImpact ?? 0) >= 1000) {
    reasons.push("High weekly recovery opportunity");
  }

  if (item.priority?.severity === "critical") {
    reasons.push("Critical operational issue");
  }

  if (item.trends?.some((trend) => trend.direction === "worsening")) {
    reasons.push("Trend is worsening");
  }

  if (item.memory?.status === "Active Memory") {
    reasons.push("Historical operational memory available");
  }

  if (item.priority?.effort === "Low") {
    reasons.push("Low execution effort");
  }

  return reasons;
}

function getUrgency(score) {
  if (score >= 120) return "Immediate";
  if (score >= 90) return "High";
  if (score >= 70) return "Medium";

  return "Normal";
}

function getEffortPenalty(effort) {
  if (effort === "High") return 15;
  if (effort === "Medium") return 8;

  return 0;
}