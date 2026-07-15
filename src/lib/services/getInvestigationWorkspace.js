import { assessments } from "../../data/assessments";
import { signals } from "../../data/signals";
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

  const relatedSignal =
    signals.find(
      (signal) =>
        signal.organizationId ===
          user.organizationId &&
        String(signal.id) ===
          String(priority.id) &&
        signal.locationId === priority.locationId,
    ) ?? null;

  const assessment =
    assessments[priority.locationId] ?? null;

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
    relatedSignal,
    activity,
    context,
    intelligence,
  };
}

function requireOrganizationUser(user) {
  if (!user?.organizationId) {
    throw new Error(
      "Investigation workspace requires an organization user.",
    );
  }
}