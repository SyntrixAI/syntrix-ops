import { company } from "../../data/company";

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Company repository requires an organization ID.",
    );
  }
}

export function getCompany({ organizationId } = {}) {
  requireOrganizationId(organizationId);

  if (company.organizationId !== organizationId) {
    return null;
  }

  return company;
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

  if (
    company.organizationId !== organizationId ||
    company.id !== companyId
  ) {
    return null;
  }

  return company;
}