import { company } from "../../data/company";
import { regions } from "../../data/regions";
import { districts } from "../../data/districts";

export function getRegion(id) {
  const region = regions.find((region) => String(region.id) === String(id));

  if (!region) return null;

  return {
    region,
    company,
    districts: districts.filter(
      (district) => district.regionId === region.id,
    ),
  };
}