import {
  getAssessmentByLocation,
} from "../repositories/assessmentRepository";
import {
  getSignalById,
} from "../repositories/signalRepository";
import {
  getRecommendationByPriorityId,
} from "../repositories/recommendationRepository";
import {
  getInvestigationActivity,
} from "./getInvestigationActivity";
import {
  getInvestigationContext,
} from "./getInvestigationContext";
import {
  buildRecommendationContext,
} from "../intelligence/buildRecommendationContext";
import {
  getScopedWorkspaceData,
} from "./getScopedWorkspaceData";
import {
  getOperationalMemory,
} from "./getOperationalMemory";

export function getInvestigationWorkspace(
  requestContext,
  investigationId,
) {
  requireActiveMembership(requestContext);

  if (!investigationId) {
    return null;
  }

  const scoped =
    getScopedWorkspaceData(requestContext);

  const priority = scoped.priorities.find(
    (priority) =>
      String(priority.id) ===
      String(investigationId),
  );

  if (!priority) {
    return null;
  }

  const executionItem =
    scoped.executionItems.find(
      (item) =>
        String(item.priorityId) ===
        String(priority.id),
    ) ?? null;

  const relatedSignal = getSignalById({
    organizationId: scoped.organizationId,
    signalId: priority.id,
  });

  const signal =
    relatedSignal?.locationId ===
    priority.locationId
      ? relatedSignal
      : null;

  const assessment = getAssessmentByLocation({
    organizationId: scoped.organizationId,
    locationId: priority.locationId,
  });

  const recommendation =
    getRecommendationByPriorityId({
      organizationId: scoped.organizationId,
      priorityId: priority.id,
    });

  const memory = getOperationalMemory({
    organizationId: scoped.organizationId,
    locationId: priority.locationId,
  });

  const context = getInvestigationContext({
    organizationId: scoped.organizationId,
    priority,
  });

  const intelligence =
    buildRecommendationContext(priority, {
      recommendation,
      memory,
    });

  const activity = getInvestigationActivity({
    priority,
    signal,
    assessment,
    executionItem,
  });

  return {
    id: priority.id,

    user: requestContext.user,
    membership: requestContext.membership,

    situation: {
      priority,
      signal,
    },

    assessment: {
      assessment,

      recommendation:
        assessment?.recommendation ??
        null,

      analysis: {
        headline:
          context?.headline ?? null,

        explanation:
          context?.explanation ?? null,

        factors:
          context?.factors ?? [],

        evidence:
          assessment?.evidence ??
          signal?.evidence ??
          [],

        rootCauses:
          intelligence?.rootCauses ?? [],

        trends:
          intelligence?.trends ?? [],

        memory:
          intelligence?.memory
            ? [intelligence.memory]
            : [],

        memorySummary:
          intelligence?.memorySummary ??
          null,
      },
    },

    execution: {
      priority,
      recommendation,
      playbook: executionItem,
    },

    history: {
      timeline: {
        signal,
        assessment,
        priority,
        executionItem,
      },

      activity,
    },
  };
}

function requireActiveMembership(requestContext) {
  if (
    !requestContext?.authenticated ||
    !requestContext.membership ||
    requestContext.membership.status !==
      "active"
  ) {
    throw new Error(
      "Investigation workspace requires an active organization membership.",
    );
  }
}