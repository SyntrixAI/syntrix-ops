import { buildDecisionWorkspaceCore, } from "./buildDecisionWorkspaceCore";
import { buildExecutiveDecision, } from "./buildExecutiveDecision";
import { getScopedWorkspaceData } from "./getScopedWorkspaceData";
import {
  generateEntityMetrics,
  generateNarrative,
  resolveHierarchyEntity,
  getChildren,
  getDescendantLocations,
  getScopedPriorities,
} from "../engines";

const ORGANIZATION_WORKSPACE_SCOPE_LEVELS =
  new Set(["company"]);

export function getOrganizationWorkspace(requestContext) {
  requireActiveMembership(requestContext);

  if (!canOpenOrganizationWorkspace(requestContext)) {
    return null;
  }

  const scoped = getScopedWorkspaceData(requestContext);
  const accessible = scoped.organization;
  const scopedPriorities = scoped.priorities;
  const scopedExecutionItems = scoped.executionItems;

  const core =
    buildDecisionWorkspaceCore({
      organizationId: scoped.organizationId,

      locations: accessible.locations,

      priorities: scopedPriorities,

      assessments: scoped.assessments,

      recommendations: scoped.recommendations,

      executionItems: scopedExecutionItems,

      operationalMemory: scoped.operationalMemory,
    });

  const {
    metrics,
    portfolio,
    operations,
    execution,
  } = core;

  const primaryPortfolioDecision =
    portfolio.focus
      ?.primaryDecision ??
    null;

  const primaryPriority =
    primaryPortfolioDecision
      ? scopedPriorities.find(
          (priority) =>
            priority.id ===
            primaryPortfolioDecision
              .priorityId,
        )
      : null;

  const executiveDecision =
    primaryPriority
      ? buildExecutiveDecision({
          priority:
            primaryPriority,

          portfolioDecision:
            primaryPortfolioDecision,

          assessments:
            scoped.assessments,

          recommendations:
            scoped.recommendations,

          executionItems:
            scopedExecutionItems,

          operationalMemory:
            scoped.operationalMemory,
        })
      : null;

  const entities = getOrganizationEntities({
    organizationId: scoped.organizationId,
    scope: scoped.scope,
    metrics,
    priorities: scopedPriorities,
  });
  

  return {
    user: requestContext.user,
    membership: requestContext.membership,
    scope: accessible,

    overview: {
    health: {
      score: metrics.operationalHealth,

      status: metrics.healthStatus,

      summary: getOrganizationHealthSummary(
          scoped.scope,
          metrics,
        ),
    },

    insights: core.overview.insights,
  },

    metrics,

    portfolio,

    executiveDecision,

    operations,

    execution,

    organization: {
      company: accessible.company,
      regions: accessible.regions,
      districts: accessible.districts,
      locations: accessible.locations,
      entities,
    },
  };
}

function getOrganizationHealthSummary(scope, metrics) {
  const label = getScopeLabel(scope);

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

function getScopeLabel(scope) {
  if (!scope) return "This organization";

  if (scope.level === "company") return "The organization";
  if (scope.level === "region") return "This region";
  if (scope.level === "district") return "This district";
  if (scope.level === "location") return "This location";

  return "This organization";
}

function getOrganizationEntities({
  organizationId,
  scope,
  metrics,
  priorities,
}) {
  const currentEntity = resolveHierarchyEntity({
    organizationId,
    type: scope.level,
    id: scope.id,
  });

  if (!currentEntity) {
    return [];
  }

  const children = getChildren({
    organizationId,
    entity: currentEntity,
  });

  const entities =
    children.length > 0
      ? children
      : [currentEntity];

  return entities.map((entity) => {
    const descendantLocations =
      getDescendantLocations({
        organizationId,
        entity,
      });

    const locationIds = descendantLocations.map(
      (location) => location.id,
    );

    const entityPriorities = getScopedPriorities(
      priorities,
      locationIds,
    );

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

function getEntityHref(entity) {
  if (entity.type === "region") {
    return `/regions/${entity.id}`;
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

function requireActiveMembership(requestContext) {
  if (
    !requestContext?.authenticated ||
    !requestContext.membership ||
    requestContext.membership.status !== "active"
  ) {
    throw new Error(
      "Organization workspace requires an active organization membership.",
    );
  }
}

function canOpenOrganizationWorkspace(requestContext) {
  return ORGANIZATION_WORKSPACE_SCOPE_LEVELS.has(
    requestContext.membership?.scopeLevel,
  );
}