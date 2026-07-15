import {
  getCompany,
} from "../repositories/companyRepository";

import {
  getRegionById,
  getRegionsByCompany,
} from "../repositories/regionRepository";

import {
  getDistrictById,
  getDistrictsByRegion,
} from "../repositories/districtRepository";

import {
  getLocationById,
  getLocationsByDistrict,
} from "../repositories/locationRepository";

const ENTITY_TYPES = {
  COMPANY: "company",
  REGION: "region",
  DISTRICT: "district",
  LOCATION: "location",
};

export function resolveHierarchyEntity({
  organizationId,
  type,
  id,
} = {}) {
  requireOrganizationId(organizationId);

  if (!type || !id) {
    return null;
  }

  if (type === ENTITY_TYPES.COMPANY) {
    const company = getCompany({ organizationId });

    if (!company || company.id !== id) {
      return null;
    }

    return withType(company, ENTITY_TYPES.COMPANY);
  }

  if (type === ENTITY_TYPES.REGION) {
    return withType(
      getRegionById({
        organizationId,
        regionId: id,
      }),
      ENTITY_TYPES.REGION,
    );
  }

  if (type === ENTITY_TYPES.DISTRICT) {
    return withType(
      getDistrictById({
        organizationId,
        districtId: id,
      }),
      ENTITY_TYPES.DISTRICT,
    );
  }

  if (type === ENTITY_TYPES.LOCATION) {
    return withType(
      getLocationById({
        organizationId,
        locationId: id,
      }),
      ENTITY_TYPES.LOCATION,
    );
  }

  return null;
}

export function getChildren({
  organizationId,
  entity,
} = {}) {
  requireOrganizationId(organizationId);

  if (!entity) {
    return [];
  }

  if (entity.type === ENTITY_TYPES.COMPANY) {
    return getRegionsByCompany({
      organizationId,
      companyId: entity.id,
    }).map((region) =>
      withType(region, ENTITY_TYPES.REGION),
    );
  }

  if (entity.type === ENTITY_TYPES.REGION) {
    return getDistrictsByRegion({
      organizationId,
      regionId: entity.id,
    }).map((district) =>
      withType(district, ENTITY_TYPES.DISTRICT),
    );
  }

  if (entity.type === ENTITY_TYPES.DISTRICT) {
    return getLocationsByDistrict({
      organizationId,
      districtId: entity.id,
    }).map((location) =>
      withType(location, ENTITY_TYPES.LOCATION),
    );
  }

  return [];
}

export function getParent({
  organizationId,
  entity,
} = {}) {
  requireOrganizationId(organizationId);

  if (!entity) {
    return null;
  }

  if (entity.type === ENTITY_TYPES.REGION) {
    return withType(
      getCompany({
        organizationId,
      }),
      ENTITY_TYPES.COMPANY,
    );
  }

  if (entity.type === ENTITY_TYPES.DISTRICT) {
    return withType(
      getRegionById({
        organizationId,
        regionId: entity.regionId,
      }),
      ENTITY_TYPES.REGION,
    );
  }

  if (entity.type === ENTITY_TYPES.LOCATION) {
    return withType(
      getDistrictById({
        organizationId,
        districtId: entity.districtId,
      }),
      ENTITY_TYPES.DISTRICT,
    );
  }

  return null;
}

export function getAncestors({
  organizationId,
  entity,
} = {}) {
  requireOrganizationId(organizationId);

  if (!entity) {
    return [];
  }

  const ancestors = [];
  let parent = getParent({
    organizationId,
    entity,
  });

  while (parent) {
    ancestors.unshift(parent);

    parent = getParent({
      organizationId,
      entity: parent,
    });
  }

  return ancestors;
}

export function getDescendantLocations({
  organizationId,
  entity,
} = {}) {
  requireOrganizationId(organizationId);

  if (!entity) {
    return [];
  }

  if (entity.type === ENTITY_TYPES.LOCATION) {
    const location = getLocationById({
      organizationId,
      locationId: entity.id,
    });

    return location
      ? [withType(location, ENTITY_TYPES.LOCATION)]
      : [];
  }

  if (entity.type === ENTITY_TYPES.DISTRICT) {
    return getLocationsByDistrict({
      organizationId,
      districtId: entity.id,
    }).map((location) =>
      withType(location, ENTITY_TYPES.LOCATION),
    );
  }

  const children = getChildren({
    organizationId,
    entity,
  });

  return children.flatMap((child) =>
    getDescendantLocations({
      organizationId,
      entity: child,
    }),
  );
}

export function isDescendant({
  organizationId,
  parent,
  child,
} = {}) {
  requireOrganizationId(organizationId);

  if (!parent || !child) {
    return false;
  }

  if (
    parent.type === child.type &&
    parent.id === child.id
  ) {
    return false;
  }

  const parentLocations = getDescendantLocations({
    organizationId,
    entity: parent,
  });

  if (child.type === ENTITY_TYPES.LOCATION) {
    return parentLocations.some(
      (location) => location.id === child.id,
    );
  }

  const childLocations = getDescendantLocations({
    organizationId,
    entity: child,
  });

  if (childLocations.length === 0) {
    return false;
  }

  return childLocations.every((childLocation) =>
    parentLocations.some(
      (parentLocation) =>
        parentLocation.id === childLocation.id,
    ),
  );
}

function withType(entity, type) {
  if (!entity) {
    return null;
  }

  return {
    ...entity,
    type,
  };
}

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Hierarchy engine requires an organization ID.",
    );
  }
}