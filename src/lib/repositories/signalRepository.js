import {
  getSignalRecords,
} from "../datasources";

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Signal repository requires an organization ID.",
    );
  }
}

function getOrganizationSignals(organizationId) {
  requireOrganizationId(organizationId);

  return getSignalRecords().filter(
    (signal) =>
      signal.organizationId === organizationId,
  );
}

export function getSignals({
  organizationId,
} = {}) {
  return getOrganizationSignals(organizationId);
}

export function getSignalById({
  organizationId,
  signalId,
} = {}) {
  if (!signalId) {
    throw new Error(
      "Signal repository requires a signal ID.",
    );
  }

  return (
    getOrganizationSignals(organizationId).find(
      (signal) =>
        String(signal.id) === String(signalId),
    ) ?? null
  );
}

export function getSignalsByLocation({
  organizationId,
  locationId,
} = {}) {
  if (!locationId) {
    throw new Error(
      "Signal repository requires a location ID.",
    );
  }

  return getOrganizationSignals(
    organizationId,
  ).filter(
    (signal) =>
      signal.locationId === locationId,
  );
}

export function getSignalsByLocationIds({
  organizationId,
  locationIds,
} = {}) {
  requireOrganizationId(organizationId);

  if (!Array.isArray(locationIds)) {
    throw new Error(
      "Signal repository requires an array of location IDs.",
    );
  }

  if (locationIds.length === 0) {
    return [];
  }

  const accessibleLocationIds =
    new Set(locationIds);

  return getOrganizationSignals(
    organizationId,
  ).filter(
    (signal) =>
      accessibleLocationIds.has(
        signal.locationId,
      ),
  );
}