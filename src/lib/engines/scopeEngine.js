import { company } from "../../data/company";
import { regions } from "../../data/regions";
import { districts } from "../../data/districts";
import { locations } from "../../data/locations";

export function expandScope(scope) {
  if (!scope) {
    return emptyScope();
  }

  if (scope.level === "company") {
    return expandCompanyScope(scope.id);
  }

  if (scope.level === "region") {
    return expandRegionScope(scope.id);
  }

  if (scope.level === "district") {
    return expandDistrictScope(scope.id);
  }

  if (scope.level === "location") {
    return expandLocationScope(scope.id);
  }

  return emptyScope();
}

function expandCompanyScope(companyId) {
  if (company.id !== companyId) return emptyScope();

  return {
    company,
    regions,
    districts,
    locations,
  };
}

function expandRegionScope(regionId) {
  const region = regions.find((region) => region.id === regionId);

  if (!region) return emptyScope();

  const scopedDistricts = districts.filter(
    (district) => district.regionId === region.id,
  );

  const districtIds = scopedDistricts.map((district) => district.id);

  const scopedLocations = locations.filter((location) =>
    districtIds.includes(location.districtId),
  );

  return {
    company,
    regions: [region],
    districts: scopedDistricts,
    locations: scopedLocations,
  };
}

function expandDistrictScope(districtId) {
  const district = districts.find((district) => district.id === districtId);

  if (!district) return emptyScope();

  const region = regions.find((region) => region.id === district.regionId);

  return {
    company,
    regions: region ? [region] : [],
    districts: [district],
    locations: locations.filter(
      (location) => location.districtId === district.id,
    ),
  };
}

function expandLocationScope(locationId) {
  const location = locations.find((location) => location.id === locationId);

  if (!location) return emptyScope();

  return {
    company,
    regions: [],
    districts: [],
    locations: [location],
  };
}

function emptyScope() {
  return {
    company: null,
    regions: [],
    districts: [],
    locations: [],
  };
}