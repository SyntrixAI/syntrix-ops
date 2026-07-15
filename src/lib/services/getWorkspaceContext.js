import { company } from "../../data/company";
import { regions } from "../../data/regions";
import { districts } from "../../data/districts";
import {
  getLocationById,
  getPriorities,
} from "../repositories";

export function getWorkspaceContext({
  organizationId,
  type,
  id,
}) {
  if (!organizationId) {
    throw new Error(
      "Workspace context requires an organization ID.",
    );
  }

  if (type === "district") {
    return getDistrictContext(id);
  }

  if (type === "location") {
    return getLocationContext({
      organizationId,
      locationId: id,
    });
  }

  if (type === "investigation") {
    return getInvestigationContext({
      organizationId,
      investigationId: id,
    });
  }

  return {
    items: [{ label: company.name, href: "/" }],
  };
}

function getDistrictContext(id) {
  const district = districts.find(
    (district) => district.id === id,
  );

  if (!district) return null;

  const region = regions.find(
    (region) => region.id === district.regionId,
  );

  return {
    items: [
      { label: company.name, href: "/" },
      region && { label: region.name },
      {
        label: district.name,
        href: `/districts/${district.id}`,
      },
    ].filter(Boolean),
  };
}

function getLocationContext({
  organizationId,
  locationId,
}) {
  const location = getLocationById({
    organizationId,
    locationId,
  });

  if (!location) return null;

  return buildLocationContext(location);
}

function getInvestigationContext({
  organizationId,
  investigationId,
}) {
  const priority = getPriorities({ organizationId }).find(
    (priority) =>
      String(priority.id) === String(investigationId),
  );

  if (!priority) return null;

  const location = getLocationById({
    organizationId,
    locationId: priority.locationId,
  });

  if (!location) return null;

  const locationContext = buildLocationContext(location);

  return {
    items: [
      ...locationContext.items,
      {
        label: priority.title,
        href: `/operations/investigations/${priority.id}`,
      },
    ],
  };
}

function buildLocationContext(location) {
  const district = districts.find(
    (district) => district.id === location.districtId,
  );

  const region = district
    ? regions.find(
        (region) => region.id === district.regionId,
      )
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
    ].filter(Boolean),
  };
}