import {
  buildDecisionPortfolio,
  generateExecutiveMetrics,
} from "../engines";

import {
  getLocationHealthByIds,
} from "./getLocationHealth";

export function buildDecisionWorkspaceCore({
  organizationId,
  locations,
  priorities,
  assessments,
  recommendations,
  executionItems,
  operationalMemory,
}) {
  const locationIds =
    locations.map(
      (location) =>
        location.id,
    );

  const locationHealth =
    getLocationHealthByIds({
      organizationId,
      locationIds,
    });

  const metrics =
    generateExecutiveMetrics({
      locations,
      locationHealth,
      priorities,
      executionItems,
    });

  const portfolio =
    buildDecisionPortfolio({
      priorities,
      assessments,
      recommendations,
      executionItems,
      operationalMemory,
    });

  const insights =
    buildExecutiveInsights(
      priorities,
    );

  return {
    locationHealth,

    metrics,

    portfolio,

    overview: {
      insights,
    },

    operations: {
      priorities,

      criticalPriorities:
        priorities.filter(
          (priority) =>
            priority.severity ===
            "critical",
        ),
    },

    execution: {
      items:
        executionItems,
    },
  };
}

function buildExecutiveInsights(
  priorities,
) {
  return priorities
    .flatMap(
      (priority) =>
        (
          priority.insights ??
          []
        ).map(
          (insight) => ({
            ...insight,

            id:
              `${priority.id}-${insight.id}`,

            title:
              `${priority.location}: ${insight.title}`,
          }),
        ),
    )
    .slice(0, 5);
}