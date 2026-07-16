import { getLocationById } from "../repositories";
import {
  getSignalsByLocation,
} from "../repositories/signalRepository";
import {
  getAssessmentByLocation,
} from "../repositories/assessmentRepository";
import {
  getLocationTimeline,
} from "./getLocationTimeline";
import {
  getLocationHealth,
} from "./getLocationHealth";
import {
  getOperationalMemory,
} from "./getOperationalMemory";
import { expandScope } from "../engines";
import { getScopedWorkspaceData } from "./getScopedWorkspaceData";

export function getLocationWorkspace(user,locationId) {
  if (!user?.organizationId) {
    throw new Error(
      "Location workspace requires an organization user.",
    );
  }

  const location = getLocationById({
    organizationId: user.organizationId,
    locationId,
  });

  if (!location) {
    return null;
  }

  const accessible = expandScope({
    organizationId: user.organizationId,
    scope: user.scope,
  });

  const canAccessLocation = accessible.locations.some(
    (accessibleLocation) => accessibleLocation.id === location.id,
  );

  if (!canAccessLocation) return null;

  const locationSignals = getSignalsByLocation({
    organizationId: user.organizationId,
    locationId: location.id,
  });

  const scoped = getScopedWorkspaceData(user);

  const locationPriorities = scoped.priorities.filter(
    (priority) => priority.locationId === location.id,
  );

  const locationExecutionItems = scoped.executionItems.filter(
    (item) => item.locationId === location.id,
  );

  const timeline = getLocationTimeline({
    organizationId: user.organizationId,
    locationId: location.id,
  });

  const assessment = getAssessmentByLocation({
    organizationId: user.organizationId,
    locationId: location.id,
  });

  const health = getLocationHealth({
    organizationId: user.organizationId,
    locationId: location.id,
  });

  const memory = getOperationalMemory({
    organizationId: user.organizationId,
    locationId: location.id,
  });

  return {
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
    executionItems: locationExecutionItems.length,
  },
};
}