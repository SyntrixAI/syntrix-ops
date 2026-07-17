import {
  generateOperationalMemory,
} from "../engines/memoryEngine";
import {
  getLocationById,
} from "../repositories/locationRepository";
import {
  getSignalsByLocation,
} from "../repositories/signalRepository";
import {
  getPrioritiesByLocation,
} from "../repositories/priorityRepository";
import {
  getMemorySnapshotsByLocation,
} from "../repositories/memoryRepository";
import {
  getLocationHealth,
} from "./getLocationHealth";

export function getOperationalMemory({
  organizationId,
  locationId,
} = {}) {
  requireOrganizationId(organizationId);

  if (!locationId) {
    throw new Error(
      "Operational memory service requires a location ID.",
    );
  }

  const location = getLocationById({
    organizationId,
    locationId,
  });

  if (!location) {
    return null;
  }

  const health = getLocationHealth({
    organizationId,
    locationId,
  });

  const signals = getSignalsByLocation({
    organizationId,
    locationId,
  });

  const priorities = getPrioritiesByLocation({
    organizationId,
    locationId,
  });

  const snapshots =
    getMemorySnapshotsByLocation({
      organizationId,
      locationId,
    });

  const memoryByLocation =
    generateOperationalMemory({
      locations: [location],

      locationHealth: health
        ? {
            [location.id]: health,
          }
        : {},

      signals,
      priorities,

      memorySnapshots: snapshots
        ? {
            [location.id]: snapshots,
          }
        : {},
    });

  return memoryByLocation[location.id] ?? null;
}

export function getOperationalMemoryByLocationIds({
  organizationId,
  locationIds,
} = {}) {
  requireOrganizationId(organizationId);

  if (!Array.isArray(locationIds)) {
    throw new Error(
      "Operational memory service requires an array of location IDs.",
    );
  }

  if (locationIds.length === 0) {
    return {};
  }

  return locationIds.reduce(
    (memoryByLocation, locationId) => {
      const memory = getOperationalMemory({
        organizationId,
        locationId,
      });

      if (memory) {
        memoryByLocation[locationId] = memory;
      }

      return memoryByLocation;
    },
    {},
  );
}

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Operational memory service requires an organization ID.",
    );
  }
}