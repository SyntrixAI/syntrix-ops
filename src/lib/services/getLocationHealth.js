import {
  getLocationById,
} from "../repositories/locationRepository";
import {
  getSignalsByLocation,
} from "../repositories/signalRepository";
import {
  getPriorities,
} from "../repositories/priorityRepository";
import {
  getAssessmentByLocation,
} from "../repositories/assessmentRepository";
import {
  getExecutionItems,
} from "../repositories/executionRepository";
import {
  generateLocationHealth,
} from "../engines/healthEngine";

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

  const signals = getSignalsByLocation({
    organizationId,
    locationId,
  });

  const priorities = getPriorities({
    organizationId,
  }).filter(
    (priority) =>
      priority.locationId === locationId,
  );

  const assessment = getAssessmentByLocation({
    organizationId,
    locationId,
  });

  const assessments = assessment
    ? {
        [locationId]: assessment,
      }
    : {};

  const executionItems = getExecutionItems({
    organizationId,
  }).filter(
    (item) =>
      item.locationId === locationId,
  );

  const healthByLocation =
    generateLocationHealth({
      locations: [location],
      signals,
      assessments,
      priorities,
      executionItems,
    });

  return healthByLocation[location.id] ?? null;
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