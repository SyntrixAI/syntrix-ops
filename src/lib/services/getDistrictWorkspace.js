import { getDistrict } from "../selectors";
import { expandScope } from "../engines";
import { locationHealth } from "../../data/locationHealth";
import { priorities } from "../../data/priorities";
import { executionItems } from "../../data/executionItems";
import { generateExecutiveMetrics } from "../engines";

export function getDistrictWorkspace(user, id) {
  const districtEntity = getDistrict(id);

  if (!districtEntity) return null;

  const accessible = expandScope(user?.scope);

  const canAccessDistrict = accessible.districts.some(
    (accessibleDistrict) => accessibleDistrict.id === districtEntity.district.id,
  );

  if (!canAccessDistrict) return null;

  const { district, region, company, locations } = districtEntity;

  const locationIds = locations.map((location) => location.id);

  const districtPriorities = priorities.filter((priority) =>
    locationIds.includes(priority.locationId),
  );

  const districtExecutionItems = executionItems.filter((item) =>
    locationIds.includes(item.locationId),
  );

  const districtHealth = locations.reduce((healthByLocation, location) => {
  if (locationHealth[location.id]) {
    healthByLocation[location.id] = locationHealth[location.id];
  }

  return healthByLocation;
    }, {});
    
    const metrics = generateExecutiveMetrics({
    locations,
    locationHealth: districtHealth,
    priorities: districtPriorities,
    executionItems: districtExecutionItems,
        });

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

    metrics,

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