import {
  expandScope,
  getScopedLocationIds,
  getScopedPriorities,
  getScopedExecutionItems,
} from "../engines";

import {
  getPriorities,
  getExecutionItems,
} from "../repositories";

export function getScopedWorkspaceData(requestContext) {
  requireActiveMembership(requestContext);

  const { membership } = requestContext;

  const scope = {
    level: membership.scopeLevel,
    id: membership.scopeEntityId,
  };

  const organization = expandScope({
    organizationId: membership.organizationId,
    scope,
  });

  const locationIds = getScopedLocationIds(organization);

  const organizationPriorities = getPriorities({
    organizationId: membership.organizationId,
  });

  const organizationExecutionItems = getExecutionItems({
    organizationId: membership.organizationId,
  });

  return {
    organizationId: membership.organizationId,
    organization,
    scope,
    locationIds,

    priorities: getScopedPriorities(
      organizationPriorities,
      locationIds,
    ),

    executionItems: getScopedExecutionItems(
      organizationExecutionItems,
      locationIds,
    ),
  };
}

function requireActiveMembership(requestContext) {
  if (
    !requestContext?.authenticated ||
    !requestContext.membership ||
    requestContext.membership.status !== "active"
  ) {
    throw new Error(
      "Scoped workspace data requires an active organization membership.",
    );
  }
}