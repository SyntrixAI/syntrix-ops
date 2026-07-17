import {
  getLocationHealthByIds,
} from "./getLocationHealth";
import { generateExecutiveMetrics } from "../engines";
import { getScopedWorkspaceData } from "./getScopedWorkspaceData";

export function getDailyBrief(requestContext) {
  const scoped = getScopedWorkspaceData(requestContext);
  const accessible = scoped.organization;
  const scopedPriorities = scoped.priorities;
  const scopedExecutionItems = scoped.executionItems;

  const scopedHealth = getLocationHealthByIds({
    organizationId: scoped.organizationId,
    locationIds: accessible.locations.map(
      (location) => location.id,
    ),
  });

  const metrics = generateExecutiveMetrics({
    locations: accessible.locations,
    locationHealth: scopedHealth,
    priorities: scopedPriorities,
    executionItems: scopedExecutionItems,
  });

  const topPriority = scopedPriorities[0];

  const executiveInsights = scopedPriorities
    .flatMap((priority) =>
      (priority.insights ?? []).map((insight) => ({
        ...insight,
        id: `${priority.id}-${insight.id}`,
        title: `${priority.location}: ${insight.title}`,
      })),
    )
    .slice(0, 3);

  const criticalInvestigations = scopedPriorities.filter(
    (priority) => priority.severity === "critical",
  );

  return {
    user: requestContext.user,
    membership: requestContext.membership,
    scope: accessible,

    health: {
      score: metrics.operationalHealth,
      status: metrics.healthStatus,
      summary: getBriefHealthSummary(
        scoped.scope,
        metrics,
      ),
    },

    metrics,

    topDecision: topPriority,

    executiveInsights,

    criticalInvestigations,

    executionQueue: scopedExecutionItems.slice(0, 5),
  };
}

function getBriefHealthSummary(scope, metrics) {
  const scopeLabel = getScopeLabel(scope);

  if (metrics.operationalHealth === null) {
    return `${scopeLabel} does not have enough operational data yet.`;
  }

  if (metrics.operationalHealth >= 85) {
    return `${scopeLabel} is operating within healthy thresholds.`;
  }

  if (metrics.operationalHealth >= 70) {
    return `${scopeLabel} is stable but has operational signals worth reviewing.`;
  }

  if (metrics.operationalHealth >= 50) {
    return `${scopeLabel} has active operational risk requiring leadership attention.`;
  }

  return `${scopeLabel} requires immediate operational attention.`;
}

function getScopeLabel(scope) {
  if (!scope) return "This workspace";

  if (scope.level === "company") return "The company";
  if (scope.level === "region") return "This region";
  if (scope.level === "district") return "This district";
  if (scope.level === "location") return "This location";

  return "This workspace";
}