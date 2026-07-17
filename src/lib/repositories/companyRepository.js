import {
  getCompanyRecords,
} from "../datasources";

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Company repository requires an organization ID.",
    );
  }
}

function getOrganizationCompany(organizationId) {
  requireOrganizationId(organizationId);

  return (
    getCompanyRecords().find(
      (company) =>
        company.organizationId === organizationId,
    ) ?? null
  );
}

export function getCompany({
  organizationId,
} = {}) {
  return getOrganizationCompany(organizationId);
}

export function getCompanyById({
  organizationId,
  companyId,
} = {}) {
  requireOrganizationId(organizationId);

  if (!companyId) {
    throw new Error(
      "Company repository requires a company ID.",
    );
  }

  const company =
    getOrganizationCompany(organizationId);

  if (!company || company.id !== companyId) {
    return null;
  }

  return company;
}