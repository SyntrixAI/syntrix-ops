import { getLocationById } from "../repositories";
import {
  getSignalsByLocation,
} from "../repositories/signalRepository";
import { assessments } from "../../data/assessments";
import { liveTimeline } from "../../data/liveTimeline";
import { locationHealth } from "../../data/locationHealth";
import { operationalMemory } from "../../data/operationalMemory";
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

  if (!location) return null;

  if (!user?.organizationId) {
    throw new Error(
      "Location workspace requires an organization user.",
    );
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

  const locationTimeline = liveTimeline.filter(
    (event) => event.locationId === location.id
  );

  return {
  location,

  overview: {
    health: locationHealth[location.id],
    assessment: assessments[location.id],
    memory: operationalMemory[location.id],
  },

  operations: {
    signals: locationSignals,
    priorities: locationPriorities,
  },

  execution: {
    items: locationExecutionItems,
  },

  activity: {
    timeline: locationTimeline,
  },

  counts: {
    signals: locationSignals.length,
    priorities: locationPriorities.length,
    executionItems: locationExecutionItems.length,
  },
};
}