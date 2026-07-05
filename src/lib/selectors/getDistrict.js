import { company } from "../../data/company";
import { regions } from "../../data/regions";
import { districts } from "../../data/districts";
import { locations } from "../../data/locations";

export function getDistrict(id) {
  const district = districts.find(
    (district) => String(district.id) === String(id),
  );

  if (!district) return null;

  const region = regions.find((region) => region.id === district.regionId);

  return {
    district,
    region,
    company,
    locations: locations.filter(
      (location) => location.districtId === district.id,
    ),
  };
}