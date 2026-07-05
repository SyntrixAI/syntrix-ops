import { company } from "../../data/company";
import { regions } from "../../data/regions";
import { districts } from "../../data/districts";
import { locations } from "../../data/locations";
import { priorities } from "../../data/priorities";

export function getWorkspaceContext({ type, id }) {
  if (type === "district") {
    return getDistrictContext(id);
  }

  if (type === "location") {
    return getLocationContext(id);
  }

  if (type === "investigation") {
    return getInvestigationContext(id);
  }

  return {
    items: [{ label: company.name, href: "/" }],
  };
}

function getDistrictContext(id) {
  const district = districts.find((district) => district.id === id);

  if (!district) return null;

  const region = regions.find((region) => region.id === district.regionId);

  return {
    items: [
      { label: company.name, href: "/" },
      region && { label: region.name },
      { label: district.name, href: `/districts/${district.id}` },
    ].filter(Boolean),
  };
}

function getLocationContext(id) {
  const location = locations.find((location) => location.id === id);

  if (!location) return null;

  const district = districts.find(
    (district) => district.id === location.districtId,
  );

  const region = district
    ? regions.find((region) => region.id === district.regionId)
    : null;

  return {
    items: [
      { label: company.name, href: "/" },
      region && { label: region.name },
      district && {
        label: district.name,
        href: `/districts/${district.id}`,
      },
      { label: location.name, href: `/locations/${location.id}` },
    ].filter(Boolean),
  };
}

function getInvestigationContext(id) {
  const priority = priorities.find(
    (priority) => String(priority.id) === String(id),
  );

  if (!priority) return null;

  const location = locations.find(
    (location) => location.id === priority.locationId,
  );

  if (!location) return null;

  const district = districts.find(
    (district) => district.id === location.districtId,
  );

  const region = district
    ? regions.find((region) => region.id === district.regionId)
    : null;

  return {
    items: [
      { label: company.name, href: "/" },
      region && { label: region.name },
      district && {
        label: district.name,
        href: `/districts/${district.id}`,
      },
      {
        label: location.name,
        href: `/locations/${location.id}`,
      },
      {
        label: priority.title,
        href: `/operations/investigations/${priority.id}`,
      },
    ].filter(Boolean),
  };
}