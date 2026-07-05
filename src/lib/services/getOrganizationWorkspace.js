import { priorities } from "../../data/priorities";
import { executionItems } from "../../data/executionItems";
import { locationHealth } from "../../data/locationHealth";
import { generateExecutiveMetrics, expandScope } from "../engines";

export function getOrganizationWorkspace(user) {
  const accessible = expandScope(user?.scope);

  const locationIds = accessible.locations.map((location) => location.id);

  const scopedPriorities = priorities.filter((priority) =>
    locationIds.includes(priority.locationId),
  );

  const scopedExecutionItems = executionItems.filter((item) =>
    locationIds.includes(item.locationId),
  );

  const scopedHealth = accessible.locations.reduce((healthByLocation, location) => {
    if (locationHealth[location.id]) {
      healthByLocation[location.id] = locationHealth[location.id];
    }

    return healthByLocation;
  }, {});

  const metrics = generateExecutiveMetrics({
    locations: accessible.locations,
    locationHealth: scopedHealth,
    priorities: scopedPriorities,
    executionItems: scopedExecutionItems,
  });

  const insights = scopedPriorities
    .flatMap((priority) =>
      (priority.insights ?? []).map((insight) => ({
        ...insight,
        id: `${priority.id}-${insight.id}`,
        title: `${priority.location}: ${insight.title}`,
      })),
    )
    .slice(0, 5);

  return {
    user,
    scope: accessible,

    overview: {
      health: {
        score: metrics.operationalHealth,
        status: metrics.healthStatus,
        summary: getOrganizationHealthSummary(user, metrics),
      },
      insights,
    },

    metrics,

    operations: {
      priorities: scopedPriorities,
      criticalPriorities: scopedPriorities.filter(
        (priority) => priority.priorityScore >= 90,
      ),
    },

    execution: {
      items: scopedExecutionItems,
    },

    organization: {
      company: accessible.company,
      regions: accessible.regions,
      districts: accessible.districts,
      locations: accessible.locations,
    },
  };
}

function getOrganizationHealthSummary(user, metrics) {
  const label = getScopeLabel(user);

  if (metrics.operationalHealth === null) {
    return `${label} does not have enough operational data yet.`;
  }

  if (metrics.operationalHealth >= 85) {
    return `${label} is operating within healthy thresholds.`;
  }

  if (metrics.operationalHealth >= 70) {
    return `${label} is stable but has operational opportunities worth reviewing.`;
  }

  if (metrics.operationalHealth >= 50) {
    return `${label} has active operational risk that requires leadership attention.`;
  }

  return `${label} requires immediate operational attention.`;
}

function getScopeLabel(user) {
  if (!user?.scope) return "This organization";

  if (user.scope.level === "company") return "The organization";
  if (user.scope.level === "region") return "This region";
  if (user.scope.level === "district") return "This district";
  if (user.scope.level === "location") return "This location";

  return "This organization";
}