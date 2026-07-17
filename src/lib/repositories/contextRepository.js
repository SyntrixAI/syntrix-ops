import {
  getContextFactorRecords,
} from "../datasources";
import {
  getLocationById,
} from "./locationRepository";

export function getContextFactorsByLocation({
  organizationId,
  locationId,
} = {}) {
  if (!organizationId) {
    throw new Error(
      "Context repository requires an organization ID.",
    );
  }

  if (!locationId) {
    throw new Error(
      "Context repository requires a location ID.",
    );
  }

  const location = getLocationById({
    organizationId,
    locationId,
  });

  if (!location) {
    return null;
  }

  return (
    getContextFactorRecords()[location.id] ??
    null
  );
}