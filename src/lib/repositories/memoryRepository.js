import {
  getMemorySnapshotRecords,
} from "../datasources";
import {
  getLocationById,
} from "./locationRepository";

export function getMemorySnapshotsByLocation({
  organizationId,
  locationId,
} = {}) {
  if (!organizationId) {
    throw new Error(
      "Memory repository requires an organization ID.",
    );
  }

  if (!locationId) {
    throw new Error(
      "Memory repository requires a location ID.",
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
    getMemorySnapshotRecords()[location.id] ??
    null
  );
}