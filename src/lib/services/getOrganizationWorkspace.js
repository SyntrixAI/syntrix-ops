import { locationHealth } from "../../data/locationHealth";
import { generateExecutiveMetrics,
          generateEntityMetrics,
          generateNarrative,
          getChildren,
          getDescendantLocations,
 } from "../engines";
import { getScopedWorkspaceData } from "./getScopedWorkspaceData";

export function getOrganizationWorkspace(user) {
  const scoped = getScopedWorkspaceData(user);
  const accessible = scoped.organization;
  const scopedPriorities = scoped.priorities;
  const scopedExecutionItems = scoped.executionItems;

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

  const entities = getOrganizationEntities({
    user,
    organization: accessible,
    metrics,
    priorities: scopedPriorities,
  });

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
      entities,
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

function getOrganizationEntities({
  user,
  organization,
  metrics,
  priorities,
}) {
  const currentEntity = getCurrentEntity(user, organization);

  const children = getChildren(currentEntity);

  const entities = children.length > 0 ? children : [currentEntity];

  return entities.filter(Boolean).map((entity) => {
    const descendantLocations = getDescendantLocations(entity);

    const locationIds = descendantLocations.map(location => location.id);

    const entityPriorities = getScopedPriorities(priorities, locationIds);

    const entityMetrics = generateEntityMetrics({
      metrics,
      priorities: entityPriorities,
    });

    const narrative = generateNarrative({
      name: entity.name,
      metrics: entityMetrics,
      priorities: entityPriorities,
      action: {
        label: "Open",
        href: getEntityHref(entity),
      },
    });

    return {
      id: entity.id,
      subtitle: getEntitySubtitle(entity),
      type: entity.type,
      ...narrative,
    };
  });
}

function getCurrentEntity(user, organization) {
  if (user.scope.level === "company") {
    return {
      ...organization.company,
      type: "company",
    };
  }

  if (user.scope.level === "region") {
    return {
      ...organization.regions[0],
      type: "region",
    };
  }

  if (user.scope.level === "district") {
    return {
      ...organization.districts[0],
      type: "district",
    };
  }

  if (user.scope.level === "location") {
    return {
      ...organization.locations[0],
      type: "location",
    };
  }

  return null;
}

function getEntityHref(entity) {
  if (entity.type === "region") {
    return `/organization/regions/${entity.id}`;
  }

  if (entity.type === "district") {
    return `/districts/${entity.id}`;
  }

  if (entity.type === "location") {
    return `/locations/${entity.id}`;
  }

  return "/organization";
}

function getEntitySubtitle(entity) {
  if (entity.type === "region") return "Region";
  if (entity.type === "district") return "District";

  if (entity.type === "location") {
    return `${entity.city}, ${entity.state}`;
  }

  return "Organization";
}