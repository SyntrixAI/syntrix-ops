export function generateNarrative({
  name,
  metrics,
  priorities = [],
  action,
}) {
  return {
    title: name,

    status: metrics.healthStatus,

    situation: getSituation(priorities),

    opportunity:
      `+$${(metrics.estimatedRecovery ?? 0).toLocaleString()}/wk`,

    action,
  };
}

function getSituation(priorities) {
  if (!priorities.length) {
    return "No major operational issues detected.";
  }

  const critical = priorities.filter(
    (priority) => priority.priorityScore >= 90,
  );

  if (critical.length) {
    return `${critical.length} critical operational issue${
      critical.length === 1 ? "" : "s"
    } require immediate attention.`;
  }

  return `${priorities.length} active operational priorit${
    priorities.length === 1 ? "y" : "ies"
  } require review.`;
}