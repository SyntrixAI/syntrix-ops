import {
  getDistrictRecords,
} from "../datasources";

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "District repository requires an organization ID.",
    );
  }
}

function getOrganizationDistricts(organizationId) {
  requireOrganizationId(organizationId);

  return getDistrictRecords().filter(
    (district) =>
      district.organizationId === organizationId,
  );
}

export function getDistricts({
  organizationId,
} = {}) {
  return getOrganizationDistricts(organizationId);
}

export function getDistrictById({
  organizationId,
  districtId,
} = {}) {
  if (!districtId) {
    throw new Error(
      "District repository requires a district ID.",
    );
  }

  return (
    getOrganizationDistricts(organizationId).find(
      (district) => district.id === districtId,
    ) ?? null
  );
}

export function getDistrictsByRegion({
  organizationId,
  regionId,
} = {}) {
  if (!regionId) {
    throw new Error(
      "District repository requires a region ID.",
    );
  }

  return getOrganizationDistricts(organizationId).filter(
    (district) =>
      district.regionId === regionId,
  );
}