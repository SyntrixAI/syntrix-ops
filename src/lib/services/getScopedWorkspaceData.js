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

export function getScopedWorkspaceData(user) {
  if (!user?.organizationId) {
    throw new Error("Scoped workspace data requires an organization user.");
  }

  const organization = expandScope({
    organizationId: user.organizationId,
    scope: user.scope,
  });
  
  const locationIds = getScopedLocationIds(organization);

  const organizationPriorities = getPriorities({
    organizationId: user.organizationId,
  });

  const organizationExecutionItems = getExecutionItems({
    organizationId: user.organizationId,
  });

  return {
    organizationId: user.organizationId,
    organization,
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