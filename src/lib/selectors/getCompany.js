import { company } from "../../data/company";
import { regions } from "../../data/regions";

export function getCompany() {
  return {
    company,
    regions: regions.filter((region) => region.companyId === company.id),
  };
}