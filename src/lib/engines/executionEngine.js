export function generateExecutionItems(priorities, recommendations = {}) {
  return priorities.map((priority) => {
    const recommendation = recommendations[priority.id];

    return {
      id: `exec-${priority.id}`,
      priorityId: priority.id,

      title: recommendation?.title ?? priority.primaryAction,
      location: priority.location,
      locationId: priority.locationId,

      sourceAssessment: priority.title,
      description: recommendation?.action ?? priority.title,

      businessImpact: {
        weeklyRecovery:
          recommendation?.expectedImpact?.weeklyRecovery ??
          priority.estimatedImpact ??
          0,
      },

      confidence: priority.confidence ?? getDefaultConfidence(priority),

      whyNow: recommendation?.reasoning ?? getWhyNow(priority),

      effort: recommendation?.effort ?? priority.effort,
      estimatedTime: recommendation?.estimatedTime ?? priority.estimatedTime,

      dependencies: recommendation?.dependencies ?? [],
      risk: recommendation?.risk ?? null,

      owner: getDefaultOwner(priority),
      status: getExecutionStatus(priority),
    };
  });
}

function getDefaultConfidence(priority) {
  if (priority.severity === "critical") return 94;
  if (priority.severity === "warning") return 88;
  return 82;
}

function getWhyNow(priority) {
  if (priority.severity === "critical") {
    return "High-severity issue with immediate business impact.";
  }

  if (priority.severity === "warning") {
    return "Operational variance is large enough to require investigation.";
  }

  return "Low-risk signal worth monitoring for pattern development.";
}

function getDefaultOwner(priority) {
  if (priority.severity === "critical") return "District Manager";
  if (priority.severity === "warning") return "General Manager";
  return "Operations Lead";
}

function getExecutionStatus(priority) {
  if (priority.status === "monitoring") return "Monitoring";
  return "Recommended";
}