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

      expectedImpact: {
        weeklyRecovery: priority.estimatedImpact ?? 0,
      },

      effort: priority.effort ?? "Medium",
      estimatedTime: priority.estimatedTime ?? "30–45 min",

      dependencies: getDependencies(priority),
      risk: getRisk(priority),
    };

    return recommendationsByPriority;
  }, {});
}

function getRecommendationTitle(priority) {
  if (priority.category === "Labor") return "Adjust labor deployment";
  if (priority.category === "Inventory") return "Review inventory variance";
  if (priority.category === "Sales") return "Monitor sales recovery";

  return priority.primaryAction ?? "Review operational issue";
}

function getRecommendedAction(priority) {
  if (priority.category === "Labor") {
    return "Review staffing against forecast and reduce excess labor where demand no longer supports scheduled coverage.";
  }

  if (priority.category === "Inventory") {
    return "Audit usage, receiving, and waste patterns to confirm the source of variance.";
  }

  if (priority.category === "Sales") {
    return "Continue monitoring recovery and compare results against promotion expectations.";
  }

  return priority.primaryAction ?? "Review this issue with the operating team.";
}

function getRecommendationReasoning(priority) {
  return `${priority.location} is ranked #${priority.priorityRank} with a Priority Score of ${priority.priorityScore}. Syntrix estimates a weekly recovery opportunity of $${(priority.estimatedImpact ?? 0).toLocaleString()} with ${priority.effort ?? "Medium"} effort.`;
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
  if (priority.severity === "critical") return "Delay may increase weekly profit leakage.";
  if (priority.severity === "warning") return "Variance may continue if not reviewed.";
  return "Low risk. Continue monitoring for repeat pattern.";
}