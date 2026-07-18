import {
  getLocationHealthByIds,
} from "./getLocationHealth";

import {
  buildDecisionPortfolio,
  generateExecutiveMetrics,
  generateEntityMetrics,
  generateNarrative,
  getChildren,
  getDescendantLocations,
  getScopedPriorities,
  resolveHierarchyEntity,
} from "../engines";

import {
  getScopedWorkspaceData,
} from "./getScopedWorkspaceData";

const REGION_WORKSPACE_SCOPE_LEVELS =
  new Set([
    "company",
    "region",
  ]);

export function getRegionWorkspace(
  requestContext,
  regionId,
) {
  requireActiveMembership(
    requestContext,
  );

  if (
    !canOpenRegionWorkspace(
      requestContext,
    )
  ) {
    return null;
  }

  const scoped =
    getScopedWorkspaceData(
      requestContext,
    );

  const region =
    resolveHierarchyEntity({
      organizationId:
        scoped.organizationId,

      type: "region",

      id: regionId,
    });

  if (!region) {
    return null;
  }

  const canAccessRegion =
    scoped.organization.regions.some(
      (accessibleRegion) =>
        accessibleRegion.id ===
        region.id,
    );

  if (!canAccessRegion) {
    return null;
  }

  const locations =
    getDescendantLocations({
      organizationId:
        scoped.organizationId,

      entity: region,
    });

  const locationIds =
    locations.map(
      (location) =>
        location.id,
    );

  const locationIdSet =
    new Set(locationIds);

  const regionHealth =
    getLocationHealthByIds({
      organizationId:
        scoped.organizationId,

      locationIds,
    });

  const regionPriorities =
    scoped.priorities.filter(
      (priority) =>
        locationIdSet.has(
          priority.locationId,
        ),
    );

  const regionExecutionItems =
    scoped.executionItems.filter(
      (item) =>
        locationIdSet.has(
          item.locationId,
        ),
    );

  const priorityIds =
    new Set(
      regionPriorities.map(
        (priority) =>
          priority.id,
      ),
    );

  const regionAssessments =
    filterCollection(
      scoped.assessments,
      (assessment) =>
        locationIdSet.has(
          assessment.locationId,
        ),
    );

  const regionRecommendations =
    filterCollection(
      scoped.recommendations,
      (recommendation) =>
        priorityIds.has(
          recommendation.priorityId,
        ),
    );

  const regionOperationalMemory =
    filterCollection(
      scoped.operationalMemory,
      (memory) =>
        locationIdSet.has(
          memory.locationId,
        ),
    );

  const metrics =
    generateExecutiveMetrics({
      locations,

      locationHealth:
        regionHealth,

      priorities:
        regionPriorities,

      executionItems:
        regionExecutionItems,
    });

  const portfolio =
    buildDecisionPortfolio({
      priorities:
        regionPriorities,

      assessments:
        regionAssessments,

      recommendations:
        regionRecommendations,

      executionItems:
        regionExecutionItems,

      operationalMemory:
        regionOperationalMemory,
    });

  const districts =
    getChildren({
      organizationId:
        scoped.organizationId,

      entity: region,
    });

  const districtSummaries =
    districts.map(
      (district) =>
        buildDistrictSummary({
          organizationId:
            scoped.organizationId,

          district,

          metrics,

          priorities:
            regionPriorities,
        }),
    );

  const insights =
    regionPriorities
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

  return {
    user:
      requestContext.user,

    membership:
      requestContext.membership,

    region,

    locations,

    districts:
      districtSummaries,

    overview: {
      health: {
        score:
          metrics.operationalHealth,

        status:
          metrics.healthStatus,

        summary:
          getRegionHealthSummary(
            region.name,
            metrics.operationalHealth,
          ),
      },

      insights,
    },

    metrics,

    portfolio,

    execution: {
      items:
        regionExecutionItems,
    },
  };
}

function buildDistrictSummary({
  organizationId,
  district,
  metrics,
  priorities,
}) {
  const locations =
    getDescendantLocations({
      organizationId,
      entity: district,
    });

  const locationIds =
    locations.map(
      (location) =>
        location.id,
    );

  const districtPriorities =
    getScopedPriorities(
      priorities,
      locationIds,
    );

  const districtMetrics =
    generateEntityMetrics({
      metrics,

      priorities:
        districtPriorities,
    });

  const narrative =
    generateNarrative({
      name:
        district.name,

      metrics:
        districtMetrics,

      priorities:
        districtPriorities,

      action: {
        label:
          "Open District",

        href:
          `/districts/${district.id}`,
      },
    });

  return {
    id:
      district.id,

    type:
      district.type,

    subtitle:
      "District",

    ...narrative,
  };
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

function getRegionHealthSummary(
  regionName,
  score,
) {
  if (score === null) {
    return (
      `${regionName} does not have ` +
      "enough operational data yet."
    );
  }

  if (score >= 85) {
    return (
      `${regionName} is operating ` +
      "within healthy thresholds."
    );
  }

  if (score >= 70) {
    return (
      `${regionName} is stable, ` +
      "but has districts worth reviewing."
    );
  }

  if (score >= 50) {
    return (
      `${regionName} has active ` +
      "operational risk requiring attention."
    );
  }

  return (
    `${regionName} requires immediate ` +
    "regional leadership attention."
  );
}

function requireActiveMembership(
  requestContext,
) {
  if (
    !requestContext?.authenticated ||
    !requestContext.membership ||
    requestContext.membership
      .status !== "active"
  ) {
    throw new Error(
      "Region workspace requires an active organization membership.",
    );
  }
}

function canOpenRegionWorkspace(
  requestContext,
) {
  return REGION_WORKSPACE_SCOPE_LEVELS.has(
    requestContext.membership
      ?.scopeLevel,
  );
}