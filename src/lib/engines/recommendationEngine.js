import { generateRootCauses } from "./rootCauseEngine";
import { generateTrends } from "./trendEngine";

export function generateRecommendations(priorities = []) {
  return priorities.reduce((recommendationsByPriority, priority) => {
    recommendationsByPriority[priority.id] = {
      id: `rec-${priority.id}`,
      priorityId: priority.id,

      locationId: priority.locationId,
      location: priority.location,

      title: getRecommendationTitle(priority),
      action: getRecommendedAction(priority),
      reasoning: getRecommendationReasoning(priority),
      rootCauses: generateRootCauses(priority),
      trends: generateTrends(priority),

      expectedImpact: {
        weeklyRecovery: priority.estimatedImpact ?? 0,
      },

      effort: priority.effort ?? "Medium",
      estimatedTime: priority.estimatedTime ?? "30–45 min",

      dependencies: getDependencies(priority),
      risk: getRisk(priority),
      successCriteria: getSuccessCriteria(priority),
      followUp: getFollowUp(priority),
    };

    return recommendationsByPriority;
  }, {});
}

function getRecommendationTitle(priority) {
  if (priority.category === "Labor") {
    return `Adjust labor deployment at ${priority.location}`;
  }

  if (priority.category === "Inventory") {
    return `Audit inventory variance at ${priority.location}`;
  }

  if (priority.category === "Sales") {
    return `Review sales recovery at ${priority.location}`;
  }

  return priority.primaryAction ?? "Review operational issue";
}

function getRecommendedAction(priority) {
  if (priority.category === "Labor") {
    return `Review staffing against current demand at ${priority.location} and reduce excess labor where sales no longer support scheduled coverage.`;
  }

  if (priority.category === "Inventory") {
    return `Audit inventory usage, receiving records, and waste logs at ${priority.location} to identify the source of variance.`;
  }

  if (priority.category === "Sales") {
    return `Compare hourly sales recovery at ${priority.location} against forecast and promotion expectations before changing staffing or inventory plans.`;
  }

  return priority.primaryAction ?? "Review this issue with the operating team.";
}

function getRecommendationReasoning(priority) {
  const topInsight = priority.insights?.[0];

  const insightText = topInsight
    ? ` Key insight: ${topInsight.description}`
    : "";

  return `${priority.location} is ranked #${priority.priorityRank} with a Priority Score of ${priority.priorityScore}. Syntrix estimates a weekly recovery opportunity of $${(priority.estimatedImpact ?? 0).toLocaleString()} with ${priority.effort ?? "Medium"} effort.${insightText}`;
}

function getDependencies(priority) {
  if (priority.category === "Labor") {
    return ["Labor schedule", "Sales forecast", "Manager approval"];
  }

  if (priority.category === "Inventory") {
    return ["Inventory count", "Receiving log", "Usage report"];
  }

  if (priority.category === "Sales") {
    return ["Promotion report", "Hourly sales trend"];
  }

  return ["Manager review"];
}

function getRisk(priority) {
  if (priority.severity === "critical") {
    return `Delay may allow the issue at ${priority.location} to continue increasing weekly profit leakage.`;
  }

  if (priority.severity === "warning") {
    return `Variance at ${priority.location} may continue if not reviewed by the operating team.`;
  }

  return `Low immediate risk at ${priority.location}. Continue monitoring for repeat patterns.`;
}

function getSuccessCriteria(priority) {
  if (priority.category === "Labor") {
    return [
      "Labor returns to target range.",
      "Service levels remain stable.",
      "No increase in guest complaints.",
    ];
  }

  if (priority.category === "Inventory") {
    return [
      "Inventory variance decreases.",
      "Waste is documented.",
      "Receiving matches purchase records.",
    ];
  }

  return [
    "Recommendation completed.",
    "Operational metric improves.",
  ];
}

function getFollowUp(priority) {
  if (priority.category === "Labor") {
    return `Review labor performance at ${priority.location} after the next completed shift.`;
  }

  if (priority.category === "Inventory") {
    return `Audit inventory at ${priority.location} again after the next receiving cycle.`;
  }

  if (priority.category === "Sales") {
    return `Review sales performance at ${priority.location} after the next daypart.`;
  }

  return `Verify operational improvement at ${priority.location} during the next review.`;
}