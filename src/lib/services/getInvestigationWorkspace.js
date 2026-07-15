import {
  getAssessmentByLocation,
} from "../repositories/assessmentRepository";
import {
  getSignalById,
} from "../repositories/signalRepository";
import { activityFeed } from "../../data/activityFeed";
import { contextInsights } from "../../data/contextInsights";
import { buildRecommendationContext } from "../intelligence/buildRecommendationContext";
import { getScopedWorkspaceData } from "./getScopedWorkspaceData";

export function getInvestigationWorkspace(
  user,
  investigationId,
) {
  requireOrganizationUser(user);

  if (!investigationId) {
    return null;
  }

  const scoped = getScopedWorkspaceData(user);

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
    organizationId: user.organizationId,
    signalId: priority.id,
  });

  const scopedRelatedSignal =
    relatedSignal?.locationId ===
    priority.locationId
      ? relatedSignal
      : null;

  const assessment = getAssessmentByLocation({
    organizationId: user.organizationId,
    locationId: priority.locationId,
  });

  const activity =
    activityFeed[priority.id] ?? [];

  const context =
    contextInsights[priority.id] ?? null;

  const intelligence =
    buildRecommendationContext(priority);

  return {
    id: priority.id,
    priority,
    assessment,
    executionItem,
    activity,
    context,
    intelligence,
    relatedSignal: scopedRelatedSignal,
  };
}

function requireOrganizationUser(user) {
  if (!user?.organizationId) {
    throw new Error(
      "Investigation workspace requires an organization user.",
    );
  }
}