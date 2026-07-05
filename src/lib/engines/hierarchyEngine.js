import { company } from "../../data/company";
import { regions } from "../../data/regions";
import { districts } from "../../data/districts";
import { locations } from "../../data/locations";

export function getChildren(entity) {
  if (!entity) return [];

  if (entity.type === "company") {
    return regions.map((region) => ({
      ...region,
      type: "region",
    }));
  }

  if (entity.type === "region") {
    return districts
      .filter((district) => district.regionId === entity.id)
      .map((district) => ({
        ...district,
        type: "district",
      }));
  }

  if (entity.type === "district") {
    return locations
      .filter((location) => location.districtId === entity.id)
      .map((location) => ({
        ...location,
        type: "location",
      }));
  }

  return [];
}

export function getParent(entity) {
  if (!entity) return null;

  if (entity.type === "region") {
    return {
      ...company,
      type: "company",
    };
  }

  if (entity.type === "district") {
    const region = regions.find((region) => region.id === entity.regionId);

    return region
      ? {
          ...region,
          type: "region",
        }
      : null;
  }

  if (entity.type === "location") {
    const district = districts.find(
      (district) => district.id === entity.districtId,
    );

    return district
      ? {
          ...district,
          type: "district",
        }
      : null;
  }

  return null;
}

export function getAncestors(entity) {
  const ancestors = [];

  let parent = getParent(entity);

  while (parent) {
    ancestors.unshift(parent);
    parent = getParent(parent);
  }

  return ancestors;
}

export function getDescendantLocations(entity) {
  if (!entity) return [];

  if (entity.type === "company") {
    return locations;
  }

  if (entity.type === "region") {
    const childDistricts = districts.filter(
      (district) => district.regionId === entity.id,
    );

    const districtIds = childDistricts.map((district) => district.id);

    return locations.filter((location) =>
      districtIds.includes(location.districtId),
    );
  }

  if (entity.type === "district") {
    return locations.filter(
      (location) => location.districtId === entity.id,
    );
  }

  if (entity.type === "location") {
    return [entity];
  }

  return [];
}

export function isDescendant(parent, child) {
  if (!parent || !child) return false;

  const descendants = getDescendantLocations(parent);

  if (child.type === "location") {
    return descendants.some((location) => location.id === child.id);
  }

  const childLocations = getDescendantLocations(child);

  return childLocations.every((location) =>
    descendants.some((descendant) => descendant.id === location.id),
  );
}