import { regions } from "../../data/regions";

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Region repository requires an organization ID.",
    );
  }
}

function getOrganizationRegions(organizationId) {
  requireOrganizationId(organizationId);

  return regions.filter(
    (region) => region.organizationId === organizationId,
  );
}

export function getRegions({ organizationId } = {}) {
  return getOrganizationRegions(organizationId);
}

export function getRegionById({
  organizationId,
  regionId,
} = {}) {
  if (!regionId) {
    throw new Error(
      "Region repository requires a region ID.",
    );
  }

  return (
    getOrganizationRegions(organizationId).find(
      (region) => region.id === regionId,
    ) ?? null
  );
}

export function getRegionsByCompany({
  organizationId,
  companyId,
} = {}) {
  if (!companyId) {
    throw new Error(
      "Region repository requires a company ID.",
    );
  }

  return getOrganizationRegions(organizationId).filter(
    (region) => region.parentId === companyId,
  );
}