import {
  getLocationHealthByIds,
} from "./getLocationHealth";
import { generateExecutiveMetrics } from "../engines";
import { getScopedWorkspaceData } from "./getScopedWorkspaceData";

export function getDailyBrief(user) {
  const scoped = getScopedWorkspaceData(user);
  const accessible = scoped.organization;
  const scopedPriorities = scoped.priorities;
  const scopedExecutionItems = scoped.executionItems;

  const scopedHealth = getLocationHealthByIds({
    organizationId: user.organizationId,
    locationIds:
      scoped.organization.locations.map(
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
    (priority) => priority.priorityScore >= 90,
  );

  return {
    user,

    scope: accessible,

    health: {
      score: metrics.operationalHealth,
      status: metrics.healthStatus,
      summary: getBriefHealthSummary(user, metrics),
    },

    metrics,

    topDecision: topPriority,

    executiveInsights,

    criticalInvestigations,

    executionQueue: scopedExecutionItems.slice(0, 5),
  };
}

function getBriefHealthSummary(user, metrics) {
  const scopeLabel = getScopeLabel(user);

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

function getScopeLabel(user) {
  if (!user?.scope) return "This workspace";

  if (user.scope.level === "company") return "The company";
  if (user.scope.level === "region") return "This region";
  if (user.scope.level === "district") return "This district";
  if (user.scope.level === "location") return "This location";

  return "This workspace";
}