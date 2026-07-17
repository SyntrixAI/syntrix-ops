import { getScopedWorkspaceData } from "./getScopedWorkspaceData";
import { generateNarrative } from "../engines";

export function getOperationsWorkspace(requestContext) {
  const scoped = getScopedWorkspaceData(requestContext);

  const priorities = scoped.priorities;

  const criticalPriorities = priorities.filter(
    (priority) => priority.severity === "critical",
  );

  const monitoringPriorities = priorities.filter(
    (priority) => priority.status === "monitoring",
  );

  const executiveInsights = priorities
    .flatMap((priority) =>
      (priority.insights ?? []).map((insight) => ({
        ...insight,
        id: `${priority.id}-${insight.id}`,
        title: `${priority.location}: ${insight.title}`,
      })),
    )
    .slice(0, 3);

  const narrative = generateNarrative({
    name: "Operations",
    metrics: {
      healthStatus:
        criticalPriorities.length > 0
          ? "Critical"
          : priorities.length > 0
            ? "Watch"
            : "Healthy",
      estimatedRecovery: priorities.reduce(
        (sum, priority) => sum + (priority.estimatedImpact ?? 0),
        0,
      ),
      activePriorities: priorities.length,
      criticalPriorities: criticalPriorities.length,
    },
    priorities,
    action: {
      label: "Review Operations",
      href: "/operations",
    },
  });

  return {
    user: requestContext.user,
    membership: requestContext.membership,
    scope: scoped.organization,

    overview: {
      insights: executiveInsights,
      narrative,
    },

    metrics: {
      activePriorities: priorities.length,
      criticalPriorities: criticalPriorities.length,
      monitoring: monitoringPriorities.length,
      estimatedRecovery: priorities.reduce(
        (sum, priority) => sum + (priority.estimatedImpact ?? 0),
        0,
      ),
    },

    operations: {
      priorities,
      criticalPriorities,
      monitoringPriorities,
    },
  };
}