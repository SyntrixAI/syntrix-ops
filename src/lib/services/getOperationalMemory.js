import { operationalMemory } from "../../data/operationalMemory";
import {
  getLocationById,
} from "../repositories/locationRepository";

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

  return operationalMemory[location.id] ?? null;
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