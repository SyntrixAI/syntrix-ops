import { locations } from "../../data/locations";

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Location repository requires an organization ID.",
    );
  }
}

function getOrganizationLocations(organizationId) {
  requireOrganizationId(organizationId);

  return locations.filter(
    (location) =>
      location.organizationId === organizationId,
  );
}

export function getLocations({ organizationId } = {}) {
  return getOrganizationLocations(organizationId);
}

export function getLocationById({
  organizationId,
  locationId,
} = {}) {
  if (!locationId) {
    throw new Error(
      "Location repository requires a location ID.",
    );
  }

  return (
    getOrganizationLocations(organizationId).find(
      (location) => location.id === locationId,
    ) ?? null
  );
}

export function getLocationsByDistrict({
  organizationId,
  districtId,
} = {}) {
  if (!districtId) {
    throw new Error(
      "Location repository requires a district ID.",
    );
  }

  return getOrganizationLocations(organizationId).filter(
    (location) =>
      location.districtId === districtId,
  );
}