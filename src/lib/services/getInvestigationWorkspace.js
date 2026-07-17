import {
  getAssessmentByLocation,
} from "../repositories/assessmentRepository";
import {
  getSignalById,
} from "../repositories/signalRepository";
import {
  getRecommendationByPriorityId,
} from "../repositories/recommendationRepository";
import { activityFeed } from "../../data/activityFeed";
import { contextInsights } from "../../data/contextInsights";
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

  const activity =
    activityFeed[priority.id] ?? [];

  const context =
    contextInsights[priority.id] ?? null;

  const intelligence =
    buildRecommendationContext(priority, {
      recommendation,
      memory,
    });

  return {
    id: priority.id,

    user: requestContext.user,
    membership: requestContext.membership,

    priority,
    assessment,
    executionItem,
    activity,
    context,
    intelligence,
    relatedSignal: scopedRelatedSignal,
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