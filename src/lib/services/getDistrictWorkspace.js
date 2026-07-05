import { getDistrict } from "../selectors";

import { locationHealth } from "../../data/locationHealth";
import { priorities } from "../../data/priorities";
import { executionItems } from "../../data/executionItems";

export function getDistrictWorkspace(id) {
  const districtEntity = getDistrict(id);

  if (!districtEntity) return null;

  const { district, region, company, locations } = districtEntity;

  const locationIds = locations.map((location) => location.id);

  const districtPriorities = priorities.filter((priority) =>
    locationIds.includes(priority.locationId),
  );

  const districtExecutionItems = executionItems.filter((item) =>
    locationIds.includes(item.locationId),
  );

  const executiveInsights = districtPriorities
    .flatMap((priority) =>
      (priority.insights ?? []).map((insight) => ({
        ...insight,
        id: `${priority.id}-${insight.id}`,
        title: `${priority.location}: ${insight.title}`,
      })),
    )
    .slice(0, 5);

  const healthScores = locations
    .map((location) => locationHealth[location.id])
    .filter(Boolean);

  const averageHealth =
    healthScores.length > 0
      ? Math.round(
          healthScores.reduce((sum, health) => sum + health.score, 0) /
            healthScores.length,
        )
      : null;

  return {
    district,
    region,
    company,
    locations,

    overview: {
      health: {
        score: averageHealth,
        status: getDistrictHealthStatus(averageHealth),
        summary: getDistrictHealthSummary(district.name, averageHealth),
      },
      insights: executiveInsights,
    },

    operations: {
      priorities: districtPriorities,
      criticalPriorities: districtPriorities.filter(
        (priority) => priority.priorityScore >= 90,
      ),
    },

    execution: {
      items: districtExecutionItems,
    },

    counts: {
      locations: locations.length,
      priorities: districtPriorities.length,
      executionItems: districtExecutionItems.length,
    },
  };
}

function getDistrictHealthStatus(score) {
  if (score === null) return "Unknown";
  if (score >= 85) return "Healthy";
  if (score >= 70) return "Watch";
  if (score >= 50) return "At Risk";
  return "Critical";
}

function getDistrictHealthSummary(districtName, score) {
  if (score === null) {
    return `${districtName} does not have enough operational data yet.`;
  }

  if (score >= 85) {
    return `${districtName} is operating within healthy thresholds.`;
  }

  if (score >= 70) {
    return `${districtName} is stable but has locations requiring attention.`;
  }

  if (score >= 50) {
    return `${districtName} has active operational risk across multiple locations.`;
  }

  return `${districtName} requires immediate leadership attention.`;
}