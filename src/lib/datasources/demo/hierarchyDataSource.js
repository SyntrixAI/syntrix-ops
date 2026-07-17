import { company } from "../../../data/company";
import { regions } from "../../../data/regions";
import { districts } from "../../../data/districts";
import { locations } from "../../../data/locations";

export function getCompanyRecords() {
  return company ? [company] : [];
}

export function getRegionRecords() {
  return regions;
}

export function getDistrictRecords() {
  return districts;
}

export function getLocationRecords() {
  return locations;
}