import {
  getAncestors,
  resolveHierarchyEntity,
} from "../engines/hierarchyEngine";

import {
  getLocationById,
} from "../repositories/locationRepository";

import {
  getPriorities,
} from "../repositories/priorityRepository";

export function getWorkspaceContext({
  organizationId,
  type,
  id,
} = {}) {
  requireOrganizationId(organizationId);

  if (!type || !id) {
    return null;
  }

  if (type === "investigation") {
    return getInvestigationContext({
      organizationId,
      investigationId: id,
    });
  }

  return getHierarchyContext({
    organizationId,
    type,
    id,
  });
}

function getHierarchyContext({
  organizationId,
  type,
  id,
}) {
  const entity = resolveHierarchyEntity({
    organizationId,
    type,
    id,
  });

  if (!entity) {
    return null;
  }

  const ancestors = getAncestors({
    organizationId,
    entity,
  });

  return {
    items: buildBreadcrumbItems([
      ...ancestors,
      entity,
    ]),
  };
}

function getInvestigationContext({
  organizationId,
  investigationId,
}) {
  const priority = getPriorities({
    organizationId,
  }).find(
    (priority) =>
      String(priority.id) ===
      String(investigationId),
  );

  if (!priority) {
    return null;
  }

  const location = getLocationById({
    organizationId,
    locationId: priority.locationId,
  });

  if (!location) {
    return null;
  }

  const ancestors = getAncestors({
    organizationId,
    entity: {
      ...location,
      type: "location",
    },
  });

  return {
    items: [
      ...buildBreadcrumbItems([
        ...ancestors,
        {
          ...location,
          type: "location",
        },
      ]),
      {
        label: priority.title,
        href:
          `/operations/investigations/${priority.id}`,
      },
    ],
  };
}

function buildBreadcrumbItems(entities) {
  return entities
    .map((entity) => {
      const href = getEntityHref(entity);

      if (!href) {
        return {
          label: entity.name,
        };
      }

      return {
        label: entity.name,
        href,
      };
    })
    .filter((item) => item.label);
}

function getEntityHref(entity) {
  if (entity.type === "company") {
    return "/organization";
  }

  if (entity.type === "district") {
    return `/districts/${entity.id}`;
  }

  if (entity.type === "location") {
    return `/locations/${entity.id}`;
  }

  // Region workspace does not exist yet.
  if (entity.type === "region") {
    return null;
  }

  return null;
}

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Workspace context requires an organization ID.",
    );
  }
}