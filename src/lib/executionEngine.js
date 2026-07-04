export function generateExecutionItems(priorities) {
  return priorities.map((priority) => ({
    id: `exec-${priority.id}`,
    priorityId: priority.id,

    title: priority.primaryAction,
    location: priority.location,
    locationId: priority.locationId,

    sourceAssessment: priority.title,

    businessImpact: {
      weeklyRecovery: priority.estimatedImpact ?? 0,
    },

    confidence: priority.confidence ?? getDefaultConfidence(priority),

    whyNow: getWhyNow(priority),

    effort: priority.effort,
    estimatedTime: priority.estimatedTime,

    owner: getDefaultOwner(priority),
    status: getExecutionStatus(priority),
  }));
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