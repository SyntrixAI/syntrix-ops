import {
  resolveHierarchyEntity,
  getAncestors,
  getChildren,
  getDescendantLocations,
} from "./hierarchyEngine";

export function expandScope({
  organizationId,
  scope,
} = {}) {
  requireOrganizationId(organizationId);

  if (!scope?.level || !scope?.id) {
    return emptyScope();
  }

  const entity = resolveHierarchyEntity({
    organizationId,
    type: scope.level,
    id: scope.id,
  });

  if (!entity) {
    return emptyScope();
  }

  const ancestors = getAncestors({
    organizationId,
    entity,
  });

  const locations = getDescendantLocations({
    organizationId,
    entity,
  });

  return buildExpandedScope({
    organizationId,
    entity,
    ancestors,
    locations,
  });
}

function buildExpandedScope({
  organizationId,
  entity,
  ancestors,
  locations,
}) {
  const hierarchy = [...ancestors, entity];

  const descendants = getDescendants({
    organizationId,
    entity,
  });

  const accessibleEntities = [
    ...hierarchy,
    ...descendants,
  ];

  return {
    company:
      accessibleEntities.find(
        (item) => item.type === "company",
      ) ?? null,

    regions: uniqueById(
      accessibleEntities.filter(
        (item) => item.type === "region",
      ),
    ),

    districts: uniqueById(
      accessibleEntities.filter(
        (item) => item.type === "district",
      ),
    ),

    locations: uniqueById(locations),
  };
}

function getDescendants({
  organizationId,
  entity,
}) {
  const children = getChildren({
    organizationId,
    entity,
  });

  return children.flatMap((child) => [
    child,
    ...getDescendants({
      organizationId,
      entity: child,
    }),
  ]);
}

function emptyScope() {
  return {
    company: null,
    regions: [],
    districts: [],
    locations: [],
  };
}

function uniqueById(items) {
  return Array.from(
    new Map(
      items.map((item) => [
        `${item.type ?? "entity"}:${item.id}`,
        item,
      ]),
    ).values(),
  );
}

function requireOrganizationId(organizationId) {
  if (!organizationId) {
    throw new Error(
      "Scope engine requires an organization ID.",
    );
  }
}