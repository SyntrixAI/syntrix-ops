import {
  getAncestors,
  getDescendantLocations,
  resolveHierarchyEntity,
} from "../engines";

import {
  buildDecisionWorkspaceCore,
} from "./buildDecisionWorkspaceCore";

import {
  getScopedWorkspaceData,
} from "./getScopedWorkspaceData";

const DISTRICT_WORKSPACE_SCOPE_LEVELS = new Set([
  "company",
  "region",
  "district",
]);

export function getDistrictWorkspace(
  requestContext,
  districtId,
) {
  requireActiveMembership(requestContext);

  if (!canOpenDistrictWorkspace(requestContext)) {
    return null;
  }

  const scoped =
    getScopedWorkspaceData(requestContext);

  const district = resolveHierarchyEntity({
    organizationId: scoped.organizationId,
    type: "district",
    id: districtId,
  });

  if (!district) {
    return null;
  }

  const canAccessDistrict =
    scoped.organization.districts.some(
      (accessibleDistrict) =>
        accessibleDistrict.id === district.id,
    );

  if (!canAccessDistrict) {
    return null;
  }

  const ancestors = getAncestors({
    organizationId: scoped.organizationId,
    entity: district,
  });

  const region =
    ancestors.find(
      (entity) => entity.type === "region",
    ) ?? null;

  const company =
    ancestors.find(
      (entity) => entity.type === "company",
    ) ?? null;

  const locations = getDescendantLocations({
    organizationId: scoped.organizationId,
    entity: district,
  });

  const locationIds = new Set(
    locations.map((location) => location.id),
  );

  const districtPriorities =
    scoped.priorities.filter(
      (priority) =>
        locationIds.has(priority.locationId),
    );

  

  const districtExecutionItems =
    scoped.executionItems.filter(
      (item) =>
        locationIds.has(item.locationId),
    );

  const priorityIds =
    new Set(
      districtPriorities.map(
        (priority) =>
          priority.id,
      ),
    );

  const districtAssessments =
    filterCollection(
      scoped.assessments,
      (assessment) =>
        locationIds.has(
          assessment.locationId,
        ),
    );

  const districtRecommendations =
    filterCollection(
      scoped.recommendations,
      (recommendation) =>
        priorityIds.has(
          recommendation.priorityId,
        ),
    );

  const districtOperationalMemory =
    filterCollection(
      scoped.operationalMemory,
      (memory) =>
        locationIds.has(
          memory.locationId,
        ),
    );
    
  const core =
    buildDecisionWorkspaceCore({
      organizationId:
        scoped.organizationId,

      locations,

      priorities:
        districtPriorities,

      assessments:
        districtAssessments,

      recommendations:
        districtRecommendations,

      executionItems:
        districtExecutionItems,

      operationalMemory:
        districtOperationalMemory,
    });

  const {
    locationHealth:
      districtHealth,

    metrics,

    portfolio,

    operations,

    execution,
  } = core;

  const locationSummaries = locations
    .map((location) => {
      const health =
        districtHealth[location.id] ?? null;

      const priorities =
        districtPriorities.filter(
          (priority) =>
            priority.locationId === location.id,
        );

      const criticalPriorities =
        priorities.filter(
          (priority) =>
            priority.severity === "critical",
        );

      return {
        id: location.id,
        name: location.name,
        health: {
          score: health?.score ?? null,
          status: health?.status ?? "Unknown",
        },
        activePriorities: priorities.length,
        criticalPriorities:
          criticalPriorities.length,
        highestPriorityScore:
          priorities[0]?.priorityScore ?? 0,
        href: `/locations/${location.id}`,
      };
    })
    .sort(compareLocationSummaries);

  return {
    user: requestContext.user,
    membership: requestContext.membership,

    district,
    region,
    company,
    locations,
    locationSummaries,

    overview: {
      health: {
        score: metrics.operationalHealth,
        status: metrics.healthStatus,
        summary: getDistrictHealthSummary(
          district.name,
          metrics.operationalHealth,
        ),
      },

      insights: core.overview.insights,
    },

    metrics,

    portfolio,

    operations,

    execution,

    counts: {
      locations: locations.length,
      priorities: districtPriorities.length,
      executionItems:
        districtExecutionItems.length,
    },
  };
}

function requireActiveMembership(
  requestContext,
) {
  if (
    !requestContext?.authenticated ||
    !requestContext.membership ||
    requestContext.membership.status !== "active"
  ) {
    throw new Error(
      "District workspace requires an active organization membership.",
    );
  }
}

function canOpenDistrictWorkspace(
  requestContext,
) {
  return DISTRICT_WORKSPACE_SCOPE_LEVELS.has(
    requestContext.membership?.scopeLevel,
  );
}

function getDistrictHealthSummary(
  districtName,
  score,
) {
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

function compareLocationSummaries(
  first,
  second,
) {
  if (
    second.criticalPriorities !==
    first.criticalPriorities
  ) {
    return (
      second.criticalPriorities -
      first.criticalPriorities
    );
  }

  if (
    second.highestPriorityScore !==
    first.highestPriorityScore
  ) {
    return (
      second.highestPriorityScore -
      first.highestPriorityScore
    );
  }

  const firstHealth =
    first.health.score ?? 101;

  const secondHealth =
    second.health.score ?? 101;

  return firstHealth - secondHealth;
}

function filterCollection(
  collection,
  predicate,
) {
  if (
    Array.isArray(
      collection,
    )
  ) {
    return collection.filter(
      predicate,
    );
  }

  if (
    collection &&
    typeof collection ===
      "object"
  ) {
    return Object.values(
      collection,
    ).filter(predicate);
  }

  return [];
}