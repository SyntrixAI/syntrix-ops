export function buildExecutiveBrief({
  intelligenceItems = [],
  scopedPriorities = [],
  scopedExecutionItems = [],
}) {
  const criticalItems = intelligenceItems.filter(
    (item) => item.priority?.priorityScore >= 90,
  );

  const estimatedRecovery = scopedPriorities.reduce(
    (sum, priority) => sum + (priority.estimatedImpact ?? 0),
    0,
  );

  const topItem = intelligenceItems[0];

  return {
    headline: getHeadline(criticalItems, scopedPriorities),
    summary: getSummary({
      criticalItems,
      scopedPriorities,
      scopedExecutionItems,
      estimatedRecovery,
      topItem,
    }),
    recommendedFocus: topItem
      ? {
          title: topItem.priority.title,
          location: topItem.priority.location,
          action: topItem.recommendation?.title,
          href: `/operations/investigations/${topItem.priority.id}`,
        }
      : null,
    estimatedRecovery,
  };
}

function getHeadline(criticalItems, priorities) {
  if (criticalItems.length > 0) {
    return `${criticalItems.length} critical operational issue${
      criticalItems.length === 1 ? "" : "s"
    } require leadership attention.`;
  }

  if (priorities.length > 0) {
    return `${priorities.length} active operational priorit${
      priorities.length === 1 ? "y" : "ies"
    } require review.`;
  }

  return "No major operational issues detected.";
}

function getSummary({
  criticalItems,
  scopedPriorities,
  scopedExecutionItems,
  estimatedRecovery,
  topItem,
}) {
  if (!scopedPriorities.length) {
    return "Syntrix is not detecting any active operational priorities in your current scope.";
  }

  const topLocation = topItem?.priority?.location ?? "the highest-risk location";

  return `${topLocation} is the current focus area. Syntrix is tracking ${
    scopedPriorities.length
  } active priorities, ${criticalItems.length} critical issues, and ${
    scopedExecutionItems.length
  } execution playbooks with an estimated recovery opportunity of $${estimatedRecovery.toLocaleString()}/week.`;
}