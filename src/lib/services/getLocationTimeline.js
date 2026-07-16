import { liveTimeline } from "../../data/liveTimeline";
import {
  getLocationById,
} from "../repositories/locationRepository";

export function getLocationTimeline({
  organizationId,
  locationId,
} = {}) {
  requireOrganizationId(organizationId);

  if (!locationId) {
    throw new Error(
      "Location timeline service requires a location ID.",
    );
  }

  const location = getLocationById({
    organizationId,
    locationId,
  });

  if (!location) {
    return [];
  }

  return liveTimeline.filter(
    (event) =>
      event.locationId === location.id,
  );
}

export function getLocationTimelinesByIds({
  organizationId,
  locationIds,
} = {}) {
  requireOrganizationId(organizationId);

  if (!Array.isArray(locationIds)) {
    throw new Error(
      "Location timeline service requires an array of location IDs.",
    );
  }

  if (locationIds.length === 0) {
    return {};
  }

  return locationIds.reduce(
    (timelinesByLocation, locationId) => {
      const timeline = getLocationTimeline({
        organizationId,
        locationId,
      });

      if (timeline.length > 0) {
        timelinesByLocation[locationId] =
          timeline;
      }

      return timelinesByLocation;
    },
    {},
  );
}

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Location timeline service requires an organization ID.",
    );
  }
}