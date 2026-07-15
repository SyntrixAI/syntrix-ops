import { assessments } from "../../data/assessments";
import {
  getLocationById,
} from "./locationRepository";

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Assessment repository requires an organization ID.",
    );
  }
}

export function getAssessmentByLocation({
  organizationId,
  locationId,
} = {}) {
  requireOrganizationId(organizationId);

  if (!locationId) {
    throw new Error(
      "Assessment repository requires a location ID.",
    );
  }

  const location = getLocationById({
    organizationId,
    locationId,
  });

  if (!location) {
    return null;
  }

  return assessments[location.id] ?? null;
}

export function getAssessmentsByLocationIds({
  organizationId,
  locationIds,
} = {}) {
  requireOrganizationId(organizationId);

  if (!Array.isArray(locationIds)) {
    throw new Error(
      "Assessment repository requires an array of location IDs.",
    );
  }

  if (locationIds.length === 0) {
    return {};
  }

  return locationIds.reduce(
    (assessmentsByLocation, locationId) => {
      const assessment = getAssessmentByLocation({
        organizationId,
        locationId,
      });

      if (assessment) {
        assessmentsByLocation[locationId] =
          assessment;
      }

      return assessmentsByLocation;
    },
    {},
  );
}