import { locationHealth } from "../../data/locationHealth";
import {
  getLocationById,
} from "../repositories/locationRepository";

export function getLocationHealth({
  organizationId,
  locationId,
} = {}) {
  requireOrganizationId(organizationId);

  if (!locationId) {
    throw new Error(
      "Location health service requires a location ID.",
    );
  }

  const location = getLocationById({
    organizationId,
    locationId,
  });

  if (!location) {
    return null;
  }

  return locationHealth[location.id] ?? null;
}

export function getLocationHealthByIds({
  organizationId,
  locationIds,
} = {}) {
  requireOrganizationId(organizationId);

  if (!Array.isArray(locationIds)) {
    throw new Error(
      "Location health service requires an array of location IDs.",
    );
  }

  if (locationIds.length === 0) {
    return {};
  }

  return locationIds.reduce(
    (healthByLocation, locationId) => {
      const health = getLocationHealth({
        organizationId,
        locationId,
      });

      if (health) {
        healthByLocation[locationId] = health;
      }

      return healthByLocation;
    },
    {},
  );
}

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Location health service requires an organization ID.",
    );
  }
}