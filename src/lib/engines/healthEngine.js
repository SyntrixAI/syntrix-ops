export function generateLocationHealth({
  locations = [],
  signals = [],
  assessments = {},
  priorities = [],
  executionItems = [],
}) {
  return locations.reduce((healthByLocation, location) => {
    const locationSignals = signals.filter(
      (signal) => signal.locationId === location.id
    );

    const locationPriorities = priorities.filter(
      (priority) => priority.locationId === location.id
    );

    const locationExecutionItems = executionItems.filter(
      (item) => item.locationId === location.id
    );

    const assessment = assessments[location.id];

    const score = calculateOperationalHealthScore({
      signals: locationSignals,
      priorities: locationPriorities,
      executionItems: locationExecutionItems,
      assessment,
    });

    healthByLocation[location.id] = {
      locationId: location.id,
      location: location.name,
      score,
      status: getHealthStatus(score),
      summary: getHealthSummary(score, location.name),
      drivers: getHealthDrivers({
        signals: locationSignals,
        priorities: locationPriorities,
        executionItems: locationExecutionItems,
        assessment,
      }),
    };

    return healthByLocation;
  }, {});
}

function calculateOperationalHealthScore({
  signals,
  priorities,
  executionItems,
  assessment,
}) {
  let score = 100;

  const criticalSignals = signals.filter(
    (signal) => signal.severity === "critical"
  ).length;

  const warningSignals = signals.filter(
    (signal) => signal.severity === "warning"
  ).length;

  const criticalPriorities = priorities.filter(
    (priority) => priority.severity === "critical"
  ).length;

  const warningPriorities = priorities.filter(
    (priority) => priority.severity === "warning"
  ).length;

  const unresolvedExecutionItems = executionItems.filter(
    (item) => item.status !== "Resolved"
  ).length;

  const estimatedImpact = priorities.reduce(
    (total, priority) => total + (priority.estimatedImpact ?? 0),
    0
  );

  score -= criticalSignals * 12;
  score -= warningSignals * 7;
  score -= criticalPriorities * 15;
  score -= warningPriorities * 8;
  score -= unresolvedExecutionItems * 4;
  score -= Math.min(Math.floor(estimatedImpact / 500), 12);

  if (assessment?.confidence >= 90 && priorities.length > 0) {
    score -= 3;
  }

  return Math.max(0, Math.min(100, score));
}

function getHealthStatus(score) {
  if (score >= 85) return "Healthy";
  if (score >= 70) return "Watch";
  if (score >= 50) return "At Risk";
  return "Critical";
}

function getHealthSummary(score, locationName) {
  if (score >= 85) {
    return `${locationName} is operating within healthy thresholds.`;
  }

  if (score >= 70) {
    return `${locationName} is stable but has operational signals worth monitoring.`;
  }

  if (score >= 50) {
    return `${locationName} has active issues that may impact profitability.`;
  }

  return `${locationName} requires immediate operational attention.`;
}

function getHealthDrivers({
  signals,
  priorities,
  executionItems,
  assessment,
}) {
  const drivers = [];

  const topPriority = priorities[0];

  if (topPriority) {
    drivers.push({
      label: "Top Priority",
      value: topPriority.title,
    });
  }

  if (assessment) {
    drivers.push({
      label: "Syntrix Assessment",
      value: assessment.title,
    });
  }

  drivers.push({
    label: "Active Signals",
    value: signals.length,
  });

  drivers.push({
    label: "Open Execution Items",
    value: executionItems.filter((item) => item.status !== "Resolved").length,
  });

  return drivers;
}