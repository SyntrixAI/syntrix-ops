import { recommendations } from "../../data/recommendations";
import { getPriorities } from "./priorityRepository";

export function getRecommendationByPriorityId({
  organizationId,
  priorityId,
} = {}) {
  requireOrganizationId(organizationId);

  if (!priorityId) {
    return null;
  }

  const priority = getPriorities({
    organizationId,
  }).find(
    (priority) =>
      String(priority.id) === String(priorityId),
  );

  if (!priority) {
    return null;
  }

  return recommendations[priority.id] ?? null;
}

export function getRecommendationsByPriorityIds({
  organizationId,
  priorityIds,
} = {}) {
  requireOrganizationId(organizationId);

  if (!Array.isArray(priorityIds)) {
    throw new Error(
      "Recommendation repository requires an array of priority IDs.",
    );
  }

  return priorityIds.reduce(
    (recommendationsByPriority, priorityId) => {
      const recommendation =
        getRecommendationByPriorityId({
          organizationId,
          priorityId,
        });

      if (recommendation) {
        recommendationsByPriority[priorityId] =
          recommendation;
      }

      return recommendationsByPriority;
    },
    {},
  );
}

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Recommendation repository requires an organization ID.",
    );
  }
}