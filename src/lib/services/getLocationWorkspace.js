import { getLocationById } from "../repositories";
import { getSignalsByLocation, } from "../repositories/signalRepository";
import { getAssessmentByLocation, } from "../repositories/assessmentRepository";
import { getLocationTimeline, } from "./getLocationTimeline";
import { getLocationHealth, } from "./getLocationHealth";
import { getOperationalMemory, } from "./getOperationalMemory";
import { getScopedWorkspaceData } from "./getScopedWorkspaceData";

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

  return {
    user: requestContext.user,
    membership: requestContext.membership,

    location,

    overview: {
      health,
      assessment,
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
    requestContext.membership.status !== "active"
  ) {
    throw new Error(
      "Location workspace requires an active organization membership.",
    );
  }
}