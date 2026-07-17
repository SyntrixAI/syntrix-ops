import {
  getRecommendationRecords,
} from "../datasources";
import {
  getPriorityById,
} from "./priorityRepository";

export function getRecommendationByPriorityId({
  organizationId,
  priorityId,
} = {}) {
  requireOrganizationId(organizationId);

  if (!priorityId) {
    return null;
  }

  const priority = getPriorityById({
    organizationId,
    priorityId,
  });

  if (!priority) {
    return null;
  }

  return (
    getRecommendationRecords()[priority.id] ?? null
  );
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