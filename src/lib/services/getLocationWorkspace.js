import {
  getLocationById,
} from "../repositories";

import {
  getSignalsByLocation,
} from "../repositories/signalRepository";

import {
  getAssessmentByLocation,
} from "../repositories/assessmentRepository";

import {
  getRecommendationByPriorityId,
} from "../repositories/recommendationRepository";

import {
  buildRecommendationContext,
} from "../intelligence/buildRecommendationContext";

import {
  getLocationTimeline,
} from "./getLocationTimeline";

import {
  getLocationHealth,
} from "./getLocationHealth";

import {
  getOperationalMemory,
} from "./getOperationalMemory";

import {
  getInvestigationContext,
} from "./getInvestigationContext";

import {
  getScopedWorkspaceData,
} from "./getScopedWorkspaceData";

export function getLocationWorkspace(
  requestContext,
  locationId,
) {
  requireActiveMembership(requestContext);

  const scoped =
    getScopedWorkspaceData(requestContext);

  const location = getLocationById({
    organizationId: scoped.organizationId,
    locationId,
  });

  if (!location) {
    return null;
  }

  const canAccessLocation =
    scoped.organization.locations.some(
      (accessibleLocation) =>
        accessibleLocation.id === location.id,
    );

  if (!canAccessLocation) {
    return null;
  }

  const locationSignals =
    getSignalsByLocation({
      organizationId: scoped.organizationId,
      locationId: location.id,
    });

  const locationPriorities =
    scoped.priorities.filter(
      (priority) =>
        priority.locationId === location.id,
    );

  const locationExecutionItems =
    scoped.executionItems.filter(
      (item) =>
        item.locationId === location.id,
    );

  const timeline = getLocationTimeline({
    organizationId: scoped.organizationId,
    locationId: location.id,
  });

  const assessment =
    getAssessmentByLocation({
      organizationId: scoped.organizationId,
      locationId: location.id,
    });

  const health = getLocationHealth({
    organizationId: scoped.organizationId,
    locationId: location.id,
  });

  const memory = getOperationalMemory({
    organizationId: scoped.organizationId,
    locationId: location.id,
  });

  const primaryPriority =
    [...locationPriorities].sort(
      (a, b) =>
        (b.priorityScore ?? 0) -
        (a.priorityScore ?? 0),
    )[0] ?? null;

  const recommendation =
    primaryPriority
      ? getRecommendationByPriorityId({
          organizationId:
            scoped.organizationId,
          priorityId: primaryPriority.id,
        })
      : null;

  const context =
    primaryPriority
      ? getInvestigationContext({
          organizationId:
            scoped.organizationId,
          priority: primaryPriority,
        })
      : null;

  const intelligence =
    primaryPriority
      ? buildRecommendationContext(
          primaryPriority,
          {
            recommendation,
            memory,
          },
        )
      : null;

  const assessmentWorkspace =
    assessment
      ? {
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
              assessment.evidence ??
              locationSignals[0]?.evidence ??
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
        }
      : null;

  return {
    user: requestContext.user,
    membership: requestContext.membership,

    location,

    overview: {
      health,
      assessment: assessmentWorkspace,
      memory,
    },

    operations: {
      signals: locationSignals,
      priorities: locationPriorities,
    },

    execution: {
      items: locationExecutionItems,
    },

    activity: {
      timeline,
    },

    counts: {
      signals: locationSignals.length,
      priorities: locationPriorities.length,
      executionItems:
        locationExecutionItems.length,
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
      "Location workspace requires an active organization membership.",
    );
  }
}