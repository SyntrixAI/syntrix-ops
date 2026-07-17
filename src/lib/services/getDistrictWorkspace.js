import {
  getLocationHealthByIds,
} from "./getLocationHealth";
import {
  generateExecutiveMetrics,
  getAncestors,
  getDescendantLocations,
  resolveHierarchyEntity,
} from "../engines";
import { getScopedWorkspaceData } from "./getScopedWorkspaceData";

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

  const districtHealth =
    getLocationHealthByIds({
      organizationId: scoped.organizationId,
      locationIds: [...locationIds],
    });

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

  const metrics = generateExecutiveMetrics({
    locations,
    locationHealth: districtHealth,
    priorities: districtPriorities,
    executionItems: districtExecutionItems,
  });

  const executiveInsights = districtPriorities
    .flatMap((priority) =>
      (priority.insights ?? []).map(
        (insight) => ({
          ...insight,
          id: `${priority.id}-${insight.id}`,
          title: `${priority.location}: ${insight.title}`,
        }),
      ),
    )
    .slice(0, 5);

  const healthScores = Object.values(
    districtHealth,
  );

  const averageHealth =
    healthScores.length > 0
      ? Math.round(
          healthScores.reduce(
            (sum, health) =>
              sum + health.score,
            0,
          ) / healthScores.length,
        )
      : null;

  return {
    user: requestContext.user,
    membership: requestContext.membership,

    district,
    region,
    company,
    locations,

    overview: {
      health: {
        score: averageHealth,
        status: getDistrictHealthStatus(
          averageHealth,
        ),
        summary: getDistrictHealthSummary(
          district.name,
          averageHealth,
        ),
      },

      insights: executiveInsights,
    },

    metrics,

    operations: {
      priorities: districtPriorities,

      criticalPriorities:
        districtPriorities.filter(
          (priority) =>
            priority.priorityScore >= 90,
        ),
    },

    execution: {
      items: districtExecutionItems,
    },

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

function getDistrictHealthStatus(score) {
  if (score === null) return "Unknown";
  if (score >= 85) return "Healthy";
  if (score >= 70) return "Watch";
  if (score >= 50) return "At Risk";

  return "Critical";
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