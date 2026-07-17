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
import { buildRecommendationContext } from "../intelligence/buildRecommendationContext";
import { getScopedWorkspaceData } from "./getScopedWorkspaceData";
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

  const scopedRelatedSignal =
    relatedSignal?.locationId ===
    priority.locationId
      ? relatedSignal
      : null;

  const assessment = getAssessmentByLocation({
    organizationId: scoped.organizationId,
    locationId: priority.locationId,
  });

  const memory = getOperationalMemory({
    organizationId: scoped.organizationId,
    locationId: priority.locationId,
  });

  const recommendation =
    getRecommendationByPriorityId({
      organizationId: scoped.organizationId,
      priorityId: priority.id,
    });

  const activity = getInvestigationActivity({
    priority,
    signal: scopedRelatedSignal,
    assessment,
    executionItem,
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

  return {
    id: priority.id,

    user: requestContext.user,
    membership: requestContext.membership,

    header: {
      priority,
      signal: scopedRelatedSignal,
    },

    assessmentSection: {
      assessment,
      context,
      intelligence,
    },

    evidenceSection: {
      assessment,
      signal: scopedRelatedSignal,
    },

    timelineSection: {
      signal: scopedRelatedSignal,
      assessment,
      priority,
      executionItem,
    },

    executionSection: {
      recommendation,
      executionItem,
      priority,
    },

    activitySection: {
      activity,
    },
  };
  }

function requireActiveMembership(requestContext) {
  if (
    !requestContext?.authenticated ||
    !requestContext.membership ||
    requestContext.membership.status !== "active"
  ) {
    throw new Error(
      "Investigation workspace requires an active organization membership.",
    );
  }
}